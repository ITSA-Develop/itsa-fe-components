export type TokenSource = 'tailwind' | 'css-variable' | 'constant' | 'theme' | 'detected';

export interface ColorToken {
	name: string;
	hex: string;
	cssVar?: string;
	tailwindClass?: string;
	source: TokenSource;
	usage: string;
	category: string;
}

export const PACKAGE_NAME = '@itsa-develop/itsa-fe-components';
export const PACKAGE_VERSION = '0.1.55';
export const FONT_FAMILY = '"Public Sans", ui-sans-serif, system-ui, sans-serif';
export const FONT_CSS_VAR = '--font-sans';
export const PRIMARY_CSS_VAR = '--itsa-primary';
export const PRIMARY_HEX = '#EA3B48';
export const TEXT_MAIN_HEX = '#343434';

export const CSS_VARIABLES = [
	{ name: '--font-sans', value: FONT_FAMILY, usage: 'Familia tipográfica global (html, body, Ant Design)' },
	{ name: '--itsa-primary', value: '#ea3b48', usage: 'Color primario de marca; sincroniza tokens Ant Design' },
	{
		name: '--ant-colorPrimary',
		value: 'var(--itsa-primary)',
		usage: 'Override de Ant Design en checkbox, radio, tabs y botones',
	},
	{ name: '--itsa-btn-bg', value: 'según variante', usage: 'Fondo de botones semánticos pastel' },
	{ name: '--itsa-table-row-hover-bg', value: '#f5f5f5', usage: 'Hover de filas en Table' },
	{ name: '--itsa-table-row-selected-bg', value: '#fce7e9', usage: 'Fila seleccionada en Table' },
	{ name: '--itsa-table-row-selected-hover-bg', value: '#fbdcde', usage: 'Hover de fila seleccionada' },
	{ name: '--itsa-pagination-active-bg', value: 'var(--itsa-primary)', usage: 'Página activa de paginación' },
	{ name: '--switch-active-bg', value: 'var(--itsa-primary)', usage: 'Switch activo' },
	{ name: '--switch-inactive-bg', value: '#bfbfbf', usage: 'Switch inactivo' },
];

export const THEME_PALETTE = {
	primary: { main: '#EA3B48', contrastText: '#000000' },
	secondary: { main: '#EEF1F3', contrastText: '#FFFFFF' },
	tertiary: { main: '#D9DFE3', contrastText: '#000000' },
};

export const COLORS_CONSTANT = {
	white: '#FFFFFF',
	black: '#000000',
	primary700: '#ea3d48',
	success: '#2E7D32',
	warning: '#F9A825',
	error: '#D32F2F',
};

export const COLOR_TAGS = {
	magenta: { text: '#EB2F96', borde: '#FFADD2', bg: '#FFF0F6' },
	green: { text: '#52A927', borde: '#9FCA7F', bg: '#F6FFED' },
	blue: { text: '#2F54EB', borde: '#ADC6FF', bg: '#F0F5FF' },
	orange: { text: '#FA8C16', borde: '#FFD591', bg: '#FFF7E6' },
	red: { text: '#F5222D', borde: '#FFA39E', bg: '#FFF1F0' },
};

export const BREAKPOINTS = [
	{ name: 'xs', value: '475px', usage: 'Contenedor y media query Tailwind' },
	{ name: 'sm', value: '640px', usage: 'Contenedor Tailwind' },
	{ name: 'md', value: '768px', usage: 'Header, tablas y layout' },
	{ name: 'tablet', value: '800px', usage: 'Breakpoint de producto' },
	{ name: 'desktop', value: '1024px', usage: 'Breakpoint de producto' },
	{ name: 'lg', value: '1240px', usage: 'Layout amplio (no el default de Tailwind 1024px)' },
	{ name: 'xl', value: '1280px', usage: 'Contenedor Tailwind' },
	{ name: '2xl', value: '1536px', usage: 'Contenedor Tailwind' },
	{ name: '3xl', value: '1920px', usage: 'Contenedor Tailwind' },
	{ name: 'login-split', value: '650px', usage: 'Detectado en Login y WizardSteps (no es token Tailwind)' },
];

