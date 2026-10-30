import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiPencil, mdiPlus, mdiTrashCanOutline } from '@mdi/js';
import { Button, type TButtonColor, type TButtonType } from '../../../components/Button';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { ButtonAddItem } from '../../../components/ButtonAddItem';
import { DropdownButton } from '../../../components/DropdownButton/DropdownButton';
import { SelectorButtonList } from '../../../components/SelectorButtonList';
import { DsBlock, DsSection, NotImplementedNote, PreviewFrame, SpecTable } from '../shared';

const APPEARANCES: TButtonType[] = ['primary', 'secondary', 'default', 'dashed', 'text', 'link'];
const COLORS: TButtonColor[] = ['primary', 'danger', 'warning', 'success', 'info'];
const SIZES: Array<'small' | 'middle' | 'large'> = ['small', 'middle', 'large'];

export const ButtonsSection = () => {
	const [clicks, setClicks] = useState(0);

	return (
		<DsSection
			id="buttons"
			title="Botones"
			description="Los botones de producto viven en Button. Las variantes se implementan con clases .itsa-btn--* sobre Ant Design. Puede pulsarlos en esta página."
		>
			<DsBlock title="Apariencias" status="implemented">
				<PreviewFrame label="type: primary, secondary, default, dashed, text, link">
					<div className="flex flex-wrap items-center gap-2">
						{APPEARANCES.map(type => (
							<Button key={type} type={type} label={type} onClick={() => setClicks(value => value + 1)} />
						))}
					</div>
				</PreviewFrame>
			</DsBlock>

			<DsBlock title="Semánticos / destructivo" status="implemented">
				<PreviewFrame label="Atajos type=danger|warning|success|info y alias danger">
					<div className="flex flex-wrap items-center gap-2">
						<Button type="danger" label="Eliminar" onClick={() => setClicks(value => value + 1)} />
						<Button type="warning" label="Advertencia" onClick={() => setClicks(value => value + 1)} />
						<Button type="success" label="Confirmar" onClick={() => setClicks(value => value + 1)} />
						<Button type="info" label="Información" onClick={() => setClicks(value => value + 1)} />
					</div>
				</PreviewFrame>
				<PreviewFrame label="Paleta pastel con color + type">
					<div className="flex flex-col gap-3">
						{COLORS.map(color => (
							<div key={color} className="flex flex-wrap items-center gap-2">
								<span className="w-20 text-xs capitalize text-gray-500">{color}</span>
								{APPEARANCES.map(type => (
									<Button
										key={`${color}-${type}`}
										type={type}
										color={color}
										label={type}
										onClick={() => setClicks(value => value + 1)}
									/>
								))}
							</div>
						))}
					</div>
				</PreviewFrame>
			</DsBlock>

			<DsBlock title="Tamaños, carga y deshabilitado" status="implemented">
				<PreviewFrame>
					<div className="flex flex-col gap-3">
						<div className="flex flex-wrap items-center gap-2">
							{SIZES.map(size => (
								<Button
									key={size}
									type="primary"
									size={size}
									label={size}
									onClick={() => setClicks(value => value + 1)}
								/>
							))}
						</div>
						<div className="flex flex-wrap items-center gap-2">
							<Button type="primary" loading label="Guardando" />
							<Button type="secondary" loading label="Cargando" />
							<Button type="primary" disabled label="Primary disabled" />
							<Button type="secondary" default disabled label="Secondary default disabled" />
						</div>
						<Button
							type="secondary"
							default
							label="Secondary default (#595959)"
							onClick={() => setClicks(value => value + 1)}
						/>
					</div>
				</PreviewFrame>
				<p className="text-xs text-gray-500">Clicks de prueba en esta sección: {clicks}</p>
			</DsBlock>

			<DsBlock title="Confirmación, iconos y acciones CRUD" status="implemented">
				<PreviewFrame label="Button.confirm usa Popconfirm interno">
					<div className="flex flex-wrap items-center gap-2">
						<Button type="primary" label="Guardar" confirm onClick={() => setClicks(value => value + 1)} />
						<Button
							type="danger"
							label="Eliminar"
							confirm="¿Eliminar este registro?"
							onClick={() => setClicks(value => value + 1)}
						/>
						<ButtonAddItem label="Agregar ítem" onClick={() => setClicks(value => value + 1)} />
						<ButtonIcon
							type="primary"
							ariaLabel="Editar"
							title="Editar"
							icon={<Icon path={mdiPencil} size={0.7} />}
							onClick={() => setClicks(value => value + 1)}
						/>
						<ButtonIcon
							type="danger"
							ariaLabel="Eliminar"
							title="Eliminar"
							icon={<Icon path={mdiTrashCanOutline} size={0.7} />}
							onClick={() => setClicks(value => value + 1)}
						/>
						<ButtonIcon
							type="success"
							ariaLabel="Crear"
							title="Crear"
							icon={<Icon path={mdiPlus} size={0.7} />}
							onClick={() => setClicks(value => value + 1)}
						/>
					</div>
				</PreviewFrame>
				<PreviewFrame label="DropdownButton">
					<DropdownButton
						label="Acciones"
						items={[
							{ key: 'edit', label: 'Editar', type: 'primary', onClick: () => setClicks(value => value + 1) },
							{ key: 'delete', label: 'Eliminar', type: 'danger', onClick: () => setClicks(value => value + 1) },
						]}
					/>
				</PreviewFrame>
				<PreviewFrame label="SelectorButtonList">
					<SelectorButtonList
						showNotification={false}
						clickHandler={() => setClicks(value => value + 1)}
						buttons={[
							{ label: 'Opción A', value: 'a' },
							{ label: 'Opción B', value: 'b' },
						]}
					/>
				</PreviewFrame>
			</DsBlock>

			<DsBlock title="Especificación visual" status="implemented">
				<SpecTable
					rows={[
						{ label: 'Radio', value: 'small 8px · middle 12px · large 16px (.itsa-btn--sm/md/lg)' },
						{ label: 'Hover primary', value: 'primary-900 / #D90022' },
						{ label: 'Active primary', value: '#cf0021' },
						{ label: 'Focus', value: 'El anillo de foco lo aporta Ant Design. No hay token ITSA específico' },
						{ label: 'Disabled', value: '#d9d9d9 fondo y borde, texto blanco, pointer-events none' },
						{ label: 'Responsive', value: 'width y block. No hay variante de tamaño por breakpoint' },
						{
							label: 'ButtonDanger',
							value: 'No exportado en index.ts. El destructivo público es Button type="danger"',
						},
					]}
				/>
				<NotImplementedNote text="No existe un botón terciario con ese nombre. El equivalente implementado es type='text' o type='link'." />
			</DsBlock>
		</DsSection>
	);
};
