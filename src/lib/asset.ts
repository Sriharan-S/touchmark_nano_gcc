/**
 * Prefixes a public asset path with the deployment base path.
 *
 * Next rewrites `basePath` for its own routes and for next/image, but NOT for
 * plain <img src="/...">. GitHub Pages serves this project from a subpath, so
 * image sources have to be prefixed by hand.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
