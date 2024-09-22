const alloweddVariants = ['default', 'red', 'black', 'drawing'];

function getVariant(variantValue) {
    if (alloweddVariants.includes(variantValue)) {
        return `card--variant-${variantValue}`;
    }

    return 'card--variant-default';
}

class SectionContent extends HTMLElement {
    static observedAttributes = ['label', 'variant'];

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

        const cardElement = this.#root.querySelector('.card');
        const variant = getVariant(this.getAttribute('variant'));

        cardElement.classList.remove('card--variant-default', 'card--variant-red', 'card--variant-black', 'card--variant-drawing');
        cardElement.classList.add(variant);
    }
}

customElements.define('jro-section-content', SectionContent);
