import { MenuController } from "../modules/menu/controller.js";

// Definición de rutas
const routes = {
    "/": new MenuController()
};

// Renderizar la vista correspondiente
export function router() {
    const path = normalizePath(window.location.pathname);
    const app = document.querySelector("#app");

    const controller = routes[path];

    if (!controller) {
        app.innerHTML = `
            <div class="container text-center mt-5">
                <h1>404 - Página no encontrada</h1>
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