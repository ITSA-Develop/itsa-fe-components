/// <reference types="vite/client" />
declare module '*.svg' {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}

declare module '*.png' {
	const src: string;
	export default src;
}

declare module '*.html?raw' {
	const src: string;
	export default src;
}

declare module '*?raw' {
	const src: string;
	export default src;
}

declare module '*.html' {
	const src: string;
	export default src;
}