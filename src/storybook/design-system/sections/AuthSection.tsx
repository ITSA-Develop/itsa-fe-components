import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Login } from '../../../components/Login';
import { FormInput } from '../../../components/FormInput';
import { FormInputPassword } from '../../../components/FormInputPassword';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert/Alert';
import { DsBlock, DsSection, NotImplementedNote, PreviewFrame, SpecTable } from '../shared';

const loginSchema = z.object({
	username: z.string().min(1, 'Ingrese el usuario'),
	password: z.string().min(1, 'Ingrese la contraseña'),
});

type LoginDemoValues = z.infer<typeof loginSchema>;

const LoginPreview = ({ logo }: { logo: 'ERP' | 'QUOTER' }) => {
	const methods = useForm<LoginDemoValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { username: 'usuario.demo@example.com', password: 'password-demo' },
		mode: 'onSubmit',
	});

	return (
		<FormProvider {...methods}>
			<div className="max-h-[560px] overflow-auto rounded-lg border border-gray-200">
				<Login control={methods.control} logo={logo} onSubmit={methods.handleSubmit(() => undefined)} />
			</div>
		</FormProvider>
	);
};

const ValidationPreview = () => {
	const methods = useForm<LoginDemoValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { username: '', password: '' },
		mode: 'onSubmit',
	});

	return (
		<FormProvider {...methods}>
			<form className="flex max-w-sm flex-col gap-3" onSubmit={methods.handleSubmit(() => undefined)}>
				<FormInput
					name="username"
					label="Usuario"
					placeholder="usuario.demo@example.com"
					control={methods.control}
					textTransform="none"
				/>
				<FormInputPassword name="password" label="Contraseña" placeholder="**********" control={methods.control} />
				<Button type="primary" htmlType="submit" label="Mostrar validación" />
			</form>
		</FormProvider>
	);
};

export const AuthSection = () => (
	<DsSection
		id="auth"
		title="Login y autenticación"
		description="Interfaz real de Login. Los datos son ficticios. La librería no implementa recuperación de contraseña ni registro."
	>
		<DsBlock title="Pantalla de login — ERP" status="implemented">
			<SpecTable
				rows={[
					{ label: 'Campos', value: 'Usuario (FormInput) y Contraseña (FormInputPassword)' },
					{
						label: 'Mostrar / ocultar contraseña',
						value: 'Implementado en InputPassword (EyeTwoTone / EyeInvisibleOutlined)',
					},
					{ label: 'Botón', value: 'Button type="primary" htmlType="submit" label="Iniciar sesión"' },
					{ label: 'Logos', value: 'ERP → LogoKAI. QUOTER → logo Creditosa' },
					{ label: 'Responsive', value: 'Split 50/50 desde 650px. En móvil la imagen ocupa el tercio superior' },
					{ label: 'Loading', value: 'Prop loading del Login, se pasa al Button' },
					{ label: 'Validación', value: 'La pantalla no trae schema. El consumidor inyecta control de RHF' },
				]}
			/>
			<PreviewFrame label="Datos ficticios: usuario.demo@example.com">
				<LoginPreview logo="ERP" />
			</PreviewFrame>
		</DsBlock>

		<DsBlock title="Variante QUOTER" status="implemented">
			<PreviewFrame label="Logo Creditosa">
				<LoginPreview logo="QUOTER" />
			</PreviewFrame>
		</DsBlock>

		<DsBlock title="Mensajes de validación (capas Form*)" status="implemented">
			<p className="text-sm text-gray-600">
				Envíe el formulario vacío para ver FormLabelError. Este comportamiento pertenece a FormInput /
				FormInputPassword, no a una máquina de estados de autenticación.
			</p>
			<PreviewFrame>
				<ValidationPreview />
			</PreviewFrame>
		</DsBlock>

		<DsBlock title="Mensajes de error de autenticación" status="not-implemented">
			<NotImplementedNote text="Login no renderiza un Alert ni un estado de credenciales inválidas. El error lo debe mostrar el consumidor." />
			<Alert
				type="info"
				showIcon
				message="Patrón existente para errores (no cableado en Login)"
				description="Alert y Notification están implementados en la librería y podrían usarse alrededor del Login."
			/>
		</DsBlock>

		<DsBlock title="Flujos no presentes en la librería" status="not-implemented">
			<SpecTable
				rows={[
					{ label: 'Recuperación de contraseña', value: 'No implementado' },
					{ label: 'Registro', value: 'No implementado' },
					{ label: 'Estados de sesión (idle / authenticated / expired)', value: 'No implementado en UI' },
					{ label: 'Captcha / SSO / 2FA', value: 'No identificado' },
				]}
			/>
		</DsBlock>
	</DsSection>
);
