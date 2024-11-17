import { initializeServiceWorker } from './sw.js';

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await initializeServiceWorker();
    });
} else {
    await initializeServiceWorker();
}
