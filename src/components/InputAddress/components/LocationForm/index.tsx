// import { InputDropdown } from '@/components/InputDropdown/InputDropdown';
// import { TInputOptions } from '@/types';
// import { REQUIRED } from '@/utils/constants';
// import { Control, UseFormWatch } from 'react-hook-form';

// interface ILocationFormProps {
// 	name: string;
// 	control: Control<any>;
// 	locationOptions: {
// 		provincesOpts: TInputOptions[];
// 		cantonsOpts: TInputOptions[];
// 		parishesOpts?: TInputOptions[];
// 	};
// 	watch: UseFormWatch<any>;
// 	errors?: any;
// 	isDisabled?: boolean;
// 	showParish?: boolean;
// }
// export const LocationForm = ({
// 	name,
// 	control,
// 	watch,
// 	errors,
// 	isDisabled,
// 	locationOptions,
// 	showParish,
// }: ILocationFormProps) => {
// 	const { provincesOpts, cantonsOpts, parishesOpts } = locationOptions;

// 	const provinceName = `${name}province`;
// 	const cantonName = `${name}canton`;
// 	const parishName = `${name}parish`;

// 	const { [provinceName]: province, [cantonName]: canton } = watch();

// 	return (
// 		<div className="flex gap-2 items-start">
// 			<InputDropdown
// 				name={provinceName}
// 				label="Provincia"
// 				options={provincesOpts}
// 				rules={REQUIRED}
// 				error={errors?.[provinceName] ? errors?.[provinceName].message || errors?.[provinceName] : undefined}
// 				control={control}
// 				isDisabled={isDisabled}
// 			/>
// 			<InputDropdown
// 				name={cantonName}
// 				label="Cantón"
// 				options={cantonsOpts}
// 				isDisabled={!province || isDisabled}
// 				rules={REQUIRED}
// 				error={errors?.[cantonName] ? errors?.[cantonName].message || errors?.[cantonName] : undefined}
// 				control={control}
// 			/>
// 			{showParish && parishesOpts && (
// 				<InputDropdown
// 					name={parishName}
// 					label="Parroquia"
// 					options={parishesOpts}
// 					isDisabled={!canton || isDisabled}
// 					control={control}
// 				/>
// 			)}
// 		</div>
// 	);
// };
