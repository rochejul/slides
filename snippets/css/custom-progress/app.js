async function setup() {
    const defaultProgressElement = document.querySelector('#progress-default');
    const customProgressElement = document.querySelector('#progress-custom');

    let inc = 0;
    let up = true;

    setInterval(() => {
        if (inc === 750) {
            up = false;
        } else if (inc === 0) {
            up = true;
        }

        inc = up ? inc + 5 : inc - 5;

        defaultProgressElement.value = 150 + inc;
        customProgressElement.value = 150 + inc;
    }, 25);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await setup();
    });
} else {
    await setup();
}
