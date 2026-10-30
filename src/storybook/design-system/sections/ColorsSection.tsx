import { Tag } from '../../../components/Tag';
import {
	BUTTON_PASTEL_TOKENS,
	COLOR_TAGS,
	COLORS_CONSTANT,
	CSS_VARIABLES,
	DETECTED_COLORS,
	GRAY_SCALE,
	PRIMARY_SCALE,
	PRIMITIVE_SCALES,
	SEMANTIC_COLORS,
	THEME_PALETTE,
} from '../tokens';
import { ColorGrid, DsBlock, DsSection, NotImplementedNote, SpecTable } from '../shared';

export const ColorsSection = () => (
	<DsSection
		id="colors"
		title="Colores y Design Tokens"
		description="Paleta extraída de tailwind.config.js, src/tailwind-entry.css, src/constants/colors.ts, helpers/theme y valores detectados en CSS. No se inventó ninguna muestra."
	>
		<DsBlock title="Tokens de marca y tema" status="implemented">
			<SpecTable
				rows={[
					{ label: 'Primario CSS', value: '--itsa-primary = #ea3b48' },
					{ label: 'Tema defaultTheme.primary.main', value: THEME_PALETTE.primary.main },
					{ label: 'Tema secondary.main', value: THEME_PALETTE.secondary.main },
					{ label: 'Tema tertiary.main', value: THEME_PALETTE.tertiary.main },
					{ label: 'COLORS.primary.700', value: COLORS_CONSTANT.primary700 },
					{
						label: 'COLORS.success / warning / error',
						value: `${COLORS_CONSTANT.success} / ${COLORS_CONSTANT.warning} / ${COLORS_CONSTANT.error}`,
					},
				]}
			/>
		</DsBlock>

		<DsBlock title="Variables CSS" status="implemented">
			<div className="overflow-x-auto">
				<table className="w-full text-left text-sm">
					<thead>
						<tr className="border-b border-gray-200 text-gray-500">
							<th className="py-2 pr-3">Variable</th>
							<th className="py-2 pr-3">Valor</th>
							<th className="py-2">Uso</th>
						</tr>
					</thead>
					<tbody>
						{CSS_VARIABLES.map(item => (
							<tr key={item.name} className="border-b border-gray-100">
								<td className="py-2 pr-3 font-medium">{item.name}</td>
								<td className="py-2 pr-3">{item.value}</td>
								<td className="py-2 text-gray-600">{item.usage}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</DsBlock>

		<DsBlock title="Color primario" status="implemented">
			<ColorGrid tokens={PRIMARY_SCALE} />
		</DsBlock>

		<DsBlock title="Fondos, superficies, texto, bordes" status="implemented">
			<ColorGrid tokens={GRAY_SCALE} />
		</DsBlock>

		<DsBlock title="Éxito, advertencia y error" status="implemented">
			<ColorGrid tokens={SEMANTIC_COLORS} />
		</DsBlock>

		<DsBlock title="Colores de botones" status="implemented">
			<ColorGrid tokens={BUTTON_PASTEL_TOKENS} />
		</DsBlock>

		<DsBlock title="COLOR_TAGS (estados en tablas/listados)" status="implemented">
			<div className="flex flex-wrap gap-2">
				{Object.entries(COLOR_TAGS).map(([name, value]) => (
					<Tag key={name} color={name === 'magenta' ? 'magenta' : name}>
						{name} · {value.text}
					</Tag>
				))}
			</div>
			<ColorGrid
				tokens={Object.entries(COLOR_TAGS).flatMap(([name, value]) => [
					{
						name: `COLOR_TAGS.${name}.bg`,
						hex: value.bg,
						source: 'constant' as const,
						category: 'Tags',
						usage: `Fondo de tag ${name}`,
					},
					{
						name: `COLOR_TAGS.${name}.text`,
						hex: value.text,
						source: 'constant' as const,
						category: 'Tags',
						usage: `Texto de tag ${name}`,
					},
				])}
			/>
		</DsBlock>

		<DsBlock title="Escalas primitivas de Tailwind" status="implemented">
			{Object.entries(PRIMITIVE_SCALES).map(([name, tokens]) => (
				<div key={name} className="flex flex-col gap-2">
					<strong className="capitalize">{name}</strong>
					<ColorGrid tokens={tokens} />
				</div>
			))}
		</DsBlock>

		<DsBlock title="Valores detectados (no tokenizados como paleta de marca)" status="partial">
			<ColorGrid tokens={DETECTED_COLORS} />
		</DsBlock>

		<DsBlock title="Tema oscuro" status="not-implemented">
			<NotImplementedNote text="No hay paleta dark, ni tokens :root[data-theme=dark], ni ConfigProvider con theme.darkAlgorithm." />
		</DsBlock>
	</DsSection>
);
