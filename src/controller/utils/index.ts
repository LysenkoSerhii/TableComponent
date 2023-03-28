export const isArraysEqual = <T = any>(arr1: T[], arr2: T[]): boolean => {
	if (arr1.length !== arr2.length) {
		return false;
	}

	arr1.sort();
	arr2.sort();

	return arr1.every((el: T) => arr2.includes(el));
};
