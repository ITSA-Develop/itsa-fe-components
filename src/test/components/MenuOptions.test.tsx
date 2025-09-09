import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MenuOptions, { MenuOptionsProps } from '../../components/AppLayout/components/MenuOptions';

vi.mock('antd', async () => {
	const actual = await vi.importActual<any>('antd');

	const strip = (p: any) => {
		if (!p) return p;
		return p;
	};

	const Menu = (props: any) => (
		<div data-testid="menu" data-props={JSON.stringify(strip(props))}>
			<pre>{JSON.stringify(strip(props))}</pre>
			{props.children}
		</div>
	);

	return {
		...actual,
		Menu,
	};
});

const renderMenuOptions = (props: Partial<MenuOptionsProps> = {}) => {
	const defaultProps: MenuOptionsProps = {
		items: [],
		collapsed: false,
		currentPath: '/',
	};

	return render(<MenuOptions {...defaultProps} {...props} />);
};

const mockMenuItems = [
	{ key: '1', label: 'Dashboard' },
	{ key: '2', label: 'Users' },
	{
		key: 'sub1',
		label: 'Settings',
		children: [
			{ key: '3', label: 'Profile' },
			{ key: '4', label: 'Security' },
		],
	},
];

describe('MenuOptions', () => {
	it('renders correctly with default props', () => {
		const { container } = renderMenuOptions();

		expect(screen.getByTestId('menu')).toBeInTheDocument();
		expect(container.querySelector('.menu-options')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('passes correct props to Antd Menu component', () => {
		const { container } = renderMenuOptions({
			items: mockMenuItems,
			currentPath: '/dashboard',
			collapsed: false,
			mode: 'inline',
		});

		const menuElement = screen.getByTestId('menu');
		const menuProps = JSON.parse(menuElement.getAttribute('data-props') || '{}');

		expect(menuProps.items).toEqual(mockMenuItems);
		expect(menuProps.defaultSelectedKeys).toEqual(['/dashboard']);
		expect(menuProps.mode).toBe('inline');
		expect(menuProps.inlineCollapsed).toBe(false);
		expect(container).toMatchSnapshot();
	});

	it('sets inlineCollapsed to true when collapsed prop is true', () => {
		const { container } = renderMenuOptions({
			collapsed: true,
			items: mockMenuItems,
		});

		const menuElement = screen.getByTestId('menu');
		const menuProps = JSON.parse(menuElement.getAttribute('data-props') || '{}');

		expect(menuProps.inlineCollapsed).toBe(true);
		expect(container).toMatchSnapshot();
	});

	it('uses currentPath as defaultSelectedKeys', () => {
		const currentPath = '/users/profile';
		const { container } = renderMenuOptions({
			currentPath,
			items: mockMenuItems,
		});

		const menuElement = screen.getByTestId('menu');
		const menuProps = JSON.parse(menuElement.getAttribute('data-props') || '{}');

		expect(menuProps.defaultSelectedKeys).toEqual([currentPath]);
		expect(container).toMatchSnapshot();
	});

	it('renders with empty items array', () => {
		const { container } = renderMenuOptions({ items: [] });

		const menuElement = screen.getByTestId('menu');
		const menuProps = JSON.parse(menuElement.getAttribute('data-props') || '{}');

		expect(menuProps.items).toEqual([]);
		expect(container).toMatchSnapshot();
	});

	it('renders when collapsed state changes', () => {
		const { container, rerender } = renderMenuOptions({
			collapsed: false,
			items: mockMenuItems,
			currentPath: '/dashboard',
		});

		let menuElement = screen.getByTestId('menu');
		let menuProps = JSON.parse(menuElement.getAttribute('data-props') || '{}');
		expect(menuProps.inlineCollapsed).toBe(false);

		rerender(<MenuOptions collapsed={true} items={mockMenuItems} currentPath="/dashboard" />);

		menuElement = screen.getByTestId('menu');
		menuProps = JSON.parse(menuElement.getAttribute('data-props') || '{}');
		expect(menuProps.inlineCollapsed).toBe(true);
		expect(container).toMatchSnapshot();
	});

	it('handles complex menu items with nested structure', () => {
		const complexItems = [
			{
				key: 'main1',
				label: 'Main Section 1',
				children: [
					{ key: 'sub1-1', label: 'Subsection 1.1' },
					{
						key: 'sub1-2',
						label: 'Subsection 1.2',
						children: [
							{ key: 'deep1', label: 'Deep Item 1' },
							{ key: 'deep2', label: 'Deep Item 2' },
						],
					},
				],
			},
			{ key: 'main2', label: 'Main Section 2' },
		];

		const { container } = renderMenuOptions({ items: complexItems });

		const menuElement = screen.getByTestId('menu');
		const menuProps = JSON.parse(menuElement.getAttribute('data-props') || '{}');

		expect(menuProps.items).toEqual(complexItems);
		expect(container).toMatchSnapshot();
	});

	it('renders correctly when all props are provided', () => {
		const testProps = {
			items: mockMenuItems,
			collapsed: true,
			currentPath: '/test-path',
		};

		const { container } = renderMenuOptions(testProps);

		const menuElement = screen.getByTestId('menu');
		const menuProps = JSON.parse(menuElement.getAttribute('data-props') || '{}');

		expect(menuProps.items).toEqual(mockMenuItems);
		expect(menuProps.inlineCollapsed).toBe(true);
		expect(menuProps.defaultSelectedKeys).toEqual(['/test-path']);
		expect(menuProps.mode).toBe('inline');
		expect(container).toMatchSnapshot();
	});
});
