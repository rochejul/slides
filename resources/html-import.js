async function loadWebComponent(url) {
    const response = await fetch(url);
    const template = await response.text();

    document.body.insertAdjacentHTML('beforeend', template);

    const jsModuleUrl = url.replace('.html', '.js');
    const scriptElement = document.createElement('script');
    scriptElement.type = 'module';
    scriptElement.src = jsModuleUrl;
    document.body.appendChild(scriptElement);
}

export async function loadWebComponents() {
    const importElements = document.head.querySelectorAll('link[rel="import"]');

    for (const importElement of importElements) {
        await loadWebComponent(importElement.href);
    }
}
