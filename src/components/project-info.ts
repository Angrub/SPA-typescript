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
                <p>A SPA with typescript and web components.<br><br>

                    This project is the culmination of my desire to develop a game engine with the canvas API. The result is a game engine developed with typescript and a minesweeper as a demo. <br> <br>
                    
                    Optimizations:<br>

                    1. Resource prefetching and preloading<br>
                    2. Lightweight css animations<br>
                    3. Code splitting<br>
                    4. Lazy load<br><br>

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
                    height: 90vh;
                    overflow: hidden;
                }
                
                .about {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 80%;
                    height: auto;
                    margin: 10rem auto;

                    padding: 1.3rem 0;
                    border-radius: 0.5rem;
                    border: 4px outset #1C7947;
                    background-color: #1C7947;
                    color: #FFFD95;

                    animation: arrival-about 500ms ease-in-out ;
                }

                @keyframes arrival-about {
                    0% {
                        transform: translateY(200px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
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

                    opacity: 0;
                    animation: 500ms arrival 500ms ease-in-out forwards;
                }

                @keyframes arrival {
                    0% {
                        transform: translateX(50px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                img {
                    width: 10rem;
                    margin: 0;
                    border: 1px outset #39A388;
                    border-radius: 50%;

                    opacity: 0;
                    animation: 1s arrival 500ms ease-in-out forwards;
                }

                @media (min-width: 768px) {
                    .about {
                        width: 70%;
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