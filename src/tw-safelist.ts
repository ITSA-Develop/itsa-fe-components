// This file exists solely to ensure Tailwind sees these classes during build
// so they are included in the generated CSS for consumers of the library.

export const TW_SAFELIST_REFERENCE = [
	'bg-gray-75',
	'hover:bg-gray-75',
	'focus:bg-gray-75',
	'border-gray-75',
	'hover:border-gray-75',
	'focus:border-gray-75',
	'text-gray-75',
	'hover:text-gray-75',
	'focus:text-gray-75',
];

// Prevent tree-shaking by pseudo-using the strings
export function __twUseSafelist() {
	return TW_SAFELIST_REFERENCE.join(' ');
}


