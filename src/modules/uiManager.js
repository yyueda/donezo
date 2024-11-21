import localStorageManager from "./localStorage.js";

const UI = (function () {
    
    const initialiseUI = () => {
        createHomePage();
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
        const projectsSection = createProjectSection();

        sidebar.appendChild(logo);
        sidebar.appendChild(projectsSection);

        sidebar.classList.add("sidebar");

        return sidebar;
    }

    const createMainContent = () => {
        const content = document.createElement("div");
        content.classList.add("content");

        return content;
    }

    const createProjectSection = () => {
        const projectsSection = document.createElement("div");
        const projectsHeader = document.createElement("h3");
        const projectsContainer = document.createElement("div");

        projectsHeader.textContent = "Projects";
        projectsSection.appendChild(projectsHeader);
        projectsSection.classList.add("projects")

        const projects = localStorageManager.loadProjectsFromLocalStorage();
        projects.forEach(project => {
            projectsContainer.appendChild(createProjectItem(project));
        });
        projectsSection.appendChild(projectsContainer);

        return projectsSection;
    };

    const createProjectItem = (project) => {
        const projectElement = document.createElement("div");
        projectElement.textContent = project.getName();
        return projectElement;
    };

    return { initialiseUI };
})();

export default UI;
