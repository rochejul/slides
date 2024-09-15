export async function initializeServiceWorker() {
    const isHostedOnGithub = location.hostname === 'rochejul.github.io';
    const serviceWorkerUrl = (isHostedOnGithub ? '/slides' : '') + '/resources/service-worker.js';

    if ('serviceWorker' in navigator) {
        return navigator.serviceWorker.register(serviceWorkerUrl).then(
            (registration) => {
                console.log('Service worker registration succeeded:', registration);
            },
            (error) => {
                console.error(`Service worker registration failed: ${error}`);
            },
        );
    }
}
