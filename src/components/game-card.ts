import img from '../images/minesweeper.png'

class gameCard extends HTMLElement {
    img: string;
    title: string;
    gamelink: string;

    static get observedAttributes() {
        return ['img', 'title', 'gamelink'];
    }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.img = img;
        this.title = 'title';
        this.gamelink = ''
    }

    attributeChangedCallback(attr: string, oldVal: any, newVal: string): void {
        if(oldVal !== newVal) {
            this[attr] = newVal;
        }
    }

    getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = `
            <!-- content -->
            <article>
                <a href="${this.gamelink}">
                    <img src="${this.img}" alt="">
                    <div class="shadow"></div>
                    <div class="title-container">
                        <h3>${this.title}</h3>
                    </div>
                </a>
            </article>
            ${this.getStyles()}
        `;
        return template;
    }

    getStyles(): string {
        return `
            <style>

                :host {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    visibility: hidden;
                }

                article {
                    will-change: transform
                    position: relative;
                    width: 100%;
                    height: auto;
                    box-shadow: 0px 1px 11px 0px black;
                    border-radius: 1rem;

                    /* transitions */
                    transition: all 350ms;
                    transition-timing-function: ease-in-out;
                }

                a {
                    display: block;
                    width: 100%;
                    height: auto
                }

                img {
                    width: 100%;
                    border-radius: 1rem;
                }

                .shadow {
                    position: absolute;
                    top: 0;                    
                    width: 100%;
                    height:100%;
                    background-color: black;
                    opacity: 0.5;
                    border-radius: 1rem;

                    /* transitions */
                    transition: opacity 100ms;
                    transition-timing-function: ease-in-out;
                }

                h3 {
                    margin: 0;
                    color: #FFFD95;
                    font-family: 'Padauk', sans-serif;
                    font-size: 3rem;

                    opacity: 0;
                    
                    animation: h3 100ms 100ms ease-in-out forwards
                }

                @keyframes h3 {
                    0% {
                        opacity: 0;
                    }

                    100% {
                        opacity: 1;
                    }
                }

                .title-container {
                    position: absolute;
                    top: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                }

                article:hover .shadow{
                    opacity: 0.7;
                }

                .left {
                    transform: translateX(-400px);
                    visibility: hidden;
                }

                .right {
                    transform: translateX(400px);
                    visibility: hidden;
                }

                .center {
                    transform: translateX(0);
                    visibility: visible;
                }


                @media (min-width: 768px) {
                    article {
                        width: 80%;
                    }

                    .left {
                        transform: translateX(-600px);
                    }

                    .right {
                        transform: translateX(600px);
                    }

                    h3 {
                        font-size: 4rem;
                    }
                }

            </style>
        `;
    }

    render(): void {
        this.shadowRoot?.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback(): void {
        this.render();
    }
}

customElements.define('game-card', gameCard);