import type { StoryObj } from '@storybook/react';
import type { ISubmodule } from '../../interfaces';
import { Dashboard } from '../../components/Dashboard';
import { AppLayout } from '../../components/AppLayout';
import { useAppLayoutStore } from '../../store/appLayout.store';
import { useEffect } from 'react';
import { AGENCIES_DATA } from '../../constants/agencies';
import { useNavigate } from 'react-router-dom';

const meta = {
	title: 'Components/Dashboard',
	component: Dashboard,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'Dashboard principal con navegación por módulos, submódulos y programas. Incluye búsqueda contextual, agrupación de programas, y prevención de duplicados.',
			},
		},
	},
	argTypes: {
		handleNavigateProgram: {
			description: 'Función llamada cuando se selecciona un programa',
			action: 'program-selected',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const withRealData = (Story: any, context: any) => {
	const setCurrentAgency = useAppLayoutStore(state => state.setCurrentAgency);
	
	useEffect(() => {
		if (AGENCIES_DATA.length > 0) {
			setCurrentAgency(AGENCIES_DATA[0]);
		}
	}, [setCurrentAgency]);
	
	return <Story {...context} />;
};

export const Default: Story = {
	decorators: [withRealData],
	args: {
		handleNavigateProgram: (program: ISubmodule) => {
			console.log('Navegando a programa:', program);
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'Dashboard con datos reales de la agencia CUENCA. Navega entre VEHÍCULOS > MANTENIMIENTOS para ver grupos expandibles y programas. Incluye deduplicación automática y estilos refinados.',
			},
		},
	},
};

export const Empty: Story = {
	args: {
		handleNavigateProgram: () => {},
	},
	parameters: {
		docs: {
			description: {
				story: 'Dashboard sin datos - estado inicial cuando no hay agencia seleccionada.',
			},
		},
	},
};

export const WithinAppLayout: Story = {
	decorators: [withRealData],
	args: {
		handleNavigateProgram: (program: ISubmodule) => {
			console.log('Navegando a programa:', program);
		},
	},
	render: (args) => {
		const navigate = useNavigate();
		
		return (
			<AppLayout
				navigateApp={navigate}
				loadingAppLayout={false}
				userActions={{ items: [] }}
				notifications={{ items: [] }}
				onClickOptionMenu={() => {}}
			>
				<Dashboard {...args} />
			</AppLayout>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Dashboard renderizado dentro del AppLayout completo, mostrando cómo se ve en el contexto real de la aplicación con sidebar, header y toda la estructura.',
			},
		},
	},
};
