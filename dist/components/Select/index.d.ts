import { SelectProps } from 'antd';
import { RefCallBack } from 'react-hook-form';

export interface ISelectProps extends SelectProps {
    status?: 'error' | 'warning' | undefined;
    ref?: RefCallBack;
}
export declare const Select: ({ ref, status, ...rest }: ISelectProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map