export const SHADOWS = [
	{ name: 'shadow-xs', value: '0 1px 2px 0 rgba(38, 50, 56, 0.50)' },
	{ name: 'shadow-sm', value: '0 1px 4px 0 rgba(38, 50, 56, 0.50)' },
	{ name: 'shadow-md', value: '0 1px 4px 0 rgba(38, 50, 56, 0.50)' },
	{ name: 'shadow-lg', value: '0 0.5px 8px 0 rgba(207, 216, 220, 1)' },
	{ name: 'shadow-xl', value: 'No identificado (token vacío en tailwind.config.js)' },
];

const scale = (prefix: string, values: Record<string, string>, category: string, usage: string): ColorToken[] =>
	Object.entries(values).map(([step, hex]) => ({
		name: `${prefix}-${step}`,
		hex,
		tailwindClass: `${prefix}-${step}`,
		source: 'tailwind',
		category,
		usage,
	}));

export const PRIMARY_SCALE: ColorToken[] = scale(
	'primary',
	{
		'50': '#FCEEEE',
		'100': '#F8DADA',
		'200': '#F0B5B5',
		'300': '#E78F8F',
		'400': '#DE6A6A',
		'500': '#f88792',
		'600': '#f25162',
		'700': '#ea3d48',
		'800': '#EA3B48',
		'900': '#D90022',
	},
	'Primario',
	'Marca ITSA. primary-700/800 se usan en header, botones y selección de menú',
);

export const GRAY_SCALE: ColorToken[] = [
	...scale(
		'gray',
		{
			'25': '#FAFAFA',
			'50': '#F5F5F5',
			'75': '#EEF1F3',
			'100': '#d9dfe3',
			'150': '#D9D9D9',
			'200': '#D9DFE3',
			'250': '#F4F8FB',
			'300': '#B0BCD5',
			'350': '#8D9DA8',
			'400': '#748392',
			'500': '#4A5D85',
			'600': '#3B4A66',
			'700': '#262626',
			'800': '#1D252F',
			'900': '#111418',
		},
		'Neutros',
		'Fondos, bordes, texto secundario y superficies',
	),
	{
		name: 'text-main',
		hex: TEXT_MAIN_HEX,
		tailwindClass: 'text-main',
		source: 'tailwind',
		category: 'Texto',
		usage: 'Color de texto principal en Tailwind',
	},
	{
		name: 'black-100',
		hex: '#000000',
		tailwindClass: 'black-100',
		source: 'tailwind',
		category: 'Texto',
		usage: 'Texto e iconos',
	},
	{
		name: 'white-100',
		hex: '#FFFFFF',
		tailwindClass: 'white-100',
		source: 'tailwind',
		category: 'Superficie',
		usage: 'Fondos de tarjetas, contenido y botones outline',
	},
];

export const SEMANTIC_COLORS: ColorToken[] = [
	{
		name: 'success',
		hex: '#2E7D32',
		tailwindClass: 'success',
		source: 'tailwind',
		category: 'Éxito',
		usage: 'Token Tailwind y COLORS.success',
	},
	{
		name: 'warning',
		hex: '#F9A825',
		tailwindClass: 'warning',
		source: 'tailwind',
		category: 'Advertencia',
		usage: 'Token Tailwind y COLORS.warning',
	},
	{
		name: 'error',
		hex: '#D32F2F',
		tailwindClass: 'error',
		source: 'tailwind',
		category: 'Error',
		usage: 'Token Tailwind y COLORS.error',
	},
];

