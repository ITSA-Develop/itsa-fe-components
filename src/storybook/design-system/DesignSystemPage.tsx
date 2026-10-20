import { useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { Tag } from '../../components/Tag';
import { OverviewSection } from './sections/OverviewSection';
import { AppLayoutSection } from './sections/AppLayoutSection';
import { AuthSection } from './sections/AuthSection';
import { ColorsSection } from './sections/ColorsSection';
import { TypographySection } from './sections/TypographySection';
import { ButtonsSection } from './sections/ButtonsSection';
import { FormsSection } from './sections/FormsSection';
import { CatalogSection } from './sections/CatalogSection';
import { PACKAGE_NAME, PACKAGE_VERSION } from './tokens';

const NAV_ITEMS = [
	{ id: 'overview', label: 'Información general' },
	{ id: 'layout', label: 'App Layout' },
	{ id: 'auth', label: 'Login y autenticación' },
	{ id: 'colors', label: 'Colores y tokens' },
	{ id: 'typography', label: 'Tipografía' },
	{ id: 'buttons', label: 'Botones' },
	{ id: 'forms', label: 'Formularios e inputs' },
	{ id: 'catalog', label: 'Navegación y datos' },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]['id'];

export const DesignSystemPage = () => {
	const [active, setActive] = useState<SectionId>('overview');

	const content = useMemo(() => {
		switch (active) {
			case 'overview':
				return <OverviewSection />;
			case 'layout':
				return <AppLayoutSection />;
			case 'auth':
				return <AuthSection />;
			case 'colors':
				return <ColorsSection />;
			case 'typography':
				return <TypographySection />;
			case 'buttons':
				return <ButtonsSection />;
			case 'forms':
				return <FormsSection />;
			case 'catalog':
				return <CatalogSection />;
			default:
				return <OverviewSection />;
		}
	}, [active]);

	return (
		<div className="flex min-h-[100dvh] w-full bg-gray-25 text-text-main">
			<aside className="hidden w-64 shrink-0 flex-col gap-3 border-r border-gray-200 bg-white-100 p-4 md:flex">
				<div className="flex flex-col gap-1">
					<Title title="Design System" level={4} />
					<p className="text-xs text-gray-500">{PACKAGE_NAME}</p>
					<Tag color="red">v{PACKAGE_VERSION}</Tag>
				</div>
				<nav className="flex flex-col gap-1">
					{NAV_ITEMS.map(item => (
						<Button
							key={item.id}
							type={active === item.id ? 'primary' : 'text'}
							label={item.label}
							block
							onClick={() => setActive(item.id)}
						/>
					))}
				</nav>
			</aside>
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex gap-2 overflow-x-auto border-b border-gray-200 bg-white-100 p-2 md:hidden">
					{NAV_ITEMS.map(item => (
						<Button
							key={item.id}
							type={active === item.id ? 'primary' : 'secondary'}
							size="small"
							label={item.label}
							onClick={() => setActive(item.id)}
						/>
					))}
				</div>
				<main className="flex flex-col gap-4 overflow-auto p-4 md:p-6">{content}</main>
			</div>
		</div>
	);
};
