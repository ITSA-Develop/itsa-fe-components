import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MenuProps } from 'antd';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { AppLayout } from '../../components/AppLayout/AppLayout';
import { TExtendedMenuItem } from '../../types';
import { IAgency, IModule } from '../../interfaces';

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: vi.fn((key: string) => store[key] || null),
		setItem: vi.fn((key: string, value: string) => {
			store[key] = value;
		}),
		removeItem: vi.fn((key: string) => {
			delete store[key];
		}),
		clear: vi.fn(() => {
			store = {};
		}),
	};
})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
});

// Mock the stores
const mockAppLayoutStore = {
	agencies: [] as IAgency[],
	modulesAgency: [] as IModule[],
	setCurrentAgency: vi.fn(),
	setCurrentModule: vi.fn(),
	currentAgency: undefined,
	currentModule: undefined,
	userName: undefined,
	userRole: undefined,
};

vi.mock('../../store/appLayout.store', () => ({
	useAppLayoutStore: () => mockAppLayoutStore,
}));

// Mock helpers
vi.mock('../../helpers/objects', () => ({
	dataFromLocalStorage: vi.fn((key: string) => localStorageMock.getItem(key)),
}));

// Mock component dependencies
vi.mock('../../components/AppLayout/components/HeaderLayout', () => ({
	HeaderLayout: (props: any) => (
		<div data-testid="header-layout" data-props={JSON.stringify(props)}>
			Header Content
		</div>
	),
}));

let mockSidebarOnClick: any = null;

vi.mock('../../components/AppLayout/components/SidebarLayout', () => ({
	SidebarLayout: (props: any) => {
		// Guardamos la función onClickOptionMenu para poder probarla
		mockSidebarOnClick = props.onClickOptionMenu;
		return (
			<div data-testid="sidebar-layout" data-props={JSON.stringify({...props, onClickOptionMenu: 'function'})}>
				{props.children}
			</div>
		);
	},
}));

