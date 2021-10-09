import createGame from "../minesweeper";

class minesWeeper extends HTMLElement {
    widthmw: string;
    heightmw: string;

    static get observedAttributes() {
        return ['widthmw', 'heightmw'];
    }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        const cell = 30;
        // width minesweeper
        const rowWidth = Math.floor(window.visualViewport.width * 0.9 / cell);
        const width = rowWidth * cell;
        this.widthmw = `${(width > 690) ? 690: width}`;
        // heigth minesweeper
        const columnHeight = Math.floor(window.visualViewport.height / 1.5 / cell);
        const gui = 50;
        this.heightmw = `${(columnHeight * cell) + gui}`;
    }

    attributeChangedCallback(attr: string, oldVal: any, newVal: string): void {
        if(oldVal !== newVal) {
            this[attr] = newVal;
        }
    }

    getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = `
            <div id="r"></div>
            ${this.getStyles()}
        `;
        return template;
    }

    getStyles(): string {
        return `
            <style>
                #r {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    padding-top: 3rem;

                }

                
            </style>
        `;
    }

    render(): void {
        this.shadowRoot?.appendChild(this.getTemplate().content.cloneNode(true));
        const root = this.shadowRoot?.querySelector('#r');
        createGame(<Element>root, parseInt(this.widthmw), parseInt(this.heightmw))
    }

    connectedCallback(): void {
        this.render();
    }
}

customElements.define('mines-weeper', minesWeeper);