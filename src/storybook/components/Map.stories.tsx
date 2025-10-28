import React from 'react';  
import type { StoryObj } from '@storybook/react';
import { Map } from '../../components/Map';
import { GOOGLE_API_KEY } from '../../utils/constants';

const meta = {
	title: 'Components/Map',
	component: Map,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Mapa basado en Google Maps usando @vis.gl/react-google-maps. Requiere la variable de entorno VITE_GOOGLE_MAPS_API_KEY.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Default',
	render: () => {
		if (!GOOGLE_API_KEY) {
			return (
				<div className="flex flex-col h-[50vh] items-center justify-center p-4">
					<strong>No se puede cargar el mapa.</strong>
					<p style={{ marginTop: 8 }}>
						Define la variable de entorno <code>VITE_GOOGLE_MAPS_API_KEY</code> para visualizar Google Maps en Storybook.
					</p>
				</div>
			);
		}
		return (
			<div className="flex-1 h-[60vh] w-full">
				<Map />
			</div>
		);
	},
};

export const WithUserLocation: Story = {
	name: 'With user location',
	render: () => {
		if (!GOOGLE_API_KEY) {
			return (
				<div className="flex flex-col h-[50vh] items-center justify-center p-4">
					<strong>No se puede cargar el mapa.</strong>
					<p style={{ marginTop: 8 }}>
						Define la variable de entorno <code>VITE_GOOGLE_MAPS_API_KEY</code> para visualizar Google Maps en Storybook.
					</p>
				</div>
			);
		}
		return (
			<div className="flex-1 h-[60vh] w-full">
				<Map useUserLocation />
			</div>
		);
	},
};


