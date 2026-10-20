import { useEffect } from 'react';
import { AppLayout } from '../../../components/AppLayoutRefactor';
import { BreadcrumbCustom } from '../../../components/BreadcrumbCustom';
import { Tabs } from '../../../components/Tabs/Tabs';
import { TabsMaintenance } from '../../../components/TabsMaintenance';
import { WizardSteps } from '../../../components/WizardSteps/WizardSteps';
import { PERMISSIONS_MOCK } from '../../../components/AppLayoutRefactor/mocks/permissions.mock';
import { useAppLayoutStore } from '../../../store';
import { IProgram, IUserInformation } from '../../../interfaces';
import { BREAKPOINTS } from '../tokens';
import { DsBlock, DsSection, NotImplementedNote, PreviewFrame, SpecTable } from '../shared';

const LAYOUT_ARGS = {
	optionsCompany: [
		{ label: 'Empresa demo 1', value: '1' },
		{ label: 'Empresa demo 2', value: '2' },
	],
	loadingAppLayout: false,
	onCloseSession: () => undefined,
	menuItemsNavigate: (program: IProgram) => {
		console.log('menuItemsNavigate', program);
	},
	userActions: { items: [{ key: 'logout', label: 'Cerrar sesión' }] },
};

const LayoutPreview = () => {
	const setPermissions = useAppLayoutStore(state => state.setPermissions);
	const setUserInformation = useAppLayoutStore(state => state.setUserInformation);

	useEffect(() => {
		setPermissions(PERMISSIONS_MOCK);
		const userInfo: IUserInformation = {
			userId: 1,
			name: 'Ana Demo',
			email: 'ana.demo@example.com',
			roles: [
				{
					id: 1,
					code: 'ADMIN-LPH',
					name: 'ADMINISTRADOR LPH',
					moduleId: 30,
				},
			],
			identification: '0000000000',
			identificationType: 'CC',
			businessLines: [{ id: 1, name: 'Línea demo', code: 'LPH' }],
			picture: '',
		};
		setUserInformation(userInfo);
	}, [setPermissions, setUserInformation]);

	return (
		<div className="h-[480px] overflow-auto rounded-lg border border-gray-200">
			<AppLayout {...LAYOUT_ARGS}>
				<div className="flex flex-col gap-3 p-2">
					<BreadcrumbCustom
						title="Pantalla de ejemplo"
						description="Área de contenido de AppLayout"
						action={() => undefined}
					/>
					<p className="text-sm text-gray-600">
						Esta región es el children de AppLayout: fondo blanco, padding 8px y scroll interno.
					</p>
				</div>
			</AppLayout>
		</div>
	);
};

