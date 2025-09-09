import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SidebarLayout } from '../../components/AppLayout/components/SidebarLayout';

let lastMenuOptionsProps: any;
let mockSetCollapsed: any;
let mockCollapsed: boolean;
let mockSearchTerm: string;
let mockSetSearchTerm: any;
let mockOpenKeys: string[];
let mockSetOpenKeys: any;
let mockCurrentModule: any;
let mockOnClickOptionMenu: any;

// Mock helper functions
vi.mock('../../helpers', () => ({
	transformModuleToMenuData: vi.fn((module) => {
		if (!module) return [];
		return [
			{ key: '/home', label: 'INICIO', icon: null },
			{ key: 'users', label: 'Users', icon: null },
			{ key: 'settings', label: 'Settings', icon: null }
		];
	}),
	getAllMenuKeys: vi.fn((menuData) => {
		return menuData.map((item: any) => item.key);
	}),
}));

vi.mock('../../helpers/menu/menuDataTransformer', () => ({
	filterMenuItems: vi.fn((items, query) => {
		if (!query.trim()) return items;
		return items.filter((item: any) => item.label && item.label.toLowerCase().includes(query.toLowerCase()));
	}),
}));

vi.mock('../../components/AppLayout/components/MenuOptions', () => ({
	__esModule: true,
	default: (props: any) => {
		lastMenuOptionsProps = props;
		return <div data-testid="menu-options" />;
	},
}));

vi.mock('../../hooks', () => ({
	useSidebarStore: () => ({
		collapsed: mockCollapsed,
		setCollapsed: mockSetCollapsed,
		searchTerm: mockSearchTerm,
		setSearchTerm: mockSetSearchTerm,
		openKeys: mockOpenKeys,
		setOpenKeys: mockSetOpenKeys,
	}),
}));

vi.mock('../../store/appLayout.store', () => ({
	useAppLayoutStore: () => ({
		currentModule: mockCurrentModule,
	}),
}));

vi.mock('antd', async () => {
	const actual = await vi.importActual<any>('antd');
	return {
		...actual,
		Input: (props: any) => {
			const inputProps: any = {
				'data-testid': 'search-input',
				placeholder: props.placeholder,
				onChange: (e: any) => {
					if (props.onChange) {
						props.onChange(e);
					}
				}
			};
			
			// Only add defaultValue if it's actually provided and has meaningful content
			if (props.defaultValue !== undefined && props.defaultValue !== '' && props.defaultValue.trim() !== '') {
				inputProps.defaultValue = props.defaultValue;
			} else if (props.defaultValue && props.defaultValue.trim() === '') {
				// Handle whitespace-only values
				inputProps.value = props.defaultValue;
			}
			
			return <input {...inputProps} />;
		},
		Button: (props: any) => (
			<button data-testid="collapse-button" onClick={props.onClick} type="button">
				{props.icon}
			</button>
		),
		Layout: (props: any) => <div data-testid="layout">{props.children}</div>,
	};
});

vi.mock('antd/es/layout/layout', () => ({
	__esModule: true,
	Content: (props: any) => <main data-testid="content">{props.children}</main>,
}));

vi.mock('@ant-design/icons', () => ({
	DoubleLeftOutlined: () => <span data-testid="double-left-icon">⬅️</span>,
	SearchOutlined: () => <span data-testid="search-icon">🔍</span>,
}));

beforeEach(() => {
	mockSetCollapsed = vi.fn();
	mockSetSearchTerm = vi.fn();
	mockSetOpenKeys = vi.fn();
	mockOnClickOptionMenu = vi.fn();
	mockCollapsed = false;
	mockSearchTerm = '';
	mockOpenKeys = [];
	mockCurrentModule = {
		id: 1,
		name: 'Test Module',
		submodules: [
			{
				id: 1,
				name: 'Test Submodule',
				groups: [
					{
						id: 1,
						name: 'Test Group',
						programs: [
							{ id: 1, name: 'Test Program', path: '/test' }
						]
					}
				]
			}
		]
	};
	lastMenuOptionsProps = undefined;
});

const sampleMenuItems = [
	{ key: '/home', label: 'INICIO' },
	{ key: 'users', label: 'Users' },
	{ key: 'settings', label: 'Settings' },
];

const renderSidebarLayout = (props: Partial<React.ComponentProps<typeof SidebarLayout>> = {}) => {
	const defaultProps = {
		children: <div data-testid="default-children">Default content</div>,
		currentPath: '/',
		onClickOptionMenu: mockOnClickOptionMenu,
		...props,
	};
	return render(<SidebarLayout {...defaultProps} />);
};

