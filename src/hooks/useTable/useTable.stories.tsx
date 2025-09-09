const meta = {
	title: 'Hooks/Hooks/useTable',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
El hook **useTableHook** abstrae la complejidad de manejar el estado de una tabla, permitiendo que el componente que la usa sea más limpio, declarativo y fácil de mantener.
## Características principales:

- \ Inicializa el Estado: Recibe una configuración inicial (en este caso, DEFAULT_PAGINATION_CONFIG) para establecer los valores por defecto de la paginación.

- \ Gestiona el Estado: Mantiene un registro interno del estado actual de la tabla, incluyendo:

- \ La página actual y el tamaño de la página.
- \ Los filtros que el usuario ha aplicado a las columnas.
La columna y dirección por la que se están ordenando los datos.

Proporciona un Manejador de Cambios: Expone una única función (onChangePagination) que se conecta al evento onChange de la tabla. Esta función se encarga de recibir las nuevas configuraciones de paginación, filtros y ordenamiento de la tabla y actualizar el estado interno del hook.

Valores que Devuelve:

- \ pagination: Un objeto que contiene el estado actual de la paginación (ej. { current: 1, pageSize: 10 }). Se pasa directamente al componente de tabla para que se renderice correctamente.
- \ filters: Un objeto que describe los filtros activos en la tabla. Ideal para saber qué datos se están mostrando o para enviar a una API.
- \ sorter: Un objeto que indica la columna y el criterio de ordenamiento actual (ej. { field: 'name', order: 'ascend' }).
- \ onChangePagination: La función controladora que actualiza todos los estados anteriores cuando el usuario interactúa con la tabla.

En resumen, useTableHook abstrae la complejidad de manejar el estado de una tabla, permitiendo que el componente que la usa sea más limpio, declarativo y fácil de mantener.

## Ejemplo de uso

\`\`\`ts
const TableWithPaginationState = () => {
	const { pagination, filters, sorter, onChangePagination } = useTable(DEFAULT_PAGINATION_CONFIG);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col gap-2 border-1 border-gray-500 rounded-md">
				<span>Current Page: {pagination.current}</span>
				<span>Page Size: {pagination.pageSize}</span>
				<span>Filtered Data: {JSON.stringify(filters)}</span>
				<span>Sorter: {JSON.stringify(sorter)}</span>
			</div>
			<Table
				columns={sampleColumns}
				data={sampleData}
				loading={false}
				bordered={true}
				showPagination={true}
				paginationConfig={pagination}
				onChange={onChangePagination}
				rowKey={'name'}
			/>
		</div>
	);
};


\`\`\`
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const Default = () => <div></div>;
