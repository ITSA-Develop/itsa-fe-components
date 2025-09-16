import axios from 'axios';
import dayjs from 'dayjs';

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
};

export const TABLE_SCROLL = {
	y: 300,
};

export * from './agencies';

export const API_VERSIONS_MODULE = {
	security: 'sec/v1/security/',
};

export const TABS_ITEM_CONTENT_WIDTH = '512px';

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
};