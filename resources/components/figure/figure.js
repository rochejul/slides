class Figure extends HTMLElement {
    static observedAttributes = ['label', 'src'];

    #root;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        const template = document.querySelector('template[id="figure"]');
        this.#root.appendChild(template.content.cloneNode(true));
        this.render();
    }

    attributeChangedCallback(e) {
        this.render();
    }

    render() {
        const figcaption = this.#root.querySelector('figcaption');
        const img = this.#root.querySelector('img');

        if (!this.isConnected || !figcaption || !img) {
            return;
        }

        const label = this.getAttribute('label');

        figcaption.textContent = label;
        img.setAttribute('alt', label);
        img.setAttribute('src', this.getAttribute('src'));
    }
}

customElements.define('jro-figure', Figure);
