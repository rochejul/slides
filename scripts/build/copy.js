import { cp } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { ROOT_DIR, BUILD_DIR } from '../config.js';

async function copyResource(pathFromRoot) {
    const origin = resolve(join(ROOT_DIR, pathFromRoot));
    const target = resolve(join(BUILD_DIR, pathFromRoot));

    await cp(origin, target, { recursive: true });
}

export async function copyResources() {
    await copyResource('./index.html');
    await copyResource('./glossary.html');
    await copyResource('./tips.html');

    await copyResource('./games');
    await copyResource('./resources');
    await copyResource('./shared');
    await copyResource('./slides');
    await copyResource('./snippets');
}
