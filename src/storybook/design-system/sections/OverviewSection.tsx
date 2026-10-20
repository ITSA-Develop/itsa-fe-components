import { Tag } from '../../../components/Tag';
import { DESIGN_CONVENTIONS, INVENTORY, TECH_STACK, countByStatus } from '../inventory';
import { DsBlock, DsSection, SpecTable, StatusBadge } from '../shared';
import { PACKAGE_NAME, PACKAGE_VERSION } from '../tokens';

export const OverviewSection = () => (
	<DsSection
		id="overview"
		title="Información general"
		description="Datos leídos de package.json, Tailwind, Ant Design y los wrappers reales de la librería. Nada de esta sección es una paleta o stack inventado."
	>
		<DsBlock title="Aplicación / paquete" status="implemented">
			<SpecTable
				rows={[
					{ label: 'Nombre', value: PACKAGE_NAME },
					{ label: 'Versión', value: PACKAGE_VERSION },
					{ label: 'Descripción npm', value: 'Deploy Vercel (campo description de package.json)' },
					{ label: 'Tipo de producto', value: 'Librería de componentes para Front Office / Back Office ITSA' },
				]}
			/>
		</DsBlock>

		<DsBlock title="Tecnologías de interfaz" status="implemented">
			<SpecTable
				rows={[
					{ label: 'Framework', value: TECH_STACK.framework },
					{ label: 'Bundler', value: TECH_STACK.bundler },
					{ label: 'Librería de componentes', value: TECH_STACK.componentLibrary },
					{ label: 'Sistema de estilos', value: TECH_STACK.styling },
					{ label: 'Tipografía', value: TECH_STACK.fonts },
					{ label: 'Iconos', value: TECH_STACK.icons },
					{ label: 'Formularios', value: TECH_STACK.forms },
					{ label: 'Estado', value: TECH_STACK.state },
					{ label: 'Documentación', value: TECH_STACK.docs },
				]}
			/>
		</DsBlock>

		<DsBlock title="Modo de visualización" status="not-implemented">
			<SpecTable
				rows={[
					{ label: 'Tema claro', value: 'Implementado. Es el único tema del producto.' },
					{
						label: 'Tema oscuro',
						value: 'No implementado. UIProvider no configura algorithm dark. Tailwind no declara darkMode.',
					},
					{
						label: 'Clases dark: aisladas',
						value: 'Detectadas solo en LoadingApp (dark:bg-black/50, dark:border-gray-700). No constituyen un tema.',
					},
				]}
			/>
		</DsBlock>

		<DsBlock title="Convenciones de diseño" status="implemented">
			<ul className="list-disc space-y-1 pl-5 text-sm text-gray-800">
				{DESIGN_CONVENTIONS.map(item => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</DsBlock>

		<DsBlock title="Estado de implementación" status="implemented">
			<div className="mb-3 flex flex-wrap gap-2">
				<Tag color="green">Implementado: {countByStatus('implemented')}</Tag>
				<Tag color="orange">Parcial: {countByStatus('partial')}</Tag>
				<Tag color="gold">No exportado: {countByStatus('not-exported')}</Tag>
				<Tag color="red">No implementado: {countByStatus('not-implemented')}</Tag>
				<Tag>No identificado: {countByStatus('not-identified')}</Tag>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full text-left text-sm">
					<thead>
						<tr className="border-b border-gray-200 text-gray-500">
							<th className="py-2 pr-3">Elemento</th>
							<th className="py-2 pr-3">Estado</th>
							<th className="py-2 pr-3">API pública</th>
							<th className="py-2">Notas</th>
						</tr>
					</thead>
					<tbody>
						{INVENTORY.map(item => (
							<tr key={item.name} className="border-b border-gray-100 align-top">
								<td className="py-2 pr-3 font-medium">{item.name}</td>
								<td className="py-2 pr-3">
									<StatusBadge status={item.status} />
								</td>
								<td className="py-2 pr-3">{item.publicApi ? 'Sí' : 'No'}</td>
								<td className="py-2 text-gray-600">{item.notes}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</DsBlock>
	</DsSection>
);
