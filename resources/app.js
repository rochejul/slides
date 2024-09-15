import { loadWebComponents } from './html-import.js';
import { initializeServiceWorker } from './sw.js';

await loadWebComponents();

function removeLoader() {
    const loaderElement = document.querySelector('.page__loader');
    document.body.removeChild(loaderElement);

    document.querySelector('.page').classList.remove('page--loading');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await initializeServiceWorker();
        removeLoader();
    });
} else {
    await initializeServiceWorker();
    removeLoader();
}
