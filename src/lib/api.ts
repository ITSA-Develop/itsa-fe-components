// NOTE: this is just for testing! it is not part of the actual logic!
export const getSchemaData = async (schema: string) => {
	const mockData: Record<string, any[]> = {
		users: [
			{
				id: 1,
				name: 'Alice',
				city: 'CUE',
				amount: 10000,
				nro: 2,
				description: 'una descripcion aqui',
				isActive: false,
				gender: 'M',
				birthdate: '23/09/1989',
				dateRanges: { startDate: '01/10/2024', endDate: '20/10/2024' },
				file: 'www.somerandomfilehosted.com/bucket.png',
			},
			{
				id: 2,
				name: 'Chales',
				city: 'UIO',
				amount: 10000,
				nro: 2,
				description: 'dos descripcion aqui',
				isActive: false,
				gender: 'M',
				birthdate: '23/09/1989',
				dateRanges: { startDate: '01/10/2024', endDate: '20/10/2024' },
				file: 'www.somerandomfilehosted.com/bucket.png',
			},
			{
				id: 3,
				name: 'Pedro Jose Perez Rodriguez',
				city: 'CUE',
				amount: 10000,
				nro: 2,
				description: 'tres descripcion aqui',
				isActive: false,
				gender: 'M',
				birthdate: '24/09/1998',
				dateRanges: { startDate: '01/10/2024', endDate: '20/10/2024' },
				file: 'www.somerandomfilehosted.com/bucket.png',
			},
			{
				id: 4,
				name: 'Paul',
				city: 'UIO',
				amount: 10000,
				nro: 2,
				description: 'una descripcion aqui',
				isActive: false,
				gender: 'M',
				birthdate: '23/10/1988',
				dateRanges: { startDate: '01/10/2024', endDate: '20/10/2024' },
				file: 'www.somerandomfilehosted.com/bucket.png',
			},
		],
		products: [
			{ id: 101, title: 'Product A', price: 10 },
			{ id: 102, title: 'Product B', price: 20 },
		],
	};

	return new Promise<any[]>(resolve => {
		setTimeout(() => resolve(mockData[schema] || []), 1000);
	});
};
