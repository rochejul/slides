class SectionContent extends HTMLElement {
    static observedAttributes = ['label'];

    #root;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        const template = document.querySelector('template[id="section-content"]');
        this.#root.appendChild(template.content.cloneNode(true));
        this.render();
    }

    attributeChangedCallback(e) {
        this.render();
    }

    render() {
        const h2Element = this.#root.querySelector('h2');

        if (!this.isConnected || !h2Element) {
            return;
        }

        h2Element.textContent = this.getAttribute('label');
    }
}

customElements.define('jro-section-content', SectionContent);
