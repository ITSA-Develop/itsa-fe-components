import { BaseType } from 'antd/es/typography/Base';

export interface ITitle {
    title: string;
    level: 1 | 2 | 3 | 4 | 5;
    className?: string;
    type?: BaseType;
}
export declare const Title: ({ title, level, className, type }: ITitle) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map