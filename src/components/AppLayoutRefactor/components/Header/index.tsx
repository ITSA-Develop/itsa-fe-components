import { HEADER_ENVIRONMENT_WATERMARK_LAYER_CLASSNAME, renderHeaderEnvironmentWatermark } from "@/helpers/environmentWatermark";
import { useEnvironment } from "@/hooks/useEnvironment";
import { DefaultOptionType } from "antd/es/select";
import { HeaderOptions } from "./HeaderOptions";

export interface HeaderLayoutProps {
	optionsCompany: DefaultOptionType[];
	loadingAppLayout: boolean;
}

export const HeaderLayout = ({
	optionsCompany,
	loadingAppLayout,
}: HeaderLayoutProps) => {
	const environment = useEnvironment();
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
			<HeaderOptions optionsCompany={optionsCompany} loadingAppLayout={loadingAppLayout} />
		</div>
	</header>
};