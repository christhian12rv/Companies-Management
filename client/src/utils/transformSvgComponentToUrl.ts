import { ReactElement, JSXElementConstructor } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export default (component: ReactElement<any, string | JSXElementConstructor<any>>): string => {
	const svgString = encodeURIComponent(renderToStaticMarkup(component));

	return `"data:image/svg+xml,${svgString}"`;
};