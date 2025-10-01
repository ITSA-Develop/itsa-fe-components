import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputSearch, type InputSearchProps } from '../../components/InputSearch';

const meta: Meta<InputSearchProps> = {
	title: 'components/InputSearch',
	component: InputSearch,
	parameters: { layout: 'padded' },
	argTypes: {
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
		allowClear: { control: 'boolean' },
		size: {
			control: 'select',
			options: ['small', 'middle', 'large'],
			mapping: { small: 'small', middle: 'middle', large: 'large' },
		},
		type: {
			control: 'select',
			options: ['text', 'email', 'password'],
			mapping: { text: 'text', email: 'email', password: 'password' },
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Default',
	args: {
		type: 'text',
		placeholder: 'Buscar…',
		allowClear: true,
	},
};

export const Disabled: Story = {
	name: 'Deshabilitado',
	args: {
		type: 'text',
		placeholder: 'no editable',
		disabled: true,
	},
};

export const WithDefaultValue: Story = {
	name: 'Con defaultValue',
	args: {
		type: 'text',
		placeholder: 'Buscar…',
		defaultValue: 'Inicial',
	},
};

export const WithSearchHandler: Story = {
	name: 'Con onSearch (evento)',
	render: args => {
		const [message, setMessage] = useState<string>('');
        const [value, setValue] = useState<string>('');
		return (
			<div style={{ width: 420 }}>
				<InputSearch
					{...(args as any)}
					type="text"
					placeholder="Escribe y presiona Enter o el botón"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onSearch={(v: string) => setMessage(v ? `Resultado para: "${v}"` : '')}
                    debounceDelay={600}
                    debounceLeading={false}
                    debounceTrailing={true}
                    enableLoading={true}
				/>
				<div style={{ marginTop: 8, minHeight: 20 }}>{message}</div>
			</div>
		);
	},
};


