import { InputProps } from 'antd';
import { RefCallBack } from 'react-hook-form';

export interface IInputProps extends InputProps {
    showCountCharacters?: boolean;
    ref?: RefCallBack | undefined;
    type: string;
}
export declare const Input: ({ ref, showCountCharacters, type, ...rest }: IInputProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Input.d.ts.map