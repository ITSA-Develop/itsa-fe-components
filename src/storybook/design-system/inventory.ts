export type ImplementationStatus = 'implemented' | 'partial' | 'not-exported' | 'not-implemented' | 'not-identified';

export interface InventoryItem {
	name: string;
	status: ImplementationStatus;
	notes: string;
	publicApi: boolean;
}

export const TECH_STACK = {
	packageName: '@itsa-develop/itsa-fe-components',
	version: '0.1.55',
	framework: 'React 19 (peer) + TypeScript',
	bundler: 'Vite 7',
	componentLibrary: 'Ant Design 5.26 (wrappers en src/components)',
	styling: 'Tailwind CSS 3.4 + CSS custom properties + Emotion (dependencia presente)',
	fonts: 'Public Sans (300–700) vía @fontsource y Google Fonts',
	icons: '@mdi/react + @ant-design/icons',
	forms: 'react-hook-form + zod + @hookform/resolvers',
	routing: 'react-router-dom 7',
	state: 'zustand',
	docs: 'Storybook 8',
	colorMode: 'Claro. No hay tema oscuro de producto. LoadingApp incluye clases dark: aisladas',
};

export const DESIGN_CONVENTIONS = [
	'Los componentes de producto envuelven Ant Design; no se usa Ant Design crudo en consumidores de la librería.',
	'El color de marca se centraliza en --itsa-primary (#ea3b48) y en la escala primary-* de Tailwind.',
	'Los formularios de mantenimiento usan el prefijo Form* con react-hook-form, FormLabel y FormLabelError.',
	'Los filtros de listados usan FilterInput / FilterSelect / FilterSearchContainer, más compactos que los Form*.',
	'Los botones de acción de negocio pasan por Button (permisos, red, loading, confirm).',
	'AppLayout es el layout autenticado. Login es pantalla completa independiente.',
	'Los textos de FormInput se transforman a mayúsculas por defecto, salvo textTransform="none".',
	'Breakpoints de producto: md 768px, lg 1240px, y un corte de 650px en Login/WizardSteps.',
];

