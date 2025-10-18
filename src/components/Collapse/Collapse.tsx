import { Collapse as AntCollapse, CollapseProps } from 'antd';

export const Collapse = ({ className, size = 'small', bordered = false, ...rest }: CollapseProps) => {
    const mergedClassName = ['itsa-collapse--compact', className].filter(Boolean).join(' ');
    return <AntCollapse className={mergedClassName} size={size} bordered={bordered} {...rest} />;
};
