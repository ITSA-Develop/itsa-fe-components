import { InputProps } from 'antd';
import { RefCallBack } from 'react-hook-form';

export interface InputSearchProps extends InputProps {
    type: string;
    defaultValue?: string;
    ref?: RefCallBack;
    loading?: boolean;
    enterButton?: boolean;
    onSearch?: (value: string) => void;
    debounceDelay?: number;
    debounceLeading?: boolean;
    debounceTrailing?: boolean;
    enableLoading?: boolean;
}
export declare const InputSearch: ({ ref, type, defaultValue, loading, onSearch, debounceDelay, debounceLeading, debounceTrailing, enableLoading, ...rest }: InputSearchProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map