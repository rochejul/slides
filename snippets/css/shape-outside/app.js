async function setup() {
    const rangeElement = document.querySelector('input');
    const imgElement = document.querySelector('img');

    rangeElement.addEventListener(
        'input',
        () => {
            imgElement.setAttribute('style', `shape-outside: circle(${rangeElement.value}%);`);
        },
        false,
    );
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await setup();
    });
} else {
    await setup();
}
