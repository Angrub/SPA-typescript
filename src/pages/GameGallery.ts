const GameGallery = (): string => {
    const view = `
    <nav-arcade
        returncontent="home"
        returnlink="/"
        githublink="https://github.com/Angrub/game-engine"
    ></nav-arcade>
    <game-carrousel></game-carrousel>
    `;

    return view;
}

export default GameGallery;