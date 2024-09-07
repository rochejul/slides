class Resource extends HTMLElement {
    static observedAttributes = ['label', 'url'];

    #root;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        const template = document.querySelector('template[id="resource"]');
        this.#root.appendChild(template.content.cloneNode(true));
        this.render();
    }

    attributeChangedCallback(e) {
        this.render();
    }

    render() {
        const aElement = this.#root.querySelector('a');

        if (!this.isConnected || !aElement) {
            return;
        }

        aElement.href = this.getAttribute('url');
        aElement.title = this.getAttribute('label');
        aElement.textContent = this.getAttribute('label');
    }
}

customElements.define('jro-resource', Resource);
