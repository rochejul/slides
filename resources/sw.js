export async function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        return navigator.serviceWorker.register('/resources/service-worker.js').then(
            (registration) => {
                console.log('Service worker registration succeeded:', registration);
            },
            (error) => {
                console.error(`Service worker registration failed: ${error}`);
            },
        );
    }
}
