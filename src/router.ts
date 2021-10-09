import getHash from "./getHash";
import Home from "./pages/Home";
import About from "./pages/About";
import GameGallery from "./pages/GameGallery";
import Error404 from "./pages/Error404";
import MW from "./pages/Minesweeper";

const routes = {
    '/': Home,
    'about': About,
    'games': GameGallery,
    'mw': MW
}

const router = (container: Element): void => {
    
    const hash = getHash();
    const render = routes[hash]? routes[hash] : Error404;

    container.innerHTML  = render();
}

export default router;