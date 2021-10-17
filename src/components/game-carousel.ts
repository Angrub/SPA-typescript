import arrow from '../images/right-arrow.png'

class gameCarrousel extends HTMLElement {
    index: number;
    cards: Element[];

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.index = 0;
        this.cards = [];
    }

    getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="carousel">
                <button class="button-left">
                    <span class="left"></span>
                </button>
                <div class="card-container">
                    <game-card
                    gamelink="#/mw/"
                    title="minesweeper"
                    ></game-card>
                    <game-card
                    gamelink="#/mw/"
                    title="minesweeper"
                    ></game-card>
                    <game-card
                    gamelink="#/mw/"
                    title="minesweeper"
                    ></game-card>
                </div>
                <button class="button-right">
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
                    overflow: hidden;
                }

                .carousel {
                    display: flex;
                    width: 100%;
                    height: auto;
                    justify-content: space-evenly;
                    align-items: center;
                }

                .card-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 60%;
                    height: 300px;
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

    slider(): void {
        // init
        this.initSlider();

        // buttons
        const left = this.shadowRoot?.querySelector('.button-left');
        const right = this.shadowRoot?.querySelector('.button-right');

        // buttons events
        left?.addEventListener('click', () => {
            this.changeLeft();
        });

        right?.addEventListener('click', () => {
            this.changeRight();
        });
    }

    changeRight(): void {
        if(this.index < this.cards.length - 1) {
            // current
            const currentCard = this.getCard(this.index);
            currentCard.classList.remove('center');
            currentCard.classList.add('left');

            // next
            const nextCard = this.getCard(this.index + 1);
            nextCard.classList.remove('right');
            nextCard.classList.add('center');
            this.index++;
        }
    }

    changeLeft(): void {
        if(this.index > 0) {
            // current
            const currentCard = this.getCard(this.index);
            currentCard.classList.remove('center');
            currentCard.classList.add('right');

            // next
            const nextCard = this.getCard(this.index - 1);
            nextCard.classList.remove('left');
            nextCard.classList.add('center');
            this.index--;
        }
    }

    getCard(index: number): Element {
        const card = this.cards[index].shadowRoot?.querySelector('article');
        return (<Element>card);
    }

    initSlider(): void {
        // cards
        const cardsNodeList = this.shadowRoot?.querySelectorAll('game-card');
        if(cardsNodeList === undefined) throw new Error('Cards load failed');

        // cards start on the right 
        cardsNodeList.forEach(element => {
            const card = element.shadowRoot?.querySelector('article');

            (<HTMLElement>card).classList.add('right');
        });
        this.cards = [...cardsNodeList];
        
        // first card
        const firstCard = this.getCard(this.index);
        firstCard?.classList.remove('right');
        firstCard?.classList.add('center');
    }

    render(): void {
        this.shadowRoot?.appendChild(this.getTemplate().content.cloneNode(true));
        this.slider();
    }

    connectedCallback(): void {
        this.render();
    }
}

customElements.define('game-carrousel', gameCarrousel);