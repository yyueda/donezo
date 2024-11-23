import localStorageManager from "./localStorage.js";
import projectManager from "./projectManager.js";
import addIcon from "../images/add.svg";

const UI = (function () {
    let projectsContainer;
    
    const initialiseUI = () => {
        projectManager.loadProjects();
        createHomePage();
    };

    const createHomePage = () => {
        const body = document.querySelector("body");
        const app = document.createElement("div");

        app.classList.add("app");

        app.appendChild(createSidebar());
        app.appendChild(createMainContent());
        body.append(app);
    }

    const createSidebar = () => {
        const sidebar = document.createElement("div");

        // Logo Section
        const logo = document.createElement("div");
        const logoHeader = document.createElement("div");
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
        // Project Section Header
        const projectsSection = document.createElement("div");
        projectsSection.appendChild(createProjectHeader());
        projectsSection.classList.add("projects");

        // Rendering projects in section
        projectsContainer = document.createElement("div");
        const projects = projectManager.getProjects();

        projects.forEach(project => {
            projectsContainer.appendChild(createProjectItem(project));
        });
        projectsContainer.classList.add("projects-container");

        projectsSection.appendChild(projectsContainer);

        return projectsSection;
    };

    const createProjectHeader = () => {
        // Projects Header
        const projectsHeader = document.createElement("span");
        projectsHeader.textContent = "Projects";

        // Add Button
        const addButton = createButtonWithIcon(addIcon, "add-btn", handleAddClick);

        // Buttons Container
        const buttonsContainer = document.createElement("div");
        buttonsContainer.appendChild(addButton);

        const projectsHeaderContainer = document.createElement("div");
        projectsHeaderContainer.classList.add("projects-header");
        projectsHeaderContainer.appendChild(projectsHeader);
        projectsHeaderContainer.appendChild(buttonsContainer);

        return projectsHeaderContainer;
    };

    const createProjectItem = (project) => {
        const projectElement = document.createElement("div");
        projectElement.textContent = project.getName();
        return projectElement;
    };

    const handleAddClick = () => {
        const project = projectManager.addProject("New Project");
        const projectElement = createProjectItem(project);
        projectsContainer.appendChild(projectElement);
    };

    const createButtonWithIcon = (iconSrc, className, onClick) => {
        const buttonIcon = document.createElement("img");
        buttonIcon.classList.add(className);
        buttonIcon.src = iconSrc;
        buttonIcon.addEventListener("click", onClick);
        return buttonIcon;
    };

    return { initialiseUI };
})();

export default UI;
