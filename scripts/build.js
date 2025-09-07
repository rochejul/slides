import { clean, copyResources } from './build/index.js';

await clean();
await copyResources();