export const INVENTORY: InventoryItem[] = [
	{
		name: 'AppLayout',
		status: 'implemented',
		publicApi: true,
		notes: 'Layout autenticado: header + sidebar drawer + contenido + footer opcional',
	},
	{
		name: 'Login',
		status: 'implemented',
		publicApi: true,
		notes: 'Pantalla de autenticación ERP/QUOTER. Sin recuperación ni registro',
	},
	{
		name: 'Footer',
		status: 'implemented',
		publicApi: true,
		notes: 'Pie fijo de versión. No está cableado dentro de AppLayout',
	},
	{
		name: 'BreadcrumbCustom',
		status: 'implemented',
		publicApi: true,
		notes: 'Título de pantalla con volver y ayuda opcional. No es un breadcrumb de ruta',
	},
	{
		name: 'Button',
		status: 'implemented',
		publicApi: true,
		notes: 'Apariencias, colores pastel, loading, disabled, confirm',
	},
	{
		name: 'ButtonIcon',
		status: 'implemented',
		publicApi: true,
		notes: 'Botón cuadrado de icono: primary, secondary, success, warning, danger',
	},
	{ name: 'ButtonAddItem', status: 'implemented', publicApi: true, notes: 'Alta compacta con icono Plus' },
	{ name: 'ButtonAntd', status: 'implemented', publicApi: true, notes: 'Wrapper interno de Ant Design Button' },
	{
		name: 'ButtonDanger',
		status: 'not-exported',
		publicApi: false,
		notes: 'Existe en src/components/ButtonDanger pero no se exporta en index.ts',
	},
	{ name: 'DropdownButton', status: 'implemented', publicApi: true, notes: 'Botón con menú de acciones' },
	{ name: 'SelectorButtonList', status: 'implemented', publicApi: true, notes: 'Grupo de botones de selección' },
	{
		name: 'FormButtonSelector',
		status: 'implemented',
		publicApi: true,
		notes: 'Abre un modal de selección ligado a RHF',
	},
	{ name: 'FormInput', status: 'implemented', publicApi: true, notes: 'Input de formulario con label y error' },
	{ name: 'FormInputPassword', status: 'implemented', publicApi: true, notes: 'Password con mostrar/ocultar' },
	{ name: 'FormInputNumber', status: 'implemented', publicApi: true, notes: 'Numérico positivo' },
	{ name: 'FormTextarea', status: 'implemented', publicApi: true, notes: 'Textarea con transform de texto' },
	{ name: 'FormSelect', status: 'implemented', publicApi: true, notes: 'Select ligado a RHF' },
	{ name: 'FormSelectTree', status: 'implemented', publicApi: true, notes: 'Árbol de selección en formularios' },
	{ name: 'FormCheckBox', status: 'implemented', publicApi: true, notes: 'Checkbox ligado a RHF' },
	{ name: 'FormRadio', status: 'implemented', publicApi: true, notes: 'Radio group ligado a RHF' },
	{ name: 'FormSwitch', status: 'implemented', publicApi: true, notes: 'Switch ligado a RHF' },
	{
		name: 'FormInputDatePicker',
		status: 'implemented',
		publicApi: true,
		notes: 'Fecha con máscara y restricción de pasado',
	},
	{ name: 'FormInputTimePicker', status: 'implemented', publicApi: true, notes: 'Hora' },
	{ name: 'FormDateTimePicker', status: 'implemented', publicApi: true, notes: 'Fecha y hora' },
	{
		name: 'FormInputBirthDatePicker',
		status: 'implemented',
		publicApi: true,
		notes: 'Fecha de nacimiento (mayores de 18)',
	},
	{
		name: 'FormLabel / FormLabelError',
		status: 'implemented',
		publicApi: true,
		notes: 'Etiqueta y mensaje de validación',
	},
	{
		name: 'Input / InputPassword / InputNumber / InputSearch / Textarea / Select',
		status: 'implemented',
		publicApi: true,
		notes: 'Primitivos de Ant Design con ajustes ITSA',
	},
	{
		name: 'FilterInput / FilterSelect / FilterSearchContainer',
		status: 'implemented',
		publicApi: true,
		notes: 'Filtros compactos de listados (altura 27px)',
	},
	{
		name: 'Checkbox / Radio / Switch',
		status: 'implemented',
		publicApi: true,
		notes: 'Variante default con --itsa-primary',
	},
	{ name: 'Title', status: 'implemented', publicApi: true, notes: 'H1–H5. H6 no implementado' },
	{ name: 'Link', status: 'implemented', publicApi: true, notes: 'Typography.Link de Ant Design' },
	{
		name: 'Tabs / TabsMaintenance / TabsItemContent',
		status: 'implemented',
		publicApi: true,
		notes: 'Pestañas de contenido y de mantenimiento',
	},
	{ name: 'Segmented', status: 'implemented', publicApi: true, notes: 'Control segmentado con estilos ITSA' },
	{ name: 'WizardSteps', status: 'implemented', publicApi: true, notes: 'Pasos; corte mobile 650px' },
	{
		name: 'Dropdown / DropdownCustomLabel / ActionPanel',
		status: 'partial',
		publicApi: true,
		notes: 'Dropdown y DropdownCustomLabel exportados. ActionPanel existe pero no se exporta en index.ts',
	},
	{
		name: 'Table / TableDetails / TableMobile / TableDetailsMobile / TableMobileTypeCollapse',
		status: 'implemented',
		publicApi: true,
		notes: 'Tablas desktop/mobile con tokens de header, selección y paginación',
	},
	{
		name: 'Tag / TagStatus / Badge / Avatar',
		status: 'implemented',
		publicApi: true,
		notes: 'Estado, etiquetas y avatar con iniciales',
	},
	{
		name: 'Card / Collapse / Descriptions / InfoRow / ItemList / List',
		status: 'implemented',
		publicApi: true,
		notes: 'Superficies de información',
	},
	{
		name: 'Alert / Notification / Empty / WithoutInformation / Spin / Skeleton / Progress / Tooltip',
		status: 'implemented',
		publicApi: true,
		notes: 'Feedback. LoadingApp existe pero no se exporta en index.ts',
	},
	{
		name: 'Modal / ModalResponsive / Drawer / ConfirmDeleteModal / CustomFooterModal / Popconfirm',
		status: 'partial',
		publicApi: true,
		notes: 'Modales y drawers exportados. Popconfirm existe como wrapper interno, no está en index.ts',
	},
	{
		name: 'FormLayout',
		status: 'partial',
		publicApi: true,
		notes: 'Drawer + Tabs. Comentario TODO: esperando diseño final',
	},
	{
		name: 'Dashboard',
		status: 'implemented',
		publicApi: true,
		notes: 'Home interno de módulos, se usa dentro de AppLayout',
	},
	{ name: 'ErrorPage / ErrorBoundary', status: 'implemented', publicApi: true, notes: 'Pantallas y límite de error' },
	{ name: 'UserProfileDrawer', status: 'implemented', publicApi: true, notes: 'Panel de perfil de usuario' },
	{
		name: 'Tema oscuro',
		status: 'not-implemented',
		publicApi: false,
		notes: 'No hay ConfigProvider dark ni paleta dark en Tailwind',
	},
	{
		name: 'Recuperación de contraseña / registro',
		status: 'not-implemented',
		publicApi: false,
		notes: 'No hay pantallas ni flujos en la librería',
	},
	{
		name: 'Layout público / marketing',
		status: 'not-identified',
		publicApi: false,
		notes: 'No hay un layout dedicado distinto de Login y AppLayout',
	},
	{
		name: 'H6 / tokens tipográficos de tamaño',
		status: 'not-implemented',
		publicApi: false,
		notes: 'Title solo expone levels 1–5; los tamaños vienen de Ant Design',
	},
];

export const countByStatus = (status: ImplementationStatus) => INVENTORY.filter(item => item.status === status).length;
