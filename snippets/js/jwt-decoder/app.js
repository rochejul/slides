function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''),
    );

    return JSON.parse(jsonPayload);
}

async function setup() {
    const textareaElement = document.querySelector('textarea');
    const buttonElement = document.querySelector('button');
    const codeElement = document.querySelector('code');

    buttonElement.addEventListener(
        'click',
        () => {
            codeElement.textContent = '';

            try {
                const parsedJwtToken = parseJwt(textareaElement.value);
                codeElement.textContent = JSON.stringify(parsedJwtToken, null, 3);
            } catch (e) {
                codeElement.textContent = '**** an error occured ****';
            }
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
