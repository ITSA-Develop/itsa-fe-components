/// <reference path="../../vite-env.d.ts" />
import React, { useRef } from 'react';
import type { StoryObj } from '@storybook/react';
import reportHtml from '../../components/HtmlCssReport/ReportBase.html?raw';
import reportHeaderHtml from '../../components/HtmlCssReport/ReportHeader.html?raw';

const meta = {
	title: 'Components/HtmlCssReport/ReportBase',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'Base HTML para reportes HTML/CSS.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<ReportBasePreview />
	),
};

const ReportBasePreview = () => {
	const iframeRef = useRef<HTMLIFrameElement | null>(null);

	const handlePrint = () => {
		iframeRef.current?.contentWindow?.print();
	};
	//h-[70dvh] w-[214mm] mx-auto bg-gray-100 pt-24
	return (
		<div className="flex-1 h-[100dvh] w-[240mm] mx-auto bg-gray-75">
			<div className="flex justify-end p-2">
				<button
					type="button"
					onClick={handlePrint}
					className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
				>
					Imprimir
				</button>
			</div>
			<div className="p-2 flex-1 min-h-0 h-[calc(100%-80px)] bg-gray-75">
				<iframe
					ref={iframeRef}
					title="HtmlCssReportBase"
					className="h-full w-full rounded-none border-none bg-gray-75"
					srcDoc={reportHtml.replace('{{REPORT_HEADER}}', reportHeaderHtml)}
				/>
			</div>
		</div>
	);
};
