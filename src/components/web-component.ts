class webComponent extends HTMLElement {
    atribute: any;

    static get observedAttributes() {
        return ['atribute'];
    }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.atribute = null;
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
            ${this.getStyles()}
        `;
        return template;
    }

    getStyles(): string {
        return `
            <style>
                /* styles */
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

customElements.define('web-component', webComponent);