import * as helpers from '../../helpers';

describe('helpers exports', () => {
	it('should export key utility functions', () => {
		//booleansChecks
		expect(typeof helpers.isArray).toBe('function');
		expect(typeof helpers.isEmpty).toBe('function');
		expect(typeof helpers.isNumber).toBe('function');
		expect(typeof helpers.isObject).toBe('function');
		expect(typeof helpers.isString).toBe('function');
		expect(typeof helpers.isUndefined).toBe('function');
		expect(typeof helpers.isValidEmailFormat).toBe('function');
		expect(typeof helpers.isValidMaskFormat).toBe('function');

		expect(typeof helpers.securityApi).not.toBe(undefined);

		// currencies
		expect(typeof helpers.getFormatCurrency).toBe('function');

		// dates
		expect(typeof helpers.getCurrentDate).toBe('function');

		// formats
		expect(typeof helpers.getDropdownFormattedOptions).toBe('function');
		expect(typeof helpers.getFormattedAddress).toBe('function');
		expect(typeof helpers.getFormattedFieldValue).toBe('function');
		expect(typeof helpers.getFormattedSchemaValues).toBe('function');
		expect(typeof helpers.getLabelFromValue).toBe('function');
		expect(typeof helpers.getSchemaColumns).toBe('function');
		expect(typeof helpers.getSchemaFields).toBe('function');

		// objects
		expect(typeof helpers.cleanObject).toBe('function');
		expect(typeof helpers.createValueLabelMap).toBe('function');
		expect(typeof helpers.filterMenuTree).toBe('function');
		expect(typeof helpers.findLastChild).toBe('function');
		expect(typeof helpers.generateFilteredMenu).toBe('function');
		expect(typeof helpers.getMappedOptionFromAPI).toBe('function');
		expect(typeof helpers.getMappedOptionFromLocal).toBe('function');
		expect(typeof helpers.getNestedValue).toBe('function');
		expect(typeof helpers.hasAllRequiredFields).toBe('function');
		expect(typeof helpers.mapPermissionsToMenuFormat).toBe('function');

		// sessions
		expect(typeof helpers.clearLocalStorage).toBe('function');

		//strings
		expect(typeof helpers.capitalize).toBe('function');
		expect(typeof helpers.isRouteActive).toBe('function');
		expect(typeof helpers.toTitleCase).toBe('function');

		// urls
		expect(typeof helpers.addOrderParamIfMissing).toBe('function');
		expect(typeof helpers.buildQueryParams).toBe('function');
		expect(typeof helpers.cleanPath).toBe('function');
		expect(typeof helpers.clearURLParams).toBe('function');
		expect(typeof helpers.fillRoute).toBe('function');
		expect(typeof helpers.getParamsFromURL).toBe('function');
		expect(typeof helpers.getQueryParam).toBe('function');
		expect(typeof helpers.updateURLParams).toBe('function');
	});
});
