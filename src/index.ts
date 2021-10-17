import './styles.css';
import './components/menu-arcade';
import './components/footer-arcade';
import './components/nav-acarde';
import './components/game-card';
import './components/game-carousel';
import './components/project-info';
import './components/mines-weeper'
import router from './router';

const root = document.querySelector('#root');

if(!root)  throw new Error('Failed to load container element');
else {
    window.addEventListener('load', () => router(root));
    window.addEventListener('hashchange', () => router(root));
} 
