import { obtenerMenu } from "./model.js";
import { renderMenu } from "./view.js";

class MenuController {

    render() {
        const menu = obtenerMenu("principal");

        return renderMenu(menu);
    }

    bindEvents() {
        // Los enlaces son gestionados por el router.
    }

}

export { MenuController };