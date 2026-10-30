import { useState } from 'react';
import { Alert } from '../../../components/Alert/Alert';
import { Avatar } from '../../../components/Avatar/Avatar';
import { Badge } from '../../../components/Badge/Badge';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card/Card';
import { Collapse } from '../../../components/Collapse/Collapse';
import { Descriptions } from '../../../components/Descriptions';
import { Drawer } from '../../../components/Drawer/Drawer';
import { Empty } from '../../../components/Empty';
import { InfoRow } from '../../../components/InfoRow/InfoRow';
import { Modal } from '../../../components/Modal/Modal';
import { Notification } from '../../../components/Notification';
import { Progress } from '../../../components/Progress/Progress';
import { Segmented } from '../../../components/Segmented/Segmented';
import { Skeleton } from '../../../components/Skeleton/Skeleton';
import { Spin } from '../../../components/Spin';
import { Table } from '../../../components/Table';
import { Tag } from '../../../components/Tag';
import { TagStatus } from '../../../components/TagStatus';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { WithoutInformation } from '../../../components/WithoutInformation';
import { DsBlock, DsSection, NotImplementedNote, PreviewFrame } from '../shared';

type DemoRow = { id: number; name: string; city: string; active: boolean };

const TABLE_DATA: DemoRow[] = [
	{ id: 1, name: 'Cliente demo A', city: 'Cuenca', active: true },
	{ id: 2, name: 'Cliente demo B', city: 'Quito', active: false },
	{ id: 3, name: 'Cliente demo C', city: 'Guayaquil', active: true },
];

export const CatalogSection = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [segment, setSegment] = useState('listado');

	return (
		<DsSection
			id="catalog"
			title="Navegación, feedback, datos y superficies"
			description="Componentes existentes más allá de botones y formularios. Cada preview usa el wrapper de la librería, no Ant Design directo."
		>
			<DsBlock title="Navegación adicional" status="implemented">
				<PreviewFrame label="Segmented">
					<Segmented
						value={segment}
						onChange={value => setSegment(String(value))}
						options={[
							{ label: 'Listado', value: 'listado' },
							{ label: 'Tablero', value: 'tablero' },
						]}
					/>
				</PreviewFrame>
			</DsBlock>

			<DsBlock title="Feedback y estados" status="implemented">
				<div className="grid gap-3 md:grid-cols-2">
					<Alert type="success" showIcon message="Operación correcta" />
					<Alert type="info" showIcon message="Información de contexto" />
					<Alert type="warning" showIcon message="Revise los datos ingresados" />
					<Alert type="error" showIcon message="No se pudo guardar" />
				</div>
				<Notification type="success" showIcon title="Guardado" description="Registro de demostración actualizado." />
				<div className="grid gap-3 md:grid-cols-3">
					<PreviewFrame label="Empty">
						<Empty description="Sin registros" />
					</PreviewFrame>
					<PreviewFrame label="WithoutInformation">
						<div className="h-40">
							<WithoutInformation title="Sin información" size={64} />
						</div>
					</PreviewFrame>
					<PreviewFrame label="Spin / Skeleton / Progress">
						<div className="flex flex-col gap-3">
							<Spin />
							<Skeleton />
							<Progress percent={64} />
						</div>
					</PreviewFrame>
				</div>
				<Tooltip title="Texto de ayuda">
					<span className="cursor-help text-sm text-primary-800">Pase el cursor para ver Tooltip</span>
				</Tooltip>
				<NotImplementedNote text="LoadingApp existe como overlay de pantalla completa pero no se exporta en index.ts. No se monta aquí porque usa position:fixed sobre toda la ventana." />
			</DsBlock>

			<DsBlock title="Datos, etiquetas y tablas" status="implemented">
				<div className="flex flex-wrap items-center gap-2">
					<Tag>Default</Tag>
					<Tag color="red">Error</Tag>
					<TagStatus status />
					<TagStatus status={false} />
					<Badge count={4}>
						<Avatar name="Ana Demo" />
					</Badge>
				</div>
				<Card title="Card" size="small">
					<InfoRow label="Cliente" value="Ana Demo" />
					<InfoRow label="Agencia" value="Matriz" />
				</Card>
				<Descriptions title="Descriptions" bordered size="small" column={1}>
					<Descriptions.Item label="Código">DEMO-001</Descriptions.Item>
					<Descriptions.Item label="Estado">
						<TagStatus status labelTrue="Vigente" labelFalse="Caducado" />
					</Descriptions.Item>
				</Descriptions>
				<Collapse
					items={[
						{ key: '1', label: 'Detalle', children: 'Contenido del collapse' },
						{ key: '2', label: 'Histórico', children: 'Segundo panel' },
					]}
				/>
				<PreviewFrame label="Table compacta con datos ficticios">
					<Table
						rowKey="id"
						loading={false}
						paginationConfig={false}
						data={TABLE_DATA}
						columns={[
							{ title: 'Nombre', dataIndex: 'name', key: 'name' },
							{ title: 'Ciudad', dataIndex: 'city', key: 'city' },
							{
								title: 'Estado',
								dataIndex: 'active',
								key: 'active',
								render: (value: boolean) => <TagStatus status={value} />,
							},
						]}
					/>
				</PreviewFrame>
			</DsBlock>

			<DsBlock title="Overlays" status="implemented">
				<div className="flex flex-wrap gap-2">
					<Button type="primary" label="Abrir Modal" onClick={() => setModalOpen(true)} />
					<Button type="secondary" label="Abrir Drawer" onClick={() => setDrawerOpen(true)} />
				</div>
				<Modal title="Modal de demostración" open={modalOpen} onCancel={() => setModalOpen(false)} footer={null}>
					<p>Contenido ficticio. El wrapper es components/Modal.</p>
				</Modal>
				<Drawer title="Drawer de demostración" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
					<p className="p-3">Panel lateral. AppLayout reutiliza este mismo Drawer para el menú.</p>
				</Drawer>
			</DsBlock>
		</DsSection>
	);
};
