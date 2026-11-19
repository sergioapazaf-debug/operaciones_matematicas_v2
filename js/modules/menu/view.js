import { BASE_PATH } from "../../router/config.js";

function renderMenu(menu) {
    return `
        <div class="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
            <div class="row w-100 justify-content-center">
                <div class="col-10 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div class="row justify-content-center">
                        ${menu.map(option => `
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6 p-3">
                                <a
                                    href="${BASE_PATH}${option.path}"
                                    class="btn btn-primary w-100 menu-option">
                                    <span class="display-1">${option.title}</span>
                                </a>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        </div>
    `;
}

export { renderMenu };