import { EOptionsFilterStatus } from '@/enums';
import { TreeSelectProps } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
export * from './icons';

export const DATE_FORMAT_UI = 'DD/MM/YYYY';
export const DATE_YEAR_FORMAT_UI = 'YYYY';
export const DATE_FORMAT_DAYJS_DEFAULT = 'YYYY-MM-DD';

export const TABLE_HEADER_ACTIONS = 'actions';

const AXIOS_INITIAL_CONF = {
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
};

export const instance = axios.create({
	...AXIOS_INITIAL_CONF,
});

export const REGEX_FORMATS = {
	email: /^(?!.*\.\.)[a-zA-Z0-9](\.?[a-zA-Z0-9_%+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
};

export const MAX_DATE_ADULT = dayjs().subtract(18, 'year');
export const TODAY = dayjs();

export const FILE_TYPES = {
	excel: '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	word: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	text: 'text/plain',
	pdf: 'application/pdf',
	zip: '.zip,application/zip',
};

export const ROWS_PER_PAGE_DEFAULT = 10;
export const ROWS_PER_PAGE = [10, 25, 50, 100];

export const ROUTES_IMAGES = {
	companyLogo: 'src/assets/images/image-itsa-logo.png',
};

export const LOGO_DIMENSIONS = {
	HEADER_WIDTH: 150.46,
	HEADER_HEIGHT: 24,
};

export const DEFAULT_PAGINATION_CONFIG = {
	current: 1,
	pageSize: 20,
	showSizeChanger: true,
	showQuickJumper: false,
	showTotal: (total: number) => `Total ${total} items`,
	pageSizeOptions: [10, 20, 50, 100],
	hideOnSinglePage: false,
	showLessItems: true,
	totalBoundaryShowSizeChanger: 100,
};

export const TABLE_SCROLL = { y: 'calc(100dvh - 323px)', x: 1000 };

export * from './agencies';
export * from './iconOptions';

export const API_VERSIONS_MODULE = {
	security: 'sec/v1/security/',
};

export const TABS_ITEM_CONTENT_WIDTH = '650px';

export const COLOR_TAGS = {
	magenta: {
		text: '#EB2F96',
		borde: '#FFADD2',
		bg: '#FFF0F6',
	},
	green: {
		text: '#52A927',
		borde: '#9FCA7F',
		bg: '#F6FFED',
	},
	blue: {
		text: '#2F54EB',
		borde: '#ADC6FF',
		bg: '#F0F5FF',
	},
	orange: {
		text: '#FA8C16',
		borde: '#FFD591',
		bg: '#FFF7E6',
	},
	red: {
		text: '#F5222D',
		borde: '#FFA39E',
		bg: '#FFF1F0',
	},
};

export const MODAL_HEIGHT = {
	'90vh': '90vh',
	'80vh': '80vh',
	'70vh': '70vh',
	'60vh': '60vh',
};

export const OPTIONS_STATUS = [
	{ label: 'Todos', value: EOptionsFilterStatus.undefined },
	{ label: 'Activos', value: EOptionsFilterStatus.active },
	{ label: 'Inactivos', value: EOptionsFilterStatus.inactive },
];

export const LIST_MICRO_FRONTENDS = {
	BACKOFFICE: 'BACKOFFICE',
	FRONTOFFICE: 'FRONTOFFICE',
}
export const LOCATION_DEFAULT = {
	lat: -2.8975518745091158,
	lng: -79.0039876216035,
}
export * from './carouselImages';

export const HEADER_SELECT_CLASSNAME =
	'w-full min-w-0 text-xs [&_.ant-select-selector]:!h-8 [&_.ant-select-selector]:!px-2 [&_.ant-select-selector]:!bg-primary-600 [&_.ant-select-selector]:!border-primary-700 [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!text-xs [&_.ant-select-selection-item]:!leading-[30px] [&_.ant-select-selection-item]:!text-white-100 [&_.ant-select-selection-item]:!block [&_.ant-select-selection-item]:!min-w-0 [&_.ant-select-selection-item]:!max-w-full [&_.ant-select-selection-item]:!truncate [&_.ant-select-selection-item-content]:!block [&_.ant-select-selection-item-content]:!max-w-full [&_.ant-select-selection-item-content]:!truncate [&_.ant-select-selection-placeholder]:!text-xs [&_.ant-select-selection-placeholder]:!leading-[30px] [&_.ant-select-selection-placeholder]:!text-white-100 [&_.ant-select-arrow]:!text-white-100 hover:[&_.ant-select-selector]:!bg-primary-700 hover:[&_.ant-select-selector]:!border-primary-700 [&.ant-select-focused_.ant-select-selector]:!bg-primary-700 [&.ant-select-focused_.ant-select-selector]:!border-primary-700';

export const TREE_SELECT_CLASSNAME = HEADER_SELECT_CLASSNAME;

export const MOBILE_TREE_SELECT_CLASSNAME =
	`${HEADER_SELECT_CLASSNAME} [&_.ant-select-selector]:!px-0 [&_.ant-select-selection-placeholder]:!inset-0 [&_.ant-select-selection-placeholder]:!flex [&_.ant-select-selection-placeholder]:!items-center [&_.ant-select-selection-placeholder]:!justify-center`;

export const SELECT_WRAPPER_CLASSNAME = 'shrink-0';
export const SELECT_WRAPPER_STYLE = {
	width: 'clamp(120px, calc((100vw - 300px) / 3), 200px)',
} as const;
export const MOBILE_SELECT_WRAPPER_CLASSNAME = 'block min-w-0 shrink-0 md:hidden';
export const MOBILE_SELECT_WRAPPER_STYLE = { width: 64 } as const;

export const USER_INFO_WRAPPER_CLASSNAME = 'hidden min-w-0 max-w-[clamp(80px,calc((100vw-320px)/4),140px)] flex-col md:flex';

export const POPUP_STYLES: TreeSelectProps['styles'] = {
	popup: { root: { minWidth: 220, maxWidth: 'calc(100vw - 24px)', maxHeight: 320, overflow: 'auto' } },
};