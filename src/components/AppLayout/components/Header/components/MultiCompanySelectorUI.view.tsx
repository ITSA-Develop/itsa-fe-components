import { useEncrypt } from "@/hooks/useEncrypt/useEncrypt";
import { useAppLayoutStore } from "@/store";
import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { DeploymentUnitOutlined } from "@ant-design/icons";

const SELECT_CLASSNAME =
  "w-full min-w-0 [&_.ant-select-selector]:!bg-primary-600 [&_.ant-select-selector]:!border-primary-700 [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!text-white-100 [&_.ant-select-selection-placeholder]:!text-white-100 [&_.ant-select-arrow]:!text-white-100 hover:[&_.ant-select-selector]:!bg-primary-700 hover:[&_.ant-select-selector]:!border-primary-700 [&.ant-select-focused_.ant-select-selector]:!bg-primary-700 [&.ant-select-focused_.ant-select-selector]:!border-primary-700";

const MOBILE_SELECT_CLASSNAME =
  `${SELECT_CLASSNAME} [&_.ant-select-selector]:!px-0 [&_.ant-select-selection-placeholder]:!inset-0 [&_.ant-select-selection-placeholder]:!flex [&_.ant-select-selection-placeholder]:!items-center [&_.ant-select-selection-placeholder]:!justify-center`;

// El trigger en mobile solo muestra el icono, por lo que el popup no puede heredar su ancho.
const POPUP_STYLES: SelectProps['styles'] = {
  popup: { root: { minWidth: 220, maxWidth: 'calc(100vw - 24px)', maxHeight: 320, overflow: 'auto' } },
};

export interface MultiCompanySelectorUIProps {
  optionsCompany: DefaultOptionType[];
}
export const MultiCompanySelectorUI = ({ optionsCompany }: MultiCompanySelectorUIProps) => {
  const { currentCompany, setCurrentCompany } = useAppLayoutStore();
  const { encryptKey } = useEncrypt();

  const onSelect = (value: string) => {
    const company = optionsCompany.find(company => company.value === value);
    if (company) {
      setCurrentCompany(company, encryptKey);
    }
  };

  const currentCompanyValue = currentCompany?.value ? String(currentCompany.value) : undefined;

  return <div className="flex flex-row items-center justify-center">
    <div className="hidden md:block w-full min-w-0">
      <Select className={SELECT_CLASSNAME}
        options={optionsCompany}
        onChange={onSelect}
        value={currentCompanyValue}
        placeholder="Seleccione una empresa"
        popupMatchSelectWidth={false}
        styles={POPUP_STYLES}
      />
    </div>

    <div className="block w-10 shrink-0 md:hidden">
      <Select className={MOBILE_SELECT_CLASSNAME}
        options={optionsCompany}
        onChange={onSelect}
        value={currentCompanyValue}
        placeholder={<DeploymentUnitOutlined />}
        suffixIcon={null}
        popupMatchSelectWidth={false}
        placement="bottomRight"
        styles={POPUP_STYLES}
      />
    </div>
  </div>;
};
