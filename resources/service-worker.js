// The name of the new cache your app uses.
const CACHE_NAME = 'cache-v2';
const PRE_CACHED_RESOURCES = ['/resources'];

async function preCacheResources() {
    // Open the app's cache.
    const cache = await caches.open(CACHE_NAME);
    // Cache the new static resources.
    cache.addAll(PRE_CACHED_RESOURCES);
}

async function deleteOldCaches() {
    // List all caches by their names.
    const names = await caches.keys();
    await Promise.all(
        names.map((name) => {
            if (name !== CACHE_NAME) {
                // If a cache's name is the current name, delete it.
                return caches.delete(name);
            }
        }),
    );
}

// Listen to the `install` event.
self.addEventListener('install', (event) => {
    console.log('Install event in progress.');
    event.waitUntil(preCacheResources());
});

// Listen to the `activate` event to clear old caches.
self.addEventListener('activate', (event) => {
    console.log('Activate event in progress.');
    event.waitUntil(deleteOldCaches());
});