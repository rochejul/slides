class Logo extends HTMLElement {
    #root;

    constructor() {
        super();

        this.#root = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        this.#root.innerHTML = `
<link rel="stylesheet" href="/resources/components/logo/index.css" />
<figure class="avatar">
        <section class="avatar__wrapper">
            <img class="avatar__wrapper__image" src="/resources/assets/black_dalek_400x400.jpg" title="Exterminate all humans" />
        </section>
        <audio preload="auto" loop="loop">
            <source src="/resources/sounds/exterminate.mp3" />
        </audio>
    </figure>

    <div class="avatar-notice">EXTERMINATE!! EXTERMINATE!!</div>
`;

        const audio = this.#root.querySelector('audio');
        const avatar = this.#root.querySelector('.avatar');

        avatar.addEventListener('mouseenter', () => {
            audio.play();
        });

        avatar.addEventListener('mouseout', () => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
}

customElements.define('jro-logo', Logo);
