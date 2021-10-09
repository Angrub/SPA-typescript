import arrow from '../images/right-arrow.png'

class gameCarrousel extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="carrousel">
                <button>
                    <span class="left"></span>
                </button>
                <div class="card-container">
                    <game-card
                    gamelink="#/mw/"
                    ></game-card>
                </div>
                <button>
                    <span class="right"></span>
                </button>
            </section>
            ${this.getStyles()}
        `;
        return template;
    }

    getStyles(): string {
        return `
            <style>

                :host {
                    display: flex;
                    width: 100%;
                    height: 85vh;
                }

                .carrousel {
                    display: flex;
                    width: 100%;
                    height: auto;
                    justify-content: space-evenly;
                    align-items: center;
                }

                .card-container {
                    width: 60%;
                    z-index: 1;
                }
                
                button {
                    background-color: #FFFD95;
                    border-color: #FFFD95;
                    padding: 0.9rem;
                    border-radius: 0.5rem;
                    z-index: 2;
                }

                button:hover {
                    cursor: pointer;
                }

                span {
                    display: inline-block;
                    width: 2rem;
                    height: 2rem;
                    
                }

                .right {
                    background-image: url(${arrow});
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }

                .left {
                    background-image: url(${arrow});
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    transform: rotate(0.5turn);
                }

                @media (min-width: 768px) {
                    button {
                        width: 10rem;
                        height: 8rem;
                        border-width: 5px;
                    }
                }
                
            </style>
        `;
    }

    events(): void {
    
    }

    render(): void {
        this.shadowRoot?.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback(): void {
        this.render();
        
    }
}

customElements.define('game-carrousel', gameCarrousel);