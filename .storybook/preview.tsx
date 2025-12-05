import React from 'react';
import type { Preview } from '@storybook/react';
import { UIProvider } from '../src/HOC/UIProvider';
import '../src/index.css';
import { BrowserRouter } from 'react-router-dom';
import { NotificationsProvider } from '../src/HOC/NotificationsProviders';
import { ControlActionsProvider } from '../src/HOC/ControlActions';
import { AppLayoutFooterProvider } from '../src/components/AppLayout/context';
const preview: Preview = {
	parameters: {
		controls: {
			expanded: true,
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		Story => {
			return (
				<UIProvider>
					<BrowserRouter>
						<NotificationsProvider>
							<ControlActionsProvider fnApiValidatePermissionAction={async () => true}>
								<AppLayoutFooterProvider>
									<Story />
								</AppLayoutFooterProvider>
							</ControlActionsProvider>
						</NotificationsProvider>
					</BrowserRouter>
				</UIProvider>
			);
		},
	],
};

export default preview;