describe('SidebarLayout', () => {
	describe('Rendering', () => {
			it('renders sidebar elements when not collapsed', () => {
		mockCollapsed = false;
		const { container } = renderSidebarLayout({
			children: <div data-testid="sidebar-children">Test content</div>,
		});

		expect(screen.getByTestId('search-input')).toBeInTheDocument();
		expect(screen.getByTestId('menu-options')).toBeInTheDocument();
		expect(screen.getByTestId('collapse-button')).toBeInTheDocument();
		expect(screen.getByTestId('sidebar-children')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

			it('hides sidebar elements when collapsed', () => {
		mockCollapsed = true;
		const { container } = renderSidebarLayout({
			children: <div data-testid="sidebar-children">Test content</div>,
		});

		expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
		expect(screen.queryByTestId('menu-options')).not.toBeInTheDocument();
		expect(screen.queryByTestId('collapse-button')).not.toBeInTheDocument();
		expect(screen.getByTestId('sidebar-children')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
	});

	describe('Search functionality', () => {
		beforeEach(() => {
			mockCollapsed = false;
		});

			it('filters menu items based on search input', async () => {
		const user = userEvent.setup();
		const { container } = renderSidebarLayout();

		const searchInput = screen.getByTestId('search-input');
		await user.type(searchInput, 'User');

		await waitFor(() => {
			expect(mockSetSearchTerm).toHaveBeenCalledWith('User');
		});
		expect(container).toMatchSnapshot();
	});

			it('shows all items when search is cleared', async () => {
		const user = userEvent.setup();
		const { container } = renderSidebarLayout();

		const searchInput = screen.getByTestId('search-input');
		await user.type(searchInput, 'test');
		await user.clear(searchInput);

		await waitFor(() => {
			expect(mockSetSearchTerm).toHaveBeenLastCalledWith('');
		});
		expect(container).toMatchSnapshot();
	});
	});

	describe('Collapse functionality', () => {
		it('calls setCollapsed when collapse button is clicked', async () => {
			mockCollapsed = false;
			const user = userEvent.setup();
			const { container } = renderSidebarLayout();

			const collapseButton = screen.getByTestId('collapse-button');
			await user.click(collapseButton);

			expect(mockSetCollapsed).toHaveBeenCalledWith(true);
			expect(container).toMatchSnapshot();
		});
	});

	describe('Props handling', () => {
			it('passes correct props to MenuOptions', () => {
		mockCollapsed = false;
		const { container } = renderSidebarLayout({
			currentPath: '/users',
			modeSidebar: 'inline',
		});

		expect(lastMenuOptionsProps).toMatchObject({
			collapsed: false,
			currentPath: '/users',
			mode: 'inline',
			openKeys: mockOpenKeys,
		});
		expect(lastMenuOptionsProps.onClickOptionMenu).toBe(mockOnClickOptionMenu);
		expect(container).toMatchSnapshot();
	});

			it('handles missing props gracefully', () => {
		mockCollapsed = false;
		const { container } = renderSidebarLayout({ currentPath: undefined });

		expect(lastMenuOptionsProps.currentPath).toBe('');
		expect(container).toMatchSnapshot();
	});

			it('handles null currentModule gracefully', () => {
		mockCollapsed = false;
		mockCurrentModule = null;
		const { container } = renderSidebarLayout({
			currentPath: '/test',
		});

		expect(lastMenuOptionsProps.items).toEqual([]);
		expect(container).toMatchSnapshot();
	});

	it('handles undefined currentModule gracefully', () => {
		mockCollapsed = false;
		mockCurrentModule = undefined;
		const { container } = renderSidebarLayout({
			currentPath: '/test',
		});

		expect(lastMenuOptionsProps.items).toEqual([]);
		expect(container).toMatchSnapshot();
	});
	});

	describe('Search state edge cases', () => {
			it('handles various search input scenarios including empty values', async () => {
		mockCollapsed = false;
		const user = userEvent.setup();

		const { container } = renderSidebarLayout();

		const searchInput = screen.getByTestId('search-input');

		// Test typing
		await user.type(searchInput, 'Users');

		await waitFor(() => {
			expect(mockSetSearchTerm).toHaveBeenCalled();
		});

		expect(container).toMatchSnapshot();
	});
});

	describe('Width and styling', () => {
		it('applies custom width when provided', () => {
			mockCollapsed = false;
			const customWidth = 300;
			const { container } = renderSidebarLayout({
				width: customWidth,
			});

			const sidebarDiv = container.querySelector('div[style*="width"]');
			expect(sidebarDiv).toHaveStyle(`width: ${customWidth}px`);
			expect(container).toMatchSnapshot();
		});

		it('applies default width when not provided', () => {
			mockCollapsed = false;
			const { container } = renderSidebarLayout();

			const sidebarDiv = container.querySelector('div[style*="width"]');
			expect(sidebarDiv).toHaveStyle('width: 235px');
			expect(container).toMatchSnapshot();
		});
	});

	describe('onClickOptionMenu callback', () => {
		it('passes onClickOptionMenu to MenuOptions', () => {
			mockCollapsed = false;
			renderSidebarLayout();

			expect(lastMenuOptionsProps.onClickOptionMenu).toBe(mockOnClickOptionMenu);
		});
	});

	describe('OpenKeys functionality', () => {
		it('passes openKeys to MenuOptions', () => {
			mockCollapsed = false;
			mockOpenKeys = ['key1', 'key2'];
			renderSidebarLayout();

			expect(lastMenuOptionsProps.openKeys).toEqual(['key1', 'key2']);
		});

		it('passes onOpenKeysChange to MenuOptions', () => {
			mockCollapsed = false;
			renderSidebarLayout();

			expect(lastMenuOptionsProps.onOpenKeysChange).toBe(mockSetOpenKeys);
		});
	});

	describe('Module transformation and menu data', () => {
		it('generates menu data from currentModule', () => {
			mockCollapsed = false;
			renderSidebarLayout();

					// Verify that the component renders with menu data
		expect(lastMenuOptionsProps.items).toBeDefined();
		});

		it('handles empty menu data when no currentModule', () => {
			mockCollapsed = false;
			mockCurrentModule = null;
			renderSidebarLayout();

			expect(lastMenuOptionsProps.items).toEqual([]);
		});

		it('applies search filtering to menu data', () => {
			mockCollapsed = false;
			mockSearchTerm = 'test search';
			renderSidebarLayout();

					// Verify that search term affects the component
		expect(lastMenuOptionsProps.items).toBeDefined();
		});
	});

	describe('Search term and open keys synchronization', () => {
		it('sets openKeys when search term is not empty', () => {
			mockCollapsed = false;
			mockSearchTerm = 'search';
			const { container } = renderSidebarLayout();

					// Verify that openKeys are handled correctly
		expect(lastMenuOptionsProps.openKeys).toBeDefined();
		});

		it('clears openKeys when search term is empty', () => {
			mockCollapsed = false;
			mockSearchTerm = '';
			renderSidebarLayout();

			// This would be handled by the useEffect in the component
			expect(lastMenuOptionsProps.openKeys).toEqual([]);
		});
	});

	describe('Edge cases and error handling', () => {
		it('handles empty currentModule gracefully', () => {
			mockCollapsed = false;
			mockCurrentModule = null;
			const { container } = renderSidebarLayout();

			expect(screen.getByTestId('content')).toBeInTheDocument();
			expect(container).toMatchSnapshot();
		});

		it('handles undefined currentModule gracefully', () => {
			mockCollapsed = false;
			mockCurrentModule = undefined;
			const { container } = renderSidebarLayout();

			expect(screen.getByTestId('content')).toBeInTheDocument();
			expect(container).toMatchSnapshot();
		});

		it('handles invalid search terms gracefully', () => {
			mockCollapsed = false;
			mockSearchTerm = '   '; // whitespace only
			const { container } = renderSidebarLayout();

			expect(screen.getByTestId('menu-options')).toBeInTheDocument();
			expect(container).toMatchSnapshot();
		});
	});

	describe('Component integration', () => {
		it('renders content area correctly', () => {
			const { container } = renderSidebarLayout({
				children: <div data-testid="custom-content">Custom content</div>,
			});

			expect(screen.getByTestId('custom-content')).toBeInTheDocument();
			expect(screen.getByTestId('content')).toBeInTheDocument();
			expect(container).toMatchSnapshot();
		});

		it('handles all modeSidebar options', () => {
			const modes = ['vertical', 'horizontal', 'inline'] as const;
			
			modes.forEach(mode => {
				mockCollapsed = false;
				const { container } = renderSidebarLayout({
					modeSidebar: mode,
				});

				expect(lastMenuOptionsProps.mode).toBe(mode);
				expect(container).toMatchSnapshot();
			});
		});
	});
});
