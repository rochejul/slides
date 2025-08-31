import { cp } from 'node:fs/promises';
import { emptyDirSync } from 'fs-extra';

emptyDirSync('./dist');

await cp('./index.html', './dist/index.html', { recursive: true });
await cp('./glossary.html', './dist/glossary.html', { recursive: true });
await cp('./tips.html', './dist/tips.html', { recursive: true });

await cp('./games', './dist/games', { recursive: true });
await cp('./resources', './dist/resources', { recursive: true });
await cp('./shared', './dist/shared', { recursive: true });
await cp('./slides', './dist/slides', { recursive: true });
await cp('./snippets', './dist/snippets', { recursive: true });
