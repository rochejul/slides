class Logo extends HTMLElement {
    #root;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        const template = document.querySelector('template[id="logo"]');
        this.#root.appendChild(template.content.cloneNode(true));

        const audio = this.#root.querySelector('audio');
        const logo = this.#root.querySelector('.logo');

        logo.addEventListener('mouseenter', () => {
            try {
                audio.play();
            } catch (e) {}
        });

        logo.addEventListener('mouseout', () => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
}

customElements.define('jro-logo', Logo);
