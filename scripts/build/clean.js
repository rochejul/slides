import { emptyDirSync } from 'fs-extra';
import { BUILD_DIR } from '../config.js';

export async function clean() {
    emptyDirSync(BUILD_DIR);
}
