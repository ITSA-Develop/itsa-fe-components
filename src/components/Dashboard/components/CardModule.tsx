'use client';

import { PackageIcon, SearchIcon } from '@/assets/icons';
import { IModule } from '@/interfaces';
import { Input } from 'antd';
import type React from 'react';

import { useState } from 'react';

interface SettingCard {
	id: string;
	title: string;
	description: string;
	icon: React.ReactNode;
}

const settingsData: SettingCard[] = [
	{
		id: 'sistema',
		title: 'Sistema',
		description: 'Pantalla, notificaciones, energía',
		icon: <PackageIcon className="w-10 h-10 text-blue-500" />,
	},
];

export interface ICardModuleProps {
	modules: IModule[];
}

export default function ConfigurationDashboard({ modules: _modules }: ICardModuleProps) {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredSettings = settingsData.filter(
		setting =>
			setting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			setting.description.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<main className="min-h-screen bg-background p-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<h1 className="text-3xl font-light text-center text-foreground mb-8">Configuración de Windows</h1>

				{/* Search Input */}
				<div className="relative max-w-md mx-auto mb-12">
					<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Buscar una configuración"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className="pl-10 h-12 border-2 border-border focus-visible:ring-2 focus-visible:ring-blue-500"
					/>
				</div>

				{/* Settings Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{filteredSettings.map(setting => (
						<button
							key={setting.id}
							className="group flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg hover:bg-accent hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<div className="mb-3 transition-transform group-hover:scale-110">{setting.icon}</div>
							<h3 className="text-sm font-medium text-foreground mb-1 text-center">{setting.title}</h3>
							<p className="text-xs text-muted-foreground text-center leading-relaxed">{setting.description}</p>
						</button>
					))}
				</div>

				{/* No Results Message */}
				{filteredSettings.length === 0 && (
					<div className="text-center py-12">
						<p className="text-muted-foreground text-lg">
							No se encontraron configuraciones que coincidan con "{searchQuery}"
						</p>
					</div>
				)}
			</div>
		</main>
	);
}
