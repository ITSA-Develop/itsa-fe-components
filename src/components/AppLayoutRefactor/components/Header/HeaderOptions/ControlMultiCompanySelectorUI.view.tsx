
import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import {
  COMPANY_SELECT_LABEL_MAX_LENGTH,
  renderTruncatedHeaderSelectLabel,
  truncateHeaderSelectLabel,
} from "../utils/headerSelectLabel";
import { useAppLayoutStore } from "../../store";
import {
  HEADER_SELECT_CLASSNAME,
  MOBILE_SELECT_WRAPPER_CLASSNAME,
  MOBILE_SELECT_WRAPPER_STYLE,
  MOBILE_TREE_SELECT_CLASSNAME,
  POPUP_STYLES,
  SELECT_WRAPPER_CLASSNAME,
  SELECT_WRAPPER_STYLE,
} from "@/constants";

export interface ControlMultiCompanySelectorUIProps {
  optionsCompany: DefaultOptionType[];
  loadingAppLayout: boolean;
}
export const ControlMultiCompanySelectorUI = ({ optionsCompany, loadingAppLayout }: ControlMultiCompanySelectorUIProps) => {
  const { currentCompany, selectCompany } = useAppLayoutStore();

  const onSelect = (value: string) => {
    selectCompany(value);
  };

  const currentCompanyValue =
    currentCompany?.value !== undefined && currentCompany.value !== null
      ? String(currentCompany.value)
      : undefined;

  const labelRenderMobile: SelectProps['labelRender'] = ({ label }) => {
    const text = String(label ?? '');
    return (
      <span title={text}>{truncateHeaderSelectLabel(text, COMPANY_SELECT_LABEL_MAX_LENGTH)}</span>
    );
  };

  const selectProps = {
    options: optionsCompany,
    onChange: onSelect,
    value: currentCompanyValue,
    size: 'middle' as const,
    popupMatchSelectWidth: false,
    styles: POPUP_STYLES,
    placeholder: <DeploymentUnitOutlined className="p-2" />,
    loading: loadingAppLayout,
  };

  if (optionsCompany.length <= 1) {
    return null;
  }

  return <div className="flex flex-row gap-1">
    <div className={`hidden md:block ${SELECT_WRAPPER_CLASSNAME}`} style={SELECT_WRAPPER_STYLE}>
      <Select
        className={HEADER_SELECT_CLASSNAME}
        {...selectProps}
        labelRender={renderTruncatedHeaderSelectLabel}
      />
    </div>
    <div className={MOBILE_SELECT_WRAPPER_CLASSNAME} style={MOBILE_SELECT_WRAPPER_STYLE}>
      <Select
        className={MOBILE_TREE_SELECT_CLASSNAME}
        {...selectProps}
        labelRender={labelRenderMobile}
        suffixIcon={null}
        placement="bottomRight"
      />
    </div>
  </div>;
};
