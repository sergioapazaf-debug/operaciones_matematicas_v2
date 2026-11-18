const menus = {
    principal: [
        { title: "➕", path: "/suma" },
        { title: "➖", path: "/resta" },
        { title: "✖️", path: "/multiplicacion" },
        { title: "➗", path: "/division" }
    ]
};

function obtenerMenu(nombreMenu) {
    return menus[nombreMenu];
}

export { obtenerMenu };