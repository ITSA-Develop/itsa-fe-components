
import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import {
  COMPANY_SELECT_LABEL_MAX_LENGTH,
  truncateHeaderSelectLabel,
} from "../utils/headerSelectLabel";
import { useAppLayoutStore } from "../../store/useAppLayoutStore";

const SELECT_CLASSNAME =
  "w-full min-w-0 [&_.ant-select-selector]:!bg-primary-600 [&_.ant-select-selector]:!border-primary-700 [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!text-white-100 [&_.ant-select-selection-item]:!block [&_.ant-select-selection-item]:!max-w-full [&_.ant-select-selection-placeholder]:!text-white-100 [&_.ant-select-arrow]:!text-white-100 hover:[&_.ant-select-selector]:!bg-primary-700 hover:[&_.ant-select-selector]:!border-primary-700 [&.ant-select-focused_.ant-select-selector]:!bg-primary-700 [&.ant-select-focused_.ant-select-selector]:!border-primary-700";

const MOBILE_SELECT_CLASSNAME =
  `${SELECT_CLASSNAME} [&_.ant-select-selection-item]:!truncate [&_.ant-select-selector]:!px-0 [&_.ant-select-selection-placeholder]:!inset-0 [&_.ant-select-selection-placeholder]:!flex [&_.ant-select-selection-placeholder]:!items-center [&_.ant-select-selection-placeholder]:!justify-center`;

// El trigger en mobile solo muestra el icono, por lo que el popup no puede heredar su ancho.
const POPUP_STYLES: SelectProps['styles'] = {
  popup: { root: { minWidth: 220, maxWidth: 'calc(100vw - 24px)', maxHeight: 320, overflow: 'auto' } },
};

export interface ControlMultiCompanySelectorUIProps {
  optionsCompany: DefaultOptionType[];
}
export const ControlMultiCompanySelectorUI = ({ optionsCompany }: ControlMultiCompanySelectorUIProps) => {
  const { currentCompany, setCurrentCompany } = useAppLayoutStore();

  const onSelect = (value: string) => {
    const company = optionsCompany.find(company => company.value === value);
    if (company) {
      setCurrentCompany(company);
    }
  };

  const currentCompanyValue = currentCompany?.value ? String(currentCompany.value) : undefined;

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
    popupMatchSelectWidth: false,
    styles: POPUP_STYLES,
  };

  return <div className="flex flex-row items-center justify-center">
    <div className="hidden md:block">
      <Select className={SELECT_CLASSNAME}
        {...selectProps}
        placeholder="Seleccione una empresa"
      />
    </div>
    <div className="block shrink-0 md:hidden">
      <Select className={MOBILE_SELECT_CLASSNAME}
        {...selectProps}
        labelRender={labelRenderMobile}
        placeholder={<DeploymentUnitOutlined />}
        suffixIcon={null}
        placement="bottomRight"
      />
    </div>
  </div>;
};
