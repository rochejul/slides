import { loadWebComponents } from './html-import.js';
import { initializeServiceWorker } from './sw.js';

await loadWebComponents();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await initializeServiceWorker();
    });
} else {
    await initializeServiceWorker();
}
