class SectionTitle extends HTMLElement {
    static observedAttributes = ['label'];

    #root;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        const template = document.querySelector('template[id="section-title"]');
        this.#root.appendChild(template.content.cloneNode(true));
        this.render();
    }

    attributeChangedCallback(e) {
        this.render();
    }

    render() {
        const h1Element = this.#root.querySelector('h1');

        if (!this.isConnected || !h1Element) {
            return;
        }

        h1Element.textContent = this.getAttribute('label');
    }
}

customElements.define('jro-section-title', SectionTitle);