export const AppLayoutSection = () => (
	<DsSection
		id="layout"
		title="App Layout"
		description="Estructuras reales de navegación. AppLayout es el layout autenticado. Login cubre la autenticación. No hay un layout público de marketing."
	>
		<DsBlock title="Regiones del layout principal" status="implemented">
			<div className="overflow-hidden rounded-lg border border-gray-200 text-xs text-white-100">
				<div className="flex h-14 items-center justify-between bg-primary-700 px-3">
					<span>HeaderLayout · 64px · bg-primary-700</span>
					<span>Empresa · Línea · Agencia · Usuario · Notificaciones</span>
				</div>
				<div className="flex min-h-[180px] bg-gray-50 p-1">
					<div className="hidden w-40 rounded-lg border border-dashed border-gray-300 bg-white-100 p-2 text-gray-600 md:block">
						Sidebar Drawer
						<br />
						320px · overlay izquierdo
						<br />
						Buscar + MenuItems
					</div>
					<div className="min-h-[160px] flex-1 rounded-lg bg-white-100 p-3 text-gray-700">
						Área de contenido
						<br />
						rounded-lg bg-white-100 overflow-auto
					</div>
				</div>
				<div className="bg-gray-75 px-3 py-2 text-gray-600">
					Footer opcional vía AppLayoutFooterProvider (no es el componente Footer)
				</div>
			</div>
			<SpecTable
				rows={[
					{
						label: 'Layout principal',
						value: 'AppLayout: flex column 100dvh, Ant Design Layout, gap 2px / 8px en md',
					},
					{
						label: 'Header',
						value:
							'HeaderLayout 64px, fondo primary-700, selectores de empresa/línea/agencia, usuario y notificaciones',
					},
					{
						label: 'Sidebar',
						value:
							'Drawer izquierdo 320px con búsqueda, menú por permisos, Inicio y botón de colapso. No es un sidebar fijo permanente',
					},
					{
						label: 'Contenido',
						value: 'children dentro de un contenedor flex-1 overflow-auto rounded-lg bg-white-100 p-2',
					},
					{
						label: 'Footer de layout',
						value: 'Slot opcional (footerComponent). El componente Footer existe aparte y no se monta aquí',
					},
					{
						label: 'Menús desplegables',
						value: 'userActions en el header (Ant Design Menu) y menú del sidebar (MenuItems)',
					},
				]}
			/>
		</DsBlock>

		<DsBlock title="Vista previa interactiva" status="implemented">
			<PreviewFrame label="AppLayout con PERMISSIONS_MOCK y usuario ficticio">
				<LayoutPreview />
			</PreviewFrame>
		</DsBlock>

		<DsBlock title="Breadcrumbs y pestañas" status="implemented">
			<PreviewFrame label="BreadcrumbCustom — no es un rastro de rutas">
				<BreadcrumbCustom
					title="Clientes"
					description="Listado de mantenimiento"
					action={() => undefined}
					actionButtonDocumentation={() => undefined}
				/>
			</PreviewFrame>
			<PreviewFrame label="Tabs">
				<Tabs
					defaultActiveKey="1"
					items={[
						{ key: '1', label: 'General', children: 'Contenido de la pestaña General' },
						{ key: '2', label: 'Detalle', children: 'Contenido de la pestaña Detalle' },
					]}
				/>
			</PreviewFrame>
			<PreviewFrame label="TabsMaintenance">
				<TabsMaintenance
					defaultActiveKey="1"
					onChange={() => undefined}
					items={[
						{ key: '1', label: 'Datos', children: 'Tab de mantenimiento' },
						{ key: '2', label: 'Documentos', children: 'Segundo tab' },
					]}
				/>
			</PreviewFrame>
			<PreviewFrame label="WizardSteps">
				<WizardSteps current={1} items={[{ title: 'Datos' }, { title: 'Validación' }, { title: 'Confirmación' }]} />
			</PreviewFrame>
		</DsBlock>

		<DsBlock title="Footer independiente" status="implemented">
			<p className="text-sm text-gray-600">
				El componente Footer renderiza texto + versión con position:fixed al fondo de la ventana. No está integrado en
				AppLayout; por eso no se monta aquí en vivo (cubriría el catálogo). Story dedicado: Components/Footer.
			</p>
		</DsBlock>

		<DsBlock title="Otros layouts" status="not-identified">
			<SpecTable
				rows={[
					{ label: 'Layout autenticado / interno', value: 'AppLayout' },
					{ label: 'Layout de autenticación', value: 'Login (pantalla completa, no usa AppLayout)' },
					{ label: 'Layout administrativo dedicado', value: 'No identificado. Se reutiliza AppLayout' },
					{ label: 'Layout de páginas públicas', value: 'No identificado' },
					{
						label: 'Barras de herramientas',
						value: 'Parcial: FilterSearchContainer y ActionPanel (este último no exportado)',
					},
					{ label: 'Paneles laterales', value: 'Drawer, UserProfileDrawer, sidebar de AppLayout' },
					{ label: 'Pantalla completa', value: 'Login, LoadingApp, ErrorPage' },
				]}
			/>
			<NotImplementedNote text="No existe un layout de marketing ni un shell de autenticación distinto de Login." />
		</DsBlock>

		<DsBlock title="Adaptación a tamaños de pantalla" status="implemented">
			<SpecTable
				rows={BREAKPOINTS.map(item => ({
					label: item.name,
					value: `${item.value} — ${item.usage}`,
				}))}
			/>
			<p className="text-sm text-gray-600">
				En header, USER_INFO_WRAPPER_CLASSNAME oculta el nombre de usuario bajo md. Los selectores móviles usan ancho
				fijo de 64px. El sidebar es un Drawer, no una columna permanente.
			</p>
		</DsBlock>
	</DsSection>
);
