import React, { useEffect, useState } from 'react';
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

export const WithSearchHandler: Story = {
	name: 'Con onSearch (evento)',
	render: args => {
		const [message, setMessage] = useState<string>('');
        const [value, setValue] = useState<string>();
		const [loading, setLoading] = useState<boolean>(false);


		useEffect(() => {
			setValue('test');
		}, []);

		return (
			<div style={{ width: 420 }}>
				<InputSearch
					// {...(args as any)}
					type="text"
					defaultValue={value}
					placeholder="Escribe y presiona Enter o el botón"
                    // onChange={(e) => setValue(e.target.value)}
                    loading={loading}
                    onSearch={(v: string) => {
                        setLoading(true);
                        setTimeout(() => {
                            setMessage(v ? `Resultado para: "${v}"` : '');
                            setLoading(false);
                        }, 1000);
                    }}
				/>
				<div style={{ marginTop: 8, minHeight: 20 }}>{message}</div>
			</div>
		);
	},
};


