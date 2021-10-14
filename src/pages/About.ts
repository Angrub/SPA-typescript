const About = (): string => {
    const view = `
        <nav-arcade
            returncontent="home"
            returnlink="/"
            githublink="https://github.com/Angrub/SPA-typescript"
        ></nav-arcade>
        <project-info></project-info>
    `;

    return view;
}

export default About;