import { HEADER_ENVIRONMENT_WATERMARK_LAYER_CLASSNAME, renderHeaderEnvironmentWatermark } from "@/helpers/environmentWatermark";
import { useEnvironment } from "@/hooks/useEnvironment";

import { MultiCompanySelectorUI } from './components/MultiCompanySelectorUI.view';
import { ButtonSidebarTitleUI } from './components/ButtonSidebarTitleUI.view';
import { DefaultOptionType } from "antd/es/select";
import { UserActions } from "./components/UserActions";
import { MenuProps } from 'antd';
import { NavigateFunction } from 'react-router-dom';

export interface HeaderLayoutProps {
	showMultiCompanySelector: boolean;
	optionsCompany: DefaultOptionType[];
	userActions?: MenuProps;
	notifications?: MenuProps;
	loadingAppLayout?: boolean;
	navigateApp?: NavigateFunction;
}

export const HeaderLayout = ({
	optionsCompany,
	showMultiCompanySelector,
	userActions,
	notifications,
	loadingAppLayout,
	navigateApp,
}: HeaderLayoutProps) => {
	const environment = useEnvironment();
	return <header className="h-16">
		<div className={`relative overflow-hidden rounded-tr-none rounded-tl-none rounded-br-xl rounded-bl-xl md:rounded-xl h-16 bg-primary-700`}>
			{environment !== 'PRODUCCION' && (
				<div
					aria-hidden="true"
					className={`${HEADER_ENVIRONMENT_WATERMARK_LAYER_CLASSNAME} text-gray-75/25`}
				>
					{renderHeaderEnvironmentWatermark(environment)}
				</div>
			)}
			<div className="relative z-10 grid grid-cols-4 items-center justify-between w-full h-full pr-2 pl-2">
				<ButtonSidebarTitleUI environment={environment} />
				<div>
					{showMultiCompanySelector && <MultiCompanySelectorUI optionsCompany={optionsCompany} />}
				</div>
				<div className="col-span-2 min-w-0">
					<UserActions
						userActions={userActions}
						notifications={notifications}
						loadingAppLayout={loadingAppLayout}
						navigateApp={navigateApp}
					/>
				</div>
			</div>
		</div>

	</header>
};