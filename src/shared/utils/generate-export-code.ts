export function randomExportCode(length = 6): string {
	const digits = '0123456789';
	const digitsLength = digits.length;
	let result = '';
	for (let i = 0; i < length; i++) {
		const index = Math.floor(Math.random() * digitsLength);
		result += digits[index];
	}
	return result;
}
