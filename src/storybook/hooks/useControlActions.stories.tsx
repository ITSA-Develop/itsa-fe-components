import React from 'react';
import { useControlActions } from '../../hooks/useControlActions/useControlActions';

const meta = {
	title: 'Hooks/Hooks/useControlActions',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
El hook **useControlActions** expone un estado global de tipo string y su setter.

## Retorna
- \`value: string\` — Valor actual.
- \`setValue: (next: string | ((prev: string) => string)) => void\` — Actualiza el valor.

## Ejemplo de uso

\`\`\`tsx
import { useControlActions } from '@/hooks/useControlActions/useControlActions';

const MyComponent = () => {
  const { value, setValue } = useControlActions();
  return (
    <div>
      <p>Valor: {value}</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};
\`\`\`
				`,
			},
		},
	},
};

export default meta;

const Demo = () => {
	const { actions } = useControlActions();

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}>
			<div>
				Valor actual: <strong>{actions?.allActions ? 'Todos' : 'Ninguno'}</strong>
			</div>
			
		</div>
	);
};

export const Default = () => {
	return <Demo />;
};


