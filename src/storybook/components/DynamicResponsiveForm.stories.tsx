import type { StoryObj } from "@storybook/react";
import { DynamicResponsiveFormUI } from "../../components/DynamicResponsiveForm/DynamicResponsiveFormUI.controller";
import {
	formTal,
	shippingOrderCreatePayloadSchema,
} from "../../components/DynamicResponsiveForm/constant-test";

const meta = {
	title: "Components/DynamicResponsiveForm",
	component: DynamicResponsiveFormUI,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Formulario dinámico responsivo con react-hook-form y schema Zod.",
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		schema: formTal,
		validationSchema: shippingOrderCreatePayloadSchema,
	},
};
