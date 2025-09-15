import React from 'react';
import type { StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { Fade } from '../../components/Fade/Fade';

const meta = {
	title: 'Components/Fade',
	component: Fade,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'something to show',
		transitionChildren: 'prev stuff before fade',
	},
	render: () => {
		const FormLayoutHistory = () => {
			const [showFade, setShowFade] = useState(false);

			return (
				<Fade
					showTransition={!showFade}
					duration={500}
					transitionChildren={<Button onClick={() => setShowFade(true)} label="show fade effect" />}
				>
					<p>Fade Effect</p>
					<Button onClick={() => setShowFade(false)} label="show again" />
				</Fade>
			);
		};

		return <FormLayoutHistory />;
	},
};
