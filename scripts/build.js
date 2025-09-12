import { clean, copyResources, updateServiceWorker } from './build/index.js';

await clean();
await copyResources();
await updateServiceWorker();
