import donezo from "../images/Donezo.png";
import Project from "./project.js";
import UIHelpers from "./ui-helpers.js";
import addIcon from "../images/add.svg";

const Sidebar = (function () {

    const createSidebar = () => {
        const sidebar = document.createElement("div");
        sidebar.classList.add("sidebar");

        sidebar.appendChild(createLogoSection());
        sidebar.appendChild(createProjectsSection());

        return sidebar;
    }

    const createLogoSection = () => {
        const logo = document.createElement("div");
        logo.classList.add("logo");
        const logoImage = document.createElement("img");
        logoImage.src = donezo
        logo.appendChild(logoImage);

        return logo;
    };

    const createProjectsSection = () => {
        // Project Section Header
        const projectsSection = document.createElement("div");
        projectsSection.classList.add("projects");

        projectsSection.appendChild(createProjectsHeader());
        projectsSection.appendChild(Project.createProjectsContainer());

        return projectsSection;
    };

    const createProjectsHeader = () => {
        const projectsHeaderContainer = document.createElement("div");
        projectsHeaderContainer.classList.add("projects-header");

        const projectsHeader = document.createElement("span");
        projectsHeader.textContent = "Projects";

        // Add Button
        const addButton = UIHelpers.createButtonWithIcon(addIcon, "add-btn", Project.handleAddClick);

        // Buttons Container
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("btn-container");
        buttonContainer.appendChild(addButton);

        projectsHeaderContainer.appendChild(projectsHeader);
        projectsHeaderContainer.appendChild(buttonContainer);

        return projectsHeaderContainer;
    };

    return { createSidebar };
})();

export default Sidebar;
