const UI = (function () {
    
    const initialiseUI = () => {
        createHomePage();
        console.log("Test");
    };

    const createHomePage = () => {
        const body = document.querySelector("body");
        const app = document.createElement("div");
        const sidebar = createSidebar();
        const content = createMainContent();

        app.classList.add("app");

        app.appendChild(sidebar);
        app.appendChild(content)
        body.append(app);
    }

    const createSidebar = () => {
        const sidebar = document.createElement("div");
        const projectsContainer = document.createElement("div");

        sidebar.classList.add("sidebar");

        return sidebar;
    }

    const createMainContent = () => {
        const content = document.createElement("div");
        content.classList.add("content");

        return content;
    }

    return { initialiseUI };
})();

export default UI;
