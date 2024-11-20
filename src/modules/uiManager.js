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

        // Logo Section
        const logo = document.createElement("div");
        const logoHeader = document.createElement("h2");
        logoHeader.textContent = "Donezo";
        logo.appendChild(logoHeader);
        logo.classList.add("logo");

        // Projects Section
        const projectsContainer = document.createElement("div");
        const projectsHeader = document.createElement("h3");
        projectsHeader.textContent = "Projects";
        projectsContainer.appendChild(projectsHeader);
        projectsContainer.classList.add("projects")

        sidebar.appendChild(logo);
        sidebar.appendChild(projectsContainer)

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
