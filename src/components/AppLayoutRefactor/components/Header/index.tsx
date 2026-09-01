import { HEADER_ENVIRONMENT_WATERMARK_LAYER_CLASSNAME, renderHeaderEnvironmentWatermark } from "@/helpers/environmentWatermark";
import { useEnvironment } from "@/hooks/useEnvironment";
import { DefaultOptionType } from "antd/es/select";
import { MenuProps } from 'antd';
import { NavigateFunction } from 'react-router-dom';
import { IItemNotification } from "@/interfaces";
import { HeaderOptions } from "./HeaderOptions";

export interface HeaderLayoutProps {
	optionsCompany: DefaultOptionType[];
	userActions?: MenuProps;
	notifications?: IItemNotification[];
	loadingAppLayout?: boolean;
	navigateApp?: NavigateFunction;
}

export const HeaderLayout = ({
	// optionsCompany,
	// userActions,
	// notifications,
	// loadingAppLayout,
	// navigateApp,
}: HeaderLayoutProps) => {
	const environment = useEnvironment();
  // const isActiveMultiCompanySelector = optionsCompany.length > 0;
	return <header className="h-16">
		<div className={`relative overflow-hidden rT_lineas_rectas_transparente.svgounded-tr-none rounded-tl-none rounded-br-xl rounded-bl-xl md:rounded-xl h-16 bg-primary-700`}>
			{environment !== 'PRODUCCION' && (
				<div
					aria-hidden="true"
					className={`${HEADER_ENVIRONMENT_WATERMARK_LAYER_CLASSNAME} text-gray-75/25`}
				>
					{renderHeaderEnvironmentWatermark(environment)}
				</div>
			)}
		<HeaderOptions />

</div>
	</header>
};