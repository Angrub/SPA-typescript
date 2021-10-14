class footerArcade extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }
    
    getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = `
            <footer>
                <ul>
                    <li><a href="https://github.com/Angrub/SPA-typescript">Repository</a></li>
                    <li>Contact - angru1810@gmail.com</li>
                    <li>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></li>
                </ul>
            </footer>
            ${this.getStyles()}
        `;

        return template;
    }

    getStyles(): string {
        return `
            <style>
                :host {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    max-width: 768px;
                    height: auto;
                    background-color: #39A388;
                }

                footer {
                    width: 100%;
                    height: 100%;
                }

                ul {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0.5rem 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                li {
                    list-style: none;
                    color: #18673c;
                    font-family: 'Padauk', sans-serif;
                    font-size: 1.5rem;
                }

                a {
                    text-decoration: none;
                    color: #18673c;
                }
                
                @media (min-width: 768px) {
                    li {
                        font-size: 1.75rem;
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

customElements.define('footer-arcade', footerArcade);