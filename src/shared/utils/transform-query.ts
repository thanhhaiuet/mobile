export const transformQuery = (s: string) => {
	return s?.trim()?.toLowerCase()?.replace(/%/g, '\\%');
};

export const optionalBooleanMapper = new Map([
	['undefined', undefined],
	['true', true],
	['false', false],
]);
