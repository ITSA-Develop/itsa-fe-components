import React from 'react';
import type { StoryObj } from '@storybook/react';
import { RadioChangeEvent } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { useState } from 'react';
import { Radio } from '../../components/Radio/Radio';

const meta = {
	title: 'Components/Form/Radio',
	component: Radio,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Radio usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Radio)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {
		label: '',
	},
	render: () => {
		const RadioHistory = () => {
			const plainOptions: CheckboxGroupProps<string>['options'] = ['Apple', 'Pear', 'Orange'];
			const [value1, setValue1] = useState('Apple');

			const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
				setValue1(value);
			};

			return (
				<div>
					<Radio label="Radio buttons" options={plainOptions} onChange={onChange1} value={value1} />
				</div>
			);
		};

		return <RadioHistory />;
	},
};
