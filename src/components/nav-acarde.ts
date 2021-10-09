import githubLogo from '../images/GitHub-Mark-Light-32px.png';

class navArcade extends HTMLElement {
    returncontent: string;
    returnlink: string;
    githublink; string;

    static get observedAttributes() {
        return ['returncontent', 'returnlink', 'githublink'];
    }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.returncontent = '';
        this.returnlink = '';
        this.githublink = '';
    }

    attributeChangedCallback(attr: string, oldVal: any, newVal: string): void {
        if(oldVal !== newVal) {
            this[attr] = newVal;
        }
    }

    getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = `
            <nav>
                <a href="${this.returnlink}">${this.returncontent}</a>
                <a href="${this.githublink}"><span></span></a>
            </nav>
            ${this.getStyles()}
        `;
        return template;
    }

    getStyles(): string {
        return `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: auto;
                    background-color: #39A388;
                }
                
                nav {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0.9rem 1rem;
                    margin: 1rem;
                    background-color: #0c1127;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-family: 'Gemunu Libre', sans-serif;
                    font-size: 2rem;
                    color: #FFFD95;
                    text-align: center;
                }

                span {
                    display: inline-block;
                    width: 2rem;
                    height: 2rem;
                    background-image: url(${githubLogo});
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
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

customElements.define('nav-arcade', navArcade);
