async function setupPlayground() {
    const formElement = document.querySelector('form');
    const renderElement = document.querySelector('#playground');
    const sizeOutputElement = document.querySelector('output');
    let state = { type: 'none', size: 0.5 };

    formElement.addEventListener('input', (event) => {
        event.preventDefault();
        updateState();
        formatValue();
    });

    function updateState() {
        const formData = new FormData(formElement);
        state = Object.fromEntries(formData.entries());
        sizeOutputElement.value = state.size;
    }

    function formatValue() {
        renderElement.setAttribute('style', state.style === 'none' ? 'font-size-adjust: none' : `font-size-adjust: ${state.type} ${state.size};`);
    }
}

async function setup() {
    await setupPlayground();
    hljs.initHighlightingOnLoad();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await setup();
    });
} else {
    await setup();
}
