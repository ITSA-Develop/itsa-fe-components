import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/Button';
import { FormInput } from '../../../components/FormInput';
import { FormInputPassword } from '../../../components/FormInputPassword';
import { FormInputNumber } from '../../../components/FormInputNumber';
import { FormTextarea } from '../../../components/FormTextarea';
import { FormSelect } from '../../../components/FormSelect';
import { FormCheckBox } from '../../../components/FormCheckBox';
import { FormRadio } from '../../../components/FormRadio';
import { FormSwitch } from '../../../components/FormSwitch';
import { FormInputDatePicker } from '../../../components/FormInputDatePicker';
import { FormLabel } from '../../../components/FormLabel';
import { Input } from '../../../components/Input/Input';
import { InputSearch } from '../../../components/InputSearch';
import { FilterInput } from '../../../components/FilterInput';
import { FilterSelect } from '../../../components/FilterSelect';
import { FilterSearchContainer } from '../../../components/FilterSearchContainer/FilterSearchContainer';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import { Switch } from '../../../components/Switch/Switch';
import { EInput } from '../../../enums';
import { DsBlock, DsSection, NotImplementedNote, PreviewFrame, SpecTable } from '../shared';

const schema = z.object({
	fullName: z.string().min(1, 'Ingrese el nombre'),
	email: z.string().min(1, 'Ingrese el correo'),
	password: z.string().min(1, 'Ingrese la contraseña'),
	amount: z.string().optional(),
	notes: z.string().optional(),
	city: z.string().min(1, 'Seleccione una ciudad'),
	channel: z.enum(['email', 'phone']),
	active: z.boolean(),
	terms: z.boolean().refine(value => value, 'Debe aceptar los términos'),
	startDate: z.string().nullable().optional(),
});

type FormDemoValues = z.infer<typeof schema>;

const FormPlayground = () => {
	const methods = useForm<FormDemoValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			fullName: '',
			email: 'usuario.demo@example.com',
			password: '',
			amount: '',
			notes: '',
			city: undefined as unknown as string,
			channel: 'email',
			active: true,
			terms: false,
			startDate: null,
		},
		mode: 'onSubmit',
	});

	return (
		<FormProvider {...methods}>
			<form className="grid gap-4 md:grid-cols-2" onSubmit={methods.handleSubmit(() => undefined)}>
				<FormInput name="fullName" label="Nombre" placeholder="ANA DEMO" control={methods.control} />
				<FormInput
					name="email"
					label="Correo"
					placeholder="usuario.demo@example.com"
					control={methods.control}
					textTransform="none"
				/>
				<FormInputPassword name="password" label="Contraseña" placeholder="**********" control={methods.control} />
				<FormInputNumber name="amount" label="Importe" placeholder="0.00" control={methods.control} />
				<FormSelect
					name="city"
					label="Ciudad"
					placeholder="Seleccione"
					control={methods.control}
					options={[
						{ label: 'Cuenca', value: 'cuenca' },
						{ label: 'Quito', value: 'quito' },
						{ label: 'Guayaquil', value: 'guayaquil' },
					]}
				/>
				<FormInputDatePicker name="startDate" label="Fecha de inicio" control={methods.control} allowPastDates />
				<div className="md:col-span-2">
					<FormTextarea name="notes" label="Observaciones" placeholder="Texto de ayuda" control={methods.control} />
				</div>
				<FormRadio
					name="channel"
					label="Canal de contacto"
					control={methods.control}
					options={[
						{ label: 'Correo', value: 'email' },
						{ label: 'Teléfono', value: 'phone' },
					]}
				/>
				<FormSwitch
					name="active"
					label="Registro activo"
					checkedLabel="Sí"
					uncheckedLabel="No"
					control={methods.control}
				/>
				<FormCheckBox name="terms" label="Acepto los términos" control={methods.control} />
				<div className="flex items-end">
					<Button type="primary" htmlType="submit" label="Validar formulario" />
				</div>
			</form>
		</FormProvider>
	);
};

export const FormsSection = () => (
	<DsSection
		id="forms"
		title="Formularios e inputs"
		description="Capa Form* (react-hook-form) y primitivos Input/Select/Checkbox. Los filtros de listado son componentes distintos, más compactos."
	>
		<DsBlock title="Formulario de mantenimiento" status="implemented">
			<p className="text-sm text-gray-600">
				FormInput transforma a mayúsculas por defecto. El correo del demo usa textTransform=&quot;none&quot;, igual que
				Login.
			</p>
			<PreviewFrame>
				<FormPlayground />
			</PreviewFrame>
		</DsBlock>

		<DsBlock title="Primitivos y filtros" status="implemented">
			<PreviewFrame label="Input, InputSearch, Checkbox, Switch">
				<div className="grid gap-3 md:grid-cols-2">
					<div className="flex flex-col gap-1">
						<FormLabel label="Input" />
						<Input type={EInput.text} placeholder="Texto" />
					</div>
					<InputSearch type="search" placeholder="Buscar" />
					<Checkbox>Checkbox default</Checkbox>
					<Switch checkedLabel="Activo" uncheckedLabel="Inactivo" defaultChecked />
				</div>
			</PreviewFrame>
			<PreviewFrame label="FilterSearchContainer + FilterInput + FilterSelect">
				<FilterSearchContainer handleSubmit={() => undefined} reset={() => undefined}>
					<FilterInput placeholder="Buscar cliente" />
					<FilterSelect
						label="Estado"
						placeholder="Estado"
						allowClear
						options={[
							{ label: 'Activo', value: 'active' },
							{ label: 'Inactivo', value: 'inactive' },
						]}
					/>
				</FilterSearchContainer>
			</PreviewFrame>
		</DsBlock>

		<DsBlock title="Estados documentados" status="implemented">
			<SpecTable
				rows={[
					{ label: 'Label', value: 'FormLabel. Opcional muestra “(Opcional)”' },
					{ label: 'Error', value: 'FormLabelError en text-red-500 text-xs. status="error" en el control Ant Design' },
					{ label: 'Disabled', value: 'Prop disabled en Form* e Input' },
					{ label: 'Loading', value: 'FormSelect isLoading. FilterInput muestra spinner' },
					{ label: 'Mostrar contraseña', value: 'InputPassword / FormInputPassword' },
					{ label: 'Mayúsculas', value: 'FormInput y FormTextarea, textTransform default uppercase' },
					{
						label: 'Fecha',
						value: 'FormInputDatePicker, FormDateTimePicker, FormInputBirthDatePicker, FormInputTimePicker',
					},
					{ label: 'Árbol', value: 'FormSelectTree / TreeSelect' },
					{
						label: 'Dirección / mapa',
						value:
							'InputAddress, LocationSelector, Map — implementados, no montados aquí por dependencia de Google Maps',
					},
				]}
			/>
		</DsBlock>

		<DsBlock title="No implementado" status="not-implemented">
			<NotImplementedNote text="No hay un FormFile / input de archivo genérico de producto. UploadImage cubre carga de imágenes. No hay máscara de teléfono unificada en un FormPhone exportado (sí existe MultiplePhones interno)." />
		</DsBlock>
	</DsSection>
);
