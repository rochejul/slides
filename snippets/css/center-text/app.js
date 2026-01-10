async function setupTextBox() {
    const renderElements = document.querySelectorAll('.demo');
    const codeElement = document.querySelector('code');
    const selectElement = document.querySelector('select');

    selectElement.addEventListener('input', (event) => {
        event.preventDefault();
        render();
    });

    function render() {
        const currentValue = selectElement.value;
        codeElement.textContent = currentValue;
        renderElements.forEach((renderElement) => renderElement.setAttribute('style', currentValue));
        hljs.initHighlightingOnLoad();
    }

    render();
}

async function setup() {
    await setupTextBox();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await setup();
    });
} else {
    await setup();
}
