import { EOptionsFilterStatus } from '../enums';
import { default as dayjs } from 'dayjs';

export * from './icons';
export declare const DATE_FORMAT_UI = "DD/MM/YYYY";
export declare const DATE_YEAR_FORMAT_UI = "YYYY";
export declare const DATE_FORMAT_DAYJS_DEFAULT = "YYYY-MM-DD";
export declare const TABLE_HEADER_ACTIONS = "actions";
export declare const instance: import('axios').AxiosInstance;
export declare const REGEX_FORMATS: {
    email: RegExp;
};
export declare const MAX_DATE_ADULT: dayjs.Dayjs;
export declare const TODAY: dayjs.Dayjs;
export declare const FILE_TYPES: {
    excel: string;
    word: string;
    text: string;
    pdf: string;
    zip: string;
};
export declare const ROWS_PER_PAGE_DEFAULT = 10;
export declare const ROWS_PER_PAGE: number[];
export declare const ROUTES_IMAGES: {
    companyLogo: string;
};
export declare const LOGO_DIMENSIONS: {
    HEADER_WIDTH: number;
    HEADER_HEIGHT: number;
};
export declare const DEFAULT_PAGINATION_CONFIG: {
    current: number;
    pageSize: number;
    showSizeChanger: boolean;
    showQuickJumper: boolean;
    showTotal: (total: number) => string;
    pageSizeOptions: number[];
    hideOnSinglePage: boolean;
    showLessItems: boolean;
    totalBoundaryShowSizeChanger: number;
};
export declare const TABLE_SCROLL: {
    y: number;
};
export * from './agencies';
export declare const API_VERSIONS_MODULE: {
    security: string;
};
export declare const TABS_ITEM_CONTENT_WIDTH = "512px";
export declare const COLOR_TAGS: {
    magenta: {
        text: string;
        borde: string;
        bg: string;
    };
    green: {
        text: string;
        borde: string;
        bg: string;
    };
    blue: {
        text: string;
        borde: string;
        bg: string;
    };
    orange: {
        text: string;
        borde: string;
        bg: string;
    };
    red: {
        text: string;
        borde: string;
        bg: string;
    };
};
export declare const MODAL_HEIGHT: {
    '90vh': string;
    '80vh': string;
    '70vh': string;
    '60vh': string;
};
export declare const OPTIONS_STATUS: {
    label: string;
    value: EOptionsFilterStatus;
}[];
//# sourceMappingURL=index.d.ts.map