export const PRIMITIVE_SCALES: Record<string, ColorToken[]> = {
	alpine: scale(
		'alpine',
		{
			'50': '#F6F8F9',
			'100': '#CFD8DC',
			'200': '#B0BEC5',
			'300': '#90A4AE',
			'400': '#78909C',
			'500': '#607D8B',
			'600': '#546E7A',
			'700': '#455A64',
			'800': '#37474F',
			'900': '#263238',
		},
		'Primitivo alpine',
		'Escala primitiva en Tailwind. Uso puntual no identificado fuera de la paleta',
	),
	grey: scale(
		'grey',
		{
			'50': '#F7F7F7',
			'100': '#EDEDED',
			'200': '#E0E0E0',
			'300': '#C7C7C7',
			'400': '#ADADAD',
			'500': '#999999',
			'600': '#878787',
			'700': '#666666',
			'800': '#555555',
			'900': '#363636',
			'950': '#292727',
		},
		'Primitivo grey',
		'Escala paralela a gray. FilterSearchContainer usa grey-100',
	),
	red: scale(
		'red',
		{
			'50': '#FEF2F2',
			'100': '#FFE2E1',
			'200': '#FFC9C8',
			'300': '#FFA9A0',
			'400': '#FD6F6C',
			'500': '#F5423E',
			'600': '#E53935',
			'700': '#BE1B17',
			'800': '#9D1A17',
			'900': '#821C1A',
		},
		'Primitivo red',
		'Paleta pastel de botones danger y FormLabelError (text-red-500)',
	),
	green: scale(
		'green',
		{
			'50': '#F6FEF6',
			'100': '#E3FDE5',
			'200': '#BFF8C3',
			'300': '#99F1A0',
			'400': '#6BBD6E',
			'500': '#4CAE4F',
			'600': '#2C962F',
			'700': '#26782A',
			'800': '#226325',
			'900': '#1E5223',
		},
		'Primitivo green',
		'Paleta pastel de botones success',
	),
	blue: scale(
		'blue',
		{
			'50': '#F6FDFE',
			'100': '#E1FAFF',
			'200': '#B0EEFF',
			'300': '#88EAFF',
			'400': '#6DCCE6',
			'500': '#54B0CF',
			'600': '#3B95B9',
			'700': '#2279A2',
			'750': '#10709A',
			'800': '#055988',
			'900': '#034A6F',
		},
		'Primitivo blue',
		'Paleta pastel de botones info y acentos de filtros',
	),
	honey: scale(
		'honey',
		{
			'50': '#FFF8EB',
			'100': '#FFEDC6',
			'200': '#FFD888',
			'300': '#FFBE4A',
			'400': '#FFA726',
			'500': '#EF8329',
			'600': '#EB5C29',
			'700': '#B73D06',
			'800': '#942E0C',
			'900': '#7A260D',
		},
		'Primitivo honey',
		'Paleta histórica (comentada como primary deprecada). Sigue en Tailwind y en botones warning',
	),
	yellow: scale(
		'yellow',
		{
			'50': '#FEFDE8',
			'100': '#FEFCC7',
			'200': '#FEF590',
			'300': '#FFFF74',
			'400': '#FADF01',
			'500': '#F8D312',
			'600': '#E8BB0A',
			'700': '#C89106',
			'800': '#A06808',
			'900': '#84520F',
		},
		'Primitivo yellow',
		'Escala en Tailwind. Uso puntual no identificado en componentes',
	),
};

export const BUTTON_PASTEL_TOKENS: ColorToken[] = [
	{
		name: 'itsa-btn--primary bg',
		hex: '#EA3B48',
		cssVar: '--itsa-primary',
		source: 'css-variable',
		category: 'Botones',
		usage: 'Fondo primary',
	},
	{
		name: 'itsa-btn--primary hover',
		hex: '#D90022',
		source: 'detected',
		category: 'Botones',
		usage: 'Hover primary (primary-900 / --ant-colorPrimaryHover)',
	},
	{
		name: 'itsa-btn--primary active',
		hex: '#cf0021',
		source: 'detected',
		category: 'Botones',
		usage: 'Active primary',
	},
	{
		name: 'itsa-btn--secondary default',
		hex: '#595959',
		source: 'detected',
		category: 'Botones',
		usage: 'type="secondary" + default',
	},
	{
		name: 'itsa-btn--disabled',
		hex: '#d9d9d9',
		source: 'detected',
		category: 'Botones',
		usage: 'Fondo y borde deshabilitado Ant Design',
	},
	{
		name: 'itsa-btn--color-primary bg',
		hex: '#fff1f2',
		cssVar: '--itsa-btn-bg',
		source: 'css-variable',
		category: 'Botones',
		usage: 'Pastel primary',
	},
	{
		name: 'itsa-btn--danger bg',
		hex: '#fef2f2',
		cssVar: '--itsa-btn-bg',
		source: 'css-variable',
		category: 'Botones',
		usage: 'Pastel danger',
	},
	{
		name: 'itsa-btn--warning bg',
		hex: '#fff8eb',
		cssVar: '--itsa-btn-bg',
		source: 'css-variable',
		category: 'Botones',
		usage: 'Pastel warning',
	},
	{
		name: 'itsa-btn--success bg',
		hex: '#f6fef6',
		cssVar: '--itsa-btn-bg',
		source: 'css-variable',
		category: 'Botones',
		usage: 'Pastel success',
	},
	{
		name: 'itsa-btn--info bg',
		hex: '#f6fdfe',
		cssVar: '--itsa-btn-bg',
		source: 'css-variable',
		category: 'Botones',
		usage: 'Pastel info',
	},
];

