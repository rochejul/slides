if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', { type: 'module' }).then(
        (registration) => {
            console.log('Service worker registration succeeded:', registration);
        },
        (error) => {
            console.error(`Service worker registration failed: ${error}`);
        },
    );
}