describe('AppLayout', () => {
	const mockOnClickOptionMenu = vi.fn();
	
	const defaultProps = {
		loading: false,
		currentPath: '/',
		widthSidebar: 280,
		onClickOptionMenu: mockOnClickOptionMenu,
		children: <div>Test Content</div>,
	};

	const mockAgencies: IAgency[] = [
		{
			id: 1,
			name: 'Agencia Principal',
			modules: [
				{
					id: 10,
					name: 'Módulo Ventas',
					path: '/ventas',
					icon: 'shop',
					entorno: 'production',
					submodules: [],
				},
				{
					id: 11,
					name: 'Módulo Inventario',
					path: '/inventario',
					icon: 'inventory',
					entorno: 'production',
					submodules: [],
				},
			],
		},
		{
			id: 2,
			name: 'Agencia Secundaria',
			modules: [
				{
					id: 20,
					name: 'Módulo Compras',
					path: '/compras',
					icon: 'cart',
					entorno: 'production',
					submodules: [],
				},
			],
		},
	];

	const mockModules: IModule[] = [
		{
			id: 10,
			name: 'Módulo Ventas',
			path: '/ventas',
			icon: 'shop',
			entorno: 'production',
			submodules: [],
		},
		{
			id: 11,
			name: 'Módulo Inventario',
			path: '/inventario',
			icon: 'inventory',
			entorno: 'production',
			submodules: [],
		},
	];

	beforeEach(() => {
		vi.clearAllMocks();
		localStorageMock.clear();
		mockAppLayoutStore.agencies = [];
		mockAppLayoutStore.modulesAgency = [];
		mockAppLayoutStore.currentAgency = undefined;
		mockAppLayoutStore.currentModule = undefined;
		mockSidebarOnClick = null;
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should render correctly with basic props', () => {
		const { container } = render(<AppLayout {...defaultProps} />);

		expect(screen.getByText('Test Content')).toBeInTheDocument();
		expect(screen.getByTestId('header-layout')).toBeInTheDocument();
		expect(screen.getByTestId('sidebar-layout')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should pass correct props to HeaderLayout', () => {
		const notifications: MenuProps = {
			items: [{ key: 'n1', label: 'Nueva notificación' }],
		};
		const userActions: MenuProps = {
			items: [
				{ key: 'u1', label: 'Perfil' },
				{ key: 'u2', label: 'Cerrar sesión' },
			],
		};
		const logo = 'https://example.com/logo.png';

		render(
			<AppLayout
				{...defaultProps}
				notifications={notifications}
				userActions={userActions}
				logo={logo}
			/>
		);

		const header = screen.getByTestId('header-layout');
		const headerProps = JSON.parse(header.getAttribute('data-props') || '{}');

		expect(headerProps.loadingHeader).toBe(false);
		expect(headerProps.notifications).toEqual(notifications);
		expect(headerProps.userActions).toEqual(userActions);
		expect(headerProps.logo).toBe(logo);
	});

	it('should pass correct props to SidebarLayout', () => {
		const modeSidebar = 'vertical';

		render(
			<AppLayout
				{...defaultProps}
				modeSidebar={modeSidebar}
			/>
		);

		const sidebar = screen.getByTestId('sidebar-layout');
		const sidebarProps = JSON.parse(sidebar.getAttribute('data-props') || '{}');

		expect(sidebarProps.width).toBe(280);
		expect(sidebarProps.currentPath).toBe('/');
		expect(sidebarProps.modeSidebar).toBe(modeSidebar);
		expect(sidebarProps.onClickOptionMenu).toBe('function');
	});

	it('should use default props when optional props are not provided', () => {
		render(<AppLayout {...defaultProps} />);

		const header = screen.getByTestId('header-layout');
		const headerProps = JSON.parse(header.getAttribute('data-props') || '{}');

		expect(headerProps.notifications).toEqual({ items: [] });
		expect(headerProps.userActions).toEqual({ items: [] });
		expect(headerProps.logo).toBe('');

		const sidebar = screen.getByTestId('sidebar-layout');
		const sidebarProps = JSON.parse(sidebar.getAttribute('data-props') || '{}');

		expect(sidebarProps.modeSidebar).toBe('inline');
	});

	it('should call setCurrentAgency when agencies are available and no stored ID', async () => {
		mockAppLayoutStore.agencies = mockAgencies;
		
		render(<AppLayout {...defaultProps} />);

		await waitFor(() => {
			expect(mockAppLayoutStore.setCurrentAgency).toHaveBeenCalledWith(mockAgencies[0]);
		});
	});

	it('should call setCurrentModule when modules are available and no stored ID', async () => {
		mockAppLayoutStore.modulesAgency = mockModules;
		
		render(<AppLayout {...defaultProps} />);

		await waitFor(() => {
			expect(mockAppLayoutStore.setCurrentModule).toHaveBeenCalledWith(mockModules[0]);
		});
	});

	it('should select agency from localStorage when available', async () => {
		mockAppLayoutStore.agencies = mockAgencies;
		localStorageMock.setItem('agencyId', '2');

		render(<AppLayout {...defaultProps} />);

		await waitFor(() => {
			expect(mockAppLayoutStore.setCurrentAgency).toHaveBeenCalledWith(mockAgencies[1]);
		});
	});

	it('should select module from localStorage when available', async () => {
		mockAppLayoutStore.modulesAgency = mockModules;
		localStorageMock.setItem('moduleId', '11');

		render(<AppLayout {...defaultProps} />);

		await waitFor(() => {
			expect(mockAppLayoutStore.setCurrentModule).toHaveBeenCalledWith(mockModules[1]);
		});
	});

	it('should fallback to first item when localStorage ID is invalid', async () => {
		mockAppLayoutStore.agencies = mockAgencies;
		localStorageMock.setItem('agencyId', '999'); // ID que no existe

		render(<AppLayout {...defaultProps} />);

		await waitFor(() => {
			expect(mockAppLayoutStore.setCurrentAgency).toHaveBeenCalledWith(mockAgencies[0]);
		});
	});

	it('should not call setters when arrays are empty', async () => {
		mockAppLayoutStore.agencies = [];
		mockAppLayoutStore.modulesAgency = [];
		
		render(<AppLayout {...defaultProps} />);

		await waitFor(() => {
			expect(mockAppLayoutStore.setCurrentAgency).not.toHaveBeenCalled();
			expect(mockAppLayoutStore.setCurrentModule).not.toHaveBeenCalled();
		});
	});

	it('should handle onClickOptionMenu callback', () => {
		const mockMenuItem: TExtendedMenuItem = {
			key: 'test-key',
			label: 'Test Item',
		};

		render(<AppLayout {...defaultProps} />);

		// Simular el click en una opción del menú usando la función guardada del mock
		const mockInfo = { key: 'test-key', item: mockMenuItem };
		if (mockSidebarOnClick) {
			mockSidebarOnClick(mockInfo);
		}

		expect(mockOnClickOptionMenu).toHaveBeenCalledWith(mockInfo);
	});

	it('should render with loading state', () => {
		render(<AppLayout {...defaultProps} loading={true} />);

		const header = screen.getByTestId('header-layout');
		const headerProps = JSON.parse(header.getAttribute('data-props') || '{}');

		expect(headerProps.loadingHeader).toBe(true);
	});

	it('should handle different currentPath values', () => {
		const testPath = '/dashboard/sales';
		render(<AppLayout {...defaultProps} currentPath={testPath} />);

		const sidebar = screen.getByTestId('sidebar-layout');
		const sidebarProps = JSON.parse(sidebar.getAttribute('data-props') || '{}');

		expect(sidebarProps.currentPath).toBe(testPath);
	});

	it('should handle different sidebar widths', () => {
		const customWidth = 350;
		render(<AppLayout {...defaultProps} widthSidebar={customWidth} />);

		const sidebar = screen.getByTestId('sidebar-layout');
		const sidebarProps = JSON.parse(sidebar.getAttribute('data-props') || '{}');

		expect(sidebarProps.width).toBe(customWidth);
	});

	it('should render layout structure correctly', () => {
		const { container } = render(<AppLayout {...defaultProps} />);

		const layoutWrapper = container.querySelector('.flex.h-\\[100dvh\\].w-full.overflow-hidden');
		expect(layoutWrapper).toBeInTheDocument();

		const layoutContainer = container.querySelector('.p-2.gap-2');
		expect(layoutContainer).toBeInTheDocument();
	});
});
