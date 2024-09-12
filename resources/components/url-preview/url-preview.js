class UrlPreview extends HTMLElement {
    static observedAttributes = ['label', 'src'];

    #root;
    #listened = false;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        const template = document.querySelector('template[id="url-preview"]');
        this.#root.appendChild(template.content.cloneNode(true));
        this.render();
    }

    attributeChangedCallback(e) {
        this.render();
    }

    render() {
        const urlElement = this.#root.querySelector('.url');

        if (!this.isConnected || !urlElement) {
            return;
        }

        const url = this.getAttribute('src');
        const isExternal = url.startsWith('http://') || url.startsWith('https://');

        urlElement.textContent = this.getAttribute('label');
        urlElement.setAttribute('title', this.getAttribute('label'));
        urlElement.setAttribute('href', url);
        urlElement.setAttribute('ref', isExternal ? 'external' : 'prefetch');

        this.listenHover();
    }

    listenHover() {
        if (this.#listened) {
            return;
        }

        this.#listened = true;
        const iconElement = this.#root.querySelector('.url__icon');
        const template = this.#root.querySelector('#url-preview-template');

        iconElement.addEventListener('mouseenter', () => {
            const previewElement = template.content.cloneNode(true);
            const previewContentElement = previewElement.querySelector('.url-preview__content');
            const url = this.getAttribute('src');

            previewContentElement.setAttribute('src', url);

            this.#root.appendChild(previewElement);
        });

        iconElement.addEventListener('mouseleave', () => {
            this.#root.removeChild(this.#root.querySelector('.url-preview'));
        });
    }
}

customElements.define('jro-url-preview', UrlPreview);
