class menuArcade extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode:'open'})
    }

    getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = `
            <header>
                <div class="title-container">
                    <h1>Arcade App</h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="#/games/">Games</a></li>
                        <li><a href="#/about/">About</a></li>
                    </ul>
                </nav>
            </header>
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
                    align-items: center;
                }
                
                header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: column;
                    width: 100%;
                    height: auto;
                }

                .title-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 80%;
                    max-width: 320px;
                    height: 6rem;
                    margin: 5rem 0;
                    background-color: #1C7947;
                    border-radius: 0.5rem;
                    border: 4px outset #1C7947;
                }

                .title-container h1 {
                    font-family: 'Press Start 2P', cursive;
                    font-size: 2.2rem;
                    text-align: center;
                    color: #FFFD95;
                }

                nav {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: auto;
                    margin-bottom: 4rem;
                }
                
                ul {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    width: 80%;
                    height: auto;
                    margin: 0;
                    padding: 0;
                }

                li {
                    display: flex;
                    justify-content: center;
                    width: 80%;
                    margin-bottom: 1.5rem;
                    list-style: none;
                }

                a {
                    display: block;
                    width: 100%;
                    
                    padding: 1rem;
                    background-color: #0c1127;
                    border-radius: 0.5rem;
                    border: 3px outset #0c1127;
                    text-decoration: none;
                    font-family: 'Gemunu Libre', sans-serif;
                    font-size: 2rem;
                    color: #FFFD95;
                    text-align: center;

                    transition: background-color 100ms;
                    transition-timing-function: ease-in-out; 
                }

                a:hover {
                    background-color: #1d2238;
                }

                @media (min-width: 768px) {

                    header {
                        flex-direction: row;
                        justify-content: space-evenly;
                    }

                    .title-container {
                        height: 15rem;
                        width: 50%;
                    }

                    .title-container h1 {
                        width: 200px;
                        font-size: 3.5rem;
                    }

                    nav {
                        width: 40%;
                        margin: 0;
                    }

                    ul{
                        width: 100%;
                    }

                    li {
                        width: 100%;
                        margin: 1rem 0;
                    }

                    a {
                        font-size: 2.5rem;
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

customElements.define('menu-arcade', menuArcade);