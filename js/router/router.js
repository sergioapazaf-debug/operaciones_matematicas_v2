import { MenuController } from "../modules/menu/controller.js";

// Definición de rutas
const routes = {
    "/": new MenuController()
};

// Renderizar la vista correspondiente
export function router() {
    // Recuperar ruta guardada o utilizar la ruta actual
    const savedPath = sessionStorage.getItem("spa_path");

    let path;

    if (savedPath) {
        path = savedPath.split(/[?#]/)[0];
        sessionStorage.removeItem("spa_path");
    } else {
        path = window.location.pathname;
    }

    // Normalizar la ruta
    path = normalizePath(path);

    const app = document.querySelector("#app");

    const controller = routes[path];

    if (!controller) {
        app.innerHTML = `
        <div class="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
            <h1>404 - Página no encontrada</h1>
            <p>La página que buscas no existe.</p>

            <a href="/" class="btn btn-primary mt-3">
                Volver al inicio
            </a>
        </div>
    `;
        return;
    }

    app.innerHTML = controller.render();

    // Registrar eventos del controlador, si los tiene
    controller.bindEvents?.();
}

const BASE_PATH = "/operaciones_matematicas_v2";

// Normalizar rutas para eliminar el prefijo de GitHub Pages
function normalizePath(path) {
    if (path.startsWith(BASE_PATH)) {
        path = path.slice(BASE_PATH.length);
    }

    return path || "/";
}

// Inicializar el router
export function initRouter() {
    document.addEventListener("click", (event) => {
        const link = event.target.closest("a");

        if (!link) return;

        // Ignorar enlaces externos
        if (link.origin !== window.location.origin) return;

        // Ignorar comportamientos especiales
        if (
            link.target ||
            link.hasAttribute("download") ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0
        ) {
            return;
        }

        event.preventDefault();

        history.pushState(null, "", link.href);

        router();
    });

    // Navegación mediante Atrás y Adelante
    window.addEventListener("popstate", router);

    // Renderizar la ruta inicial
    router();
}