const UIHelpers = (() => {
    const createButtonWithIcon = (iconSrc, className, onClick) => {
        const button = document.createElement("img");
        button.src = iconSrc;
        button.classList.add(className);
        button.addEventListener("click", onClick);

        return button;
    };

    return { createButtonWithIcon };
})();

export default UIHelpers;
