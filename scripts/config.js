import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

export const ROOT_DIR = resolve(join(__filename, '../..'));
export const BUILD_DIR = resolve(ROOT_DIR, './dist');
