import { BUILD_DIR } from '../config.js';
import { resolve, join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

const serviceWorkerPath = resolve(join(BUILD_DIR, './resources/service-worker.js'));

export async function updateServiceWorker() {
    const content = await readFile(serviceWorkerPath, 'utf-8');
    const replaced = content.replace(/cache-vXX/g, `cache-v${new Date().toLocaleDateString('en-GB')}`);
    await writeFile(serviceWorkerPath, replaced, 'utf-8');
}