export const DETECTED_COLORS: ColorToken[] = [
	{
		name: 'FilterSelect border (valor seleccionado)',
		hex: '#93c5fd',
		source: 'detected',
		category: 'Formularios',
		usage: 'Borde detectado en .itsa-select-has-value y BusinessLineSelect',
	},
	{
		name: 'Table selected row',
		hex: '#fce7e9',
		cssVar: '--itsa-table-row-selected-bg',
		source: 'css-variable',
		category: 'Tablas',
		usage: 'Fondo de fila seleccionada',
	},
	{
		name: 'Table checkbox unchecked',
		hex: '#b0bcd5',
		source: 'detected',
		category: 'Tablas',
		usage: 'Borde de checkbox no marcado (gray-300)',
	},
	{
		name: 'LoadingApp spinner',
		hex: '#6366F1',
		source: 'detected',
		category: 'Feedback',
		usage: 'border-t-indigo-500 en LoadingApp. No forma parte de la paleta de marca',
	},
	{
		name: 'Switch inactive',
		hex: '#bfbfbf',
		cssVar: '--switch-inactive-bg',
		source: 'css-variable',
		category: 'Formularios',
		usage: 'Fondo del Switch inactivo',
	},
	{
		name: 'WithoutInformation default',
		hex: '#00000073',
		source: 'detected',
		category: 'Feedback',
		usage: 'Color por defecto del icono WithoutInformation',
	},
];

export const FONT_WEIGHTS = [
	{ name: '300', usage: 'Importado (@fontsource/public-sans). Uso puntual no identificado' },
	{ name: '400', usage: 'Texto de cuerpo (Ant Design / Tailwind)' },
	{ name: '500', usage: 'Botones (.itsa-btn font-medium)' },
	{ name: '600', usage: 'Títulos de sección, valores de BusinessLineSelect' },
	{ name: '700', usage: 'FormLabel (font-bold), encabezados de tabla y BreadcrumbCustom' },
];

export const TYPE_ROLES = [
	{ role: 'H1–H5', source: 'Title (Ant Design Typography)', note: 'levels 1 a 5. H6 no implementado' },
	{ role: 'Texto normal', source: 'html/body con Public Sans', note: '14px por defecto de Ant Design' },
	{
		role: 'Texto secundario',
		source: 'Title type="secondary" / text-gray-400',
		note: 'WithoutInformation usa type="secondary"',
	},
	{ role: 'Etiquetas', source: 'FormLabel', note: 'font-bold, truncate' },
	{ role: 'Texto de ayuda', source: 'FormLabel optional', note: 'small text-gray-500 text-xs “(Opcional)”' },
	{ role: 'Texto de error', source: 'FormLabelError', note: 'text-red-500 text-xs' },
	{ role: 'Texto de botones', source: '.itsa-btn', note: 'text-xs / text-sm / text-base según size' },
	{ role: 'Texto de tablas', source: 'CSS de Table', note: '12px en paginación y cabecera compacta' },
];

export const hexToRgb = (hex: string) => {
	const normalized = hex.replace('#', '');
	if (normalized.length !== 6 && normalized.length !== 8) {
		return null;
	}
	return {
		r: parseInt(normalized.slice(0, 2), 16),
		g: parseInt(normalized.slice(2, 4), 16),
		b: parseInt(normalized.slice(4, 6), 16),
	};
};

const channelLuminance = (value: number) => {
	const channel = value / 255;
	return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
};

export const relativeLuminance = (hex: string) => {
	const rgb = hexToRgb(hex);
	if (!rgb) return null;
	return 0.2126 * channelLuminance(rgb.r) + 0.7152 * channelLuminance(rgb.g) + 0.0722 * channelLuminance(rgb.b);
};

export const contrastRatio = (hexA: string, hexB: string) => {
	const lumA = relativeLuminance(hexA);
	const lumB = relativeLuminance(hexB);
	if (lumA === null || lumB === null) return null;
	const lighter = Math.max(lumA, lumB);
	const darker = Math.min(lumA, lumB);
	return (lighter + 0.05) / (darker + 0.05);
};

export const preferredTextOn = (background: string) => {
	const white = contrastRatio(background, '#FFFFFF');
	const black = contrastRatio(background, '#111418');
	if (white === null || black === null) return { color: '#111418', ratio: null as number | null };
	return white >= black ? { color: '#FFFFFF', ratio: white } : { color: '#111418', ratio: black };
};
