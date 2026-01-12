import { describe, expect, it } from 'vitest';
import { createDetailSchema } from '../../components/DetailView/schema/SchemaBuilder';

describe('SchemaBuilder', () => {
	it('creates a basic schema', () => {
		const schema = createDetailSchema()
			.section('Básico', s => s.field('name', 'Nombre'))
			.build();

		expect(schema.sections).toHaveLength(1);
		expect(schema.sections[0]?.title).toBe('Básico');
		expect(schema.sections[0]?.fields).toHaveLength(1);
		expect(schema.sections[0]?.fields[0]?.key).toBe('name');
		expect(schema.sections[0]?.fields[0]?.label).toBe('Nombre');
	});

	it('creates schema with multiple sections', () => {
		const schema = createDetailSchema()
			.section('Sección 1', s => s.field('field1', 'Field 1'))
			.section('Sección 2', s => s.field('field2', 'Field 2'))
			.build();

		expect(schema.sections).toHaveLength(2);
		expect(schema.sections[0]?.title).toBe('Sección 1');
		expect(schema.sections[1]?.title).toBe('Sección 2');
	});

	it('creates schema with different field types', () => {
		const schema = createDetailSchema()
			.section('Tipos', s =>
				s
					.field('text', 'Texto')
					.badge('status', 'Estado')
					.link('url', 'URL')
					.date('date', 'Fecha')
					.currency('price', 'Precio')
					.array('tags', 'Tags'),
			)
			.build();

		const fields = schema.sections[0]?.fields || [];
		expect(fields).toHaveLength(6);
		expect(fields[0]?.type).toBe('text');
		expect(fields[1]?.type).toBe('badge');
		expect(fields[2]?.type).toBe('link');
		expect(fields[3]?.type).toBe('date');
		expect(fields[4]?.type).toBe('currency');
		expect(fields[5]?.type).toBe('array');
	});

	it('applies default columns to sections', () => {
		const schema = createDetailSchema()
			.defaultColumns({ xs: 1, md: 3, xl: 4 })
			.section('Test', s => s.field('field', 'Field'))
			.build();

		expect(schema.defaultColumns).toEqual({ xs: 1, md: 3, xl: 4 });
		expect(schema.sections[0]?.columns).toEqual({ xs: 1, md: 3, xl: 4 });
	});

	it('creates schema with title and description', () => {
		const schema = createDetailSchema()
			.title('Mi Vista')
			.description('Descripción de la vista')
			.section('Test', s => s.field('field', 'Field'))
			.build();

		expect(schema.title).toBe('Mi Vista');
		expect(schema.description).toBe('Descripción de la vista');
	});

	it('creates table field', () => {
		const schema = createDetailSchema()
			.section('Tabla', s =>
				s.table('items', 'Items', [
					{ key: 'name', label: 'Nombre' },
					{ key: 'price', label: 'Precio', suffix: 'USD' },
				]),
			)
			.build();

		const field = schema.sections[0]?.fields[0];
		expect(field?.type).toBe('table');
		expect(field?.tableConfig?.columns).toHaveLength(2);
		expect(field?.tableConfig?.columns[0]?.key).toBe('name');
	});

	it('creates gallery field', () => {
		const schema = createDetailSchema()
			.section('Galería', s =>
				s.gallery('images', 'Imágenes', {
					aspectRatio: '16/9',
					autoPlay: true,
				}),
			)
			.build();

		const field = schema.sections[0]?.fields[0];
		expect(field?.type).toBe('gallery');
		expect(field?.galleryConfig?.aspectRatio).toBe('16/9');
		expect(field?.galleryConfig?.autoPlay).toBe(true);
	});

	it('creates custom field', () => {
		const customRenderer = (value: any) => <div>{value}</div>;
		const schema = createDetailSchema()
			.section('Custom', s => s.custom('field', 'Field', customRenderer))
			.build();

		const field = schema.sections[0]?.fields[0];
		expect(field?.type).toBe('custom');
		expect(field?.customRenderer).toBe(customRenderer);
	});

	it('configures section properties', () => {
		const schema = createDetailSchema()
			.section('Configurada', s =>
				s
					.field('field', 'Field')
					.columns({ xs: 1, md: 2 })
					.size('middle')
					.bordered(false)
					.layout('vertical')
					.collapsible(true)
					.className('custom-section'),
			)
			.build();

		const section = schema.sections[0];
		expect(section?.columns).toEqual({ xs: 1, md: 2 });
		expect(section?.size).toBe('middle');
		expect(section?.bordered).toBe(false);
		expect(section?.layout).toBe('vertical');
		expect(section?.collapsible).toBe(true);
		expect(section?.className).toBe('custom-section');
	});

	it('creates field with all options', () => {
		const formatter = (v: any) => `Formatted: ${v}`;
		const schema = createDetailSchema()
			.section('Opciones', s =>
				s.field('field', 'Field', {
					type: 'text',
					span: 2,
					formatter,
					prefix: '$',
					suffix: 'USD',
					emptyText: 'Vacío',
					copyable: true,
					showTooltip: true,
					hideIfEmpty: true,
				}),
			)
			.build();

		const field = schema.sections[0]?.fields[0];
		expect(field?.span).toBe(2);
		expect(field?.formatter).toBe(formatter);
		expect(field?.prefix).toBe('$');
		expect(field?.suffix).toBe('USD');
		expect(field?.emptyText).toBe('Vacío');
		expect(field?.copyable).toBe(true);
		expect(field?.showTooltip).toBe(true);
		expect(field?.hideIfEmpty).toBe(true);
	});
});
