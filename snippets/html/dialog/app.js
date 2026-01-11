async function setupPlayground() {
    const buttonOnlyJsModalElement = document.querySelector('#button-only-js-modal');
    const buttonOnlyJsDialogElement = document.querySelector('#button-only-js-dialog');
    const dialogOnlyJsElement = document.querySelector('#dialog-only-js');
    const onlyDialogJsCloseElement = dialogOnlyJsElement.querySelector('button');
    const buttonDialogElement = document.querySelector('#button-as-a-drawer');
    const drawerDialogElement = document.querySelector('#dialog-as-a-drawer');

    buttonOnlyJsModalElement.addEventListener('click', () => {
        // NB: if a dialog and we try to open it, an exeception will be thrown `app.js:7 Uncaught InvalidStateError: Failed to execute 'showModal' on 'HTMLDialogElement': The dialog is already open as a non-modal dialog, and therefore cannot be opened as a modal dialog.`
        if (document.querySelectorAll('dialog[open]:modal')) {
            alert('A dialog/modal is already opened');
            return;
        }

        dialogOnlyJsElement.showModal();
    });
    buttonOnlyJsDialogElement.addEventListener('click', () => dialogOnlyJsElement.show());
    onlyDialogJsCloseElement.addEventListener('click', (event) => {
        event.preventDefault();
        dialogOnlyJsElement.close();
    });
    buttonDialogElement.addEventListener('click', () => drawerDialogElement.show());
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
