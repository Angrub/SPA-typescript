class projectInfo extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        
    }

    getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="about">
                <h2>About this project</h2>
                <p>A SPA with typescript, web components and SSR. <br><br>

                    This project is the culmination of my desire to develop a game engine with the canvas API. The result is a game engine developed with typescript and a minesweeper as a demo <br> <br>
                    
                    My github:
                </p>
                <a href="https://github.com/Angrub">
                    <img src="https://avatars.githubusercontent.com/u/37394271?s=400&u=bdd5836f2c128e55322c9e0ed056b5f8934a28af&v=4" alt="">
                </a>
            </div>
            ${this.getStyles()}
        `;
        return template;
    }

    getStyles(): string {
        return `
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 75vh;
                }
                
                .about {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 85%;
                    height: 80%;
                    margin: 0 auto;
                    padding: 1.3rem 0;
                    border-radius: 0.5rem;
                    border: 4px outset #1C7947;
                    background-color: #1C7947;
                    color: #FFFD95;
                }

                h2 {
                    width: 80%;
                    margin: 0;
                    padding: 1.1rem;
                    background-color: #0c1127;
                    border-radius: 0.5rem;
                    border: 4px outset #0c1127; 
                    text-align: center;
                    font-family: 'Gemunu Libre', sans-serif;
                    font-size: 3rem;
                }

                p {
                    width: 80%;
                    
                    font-family: 'Padauk', sans-serif;
                    font-size: 1.5rem;
                }

                img {
                    width: 10rem;
                    margin: 0;
                    border: 1px outset #39A388;
                    border-radius: 50%;
                }

                @media (min-width: 768px) {
                    .about {
                        justify-content: space-evenly;
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

customElements.define('project-info', projectInfo);