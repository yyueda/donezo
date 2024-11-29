import UIHelpers from "./ui-helpers.js";
import projectManager from "../services/projectManager.js";
import deleteIcon from "../images/bin.svg";
import Todo from "./todo.js";

const Project = (function () {
    
    const createProjectsContainer = () => {
        const container = document.createElement("div");
        container.classList.add("projects-container");

        const projects = projectManager.getProjects();
        projects.forEach((project) => {
            container.appendChild(createProjectItem(project));
        });

        return container;
    };

    const createProjectItem = (project) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project-item");
        projectElement.dataset.id = project.getId();

        const name = document.createElement("span");
        name.textContent = `# ${project.getName()}`;
        projectElement.appendChild(name);

        const deleteButton = UIHelpers.createButtonWithIcon(deleteIcon, "delete-btn", (e) => {
            e.stopPropagation();

            handleDeleteClick(project.getId());
        });
        projectElement.appendChild(deleteButton);

        projectElement.addEventListener("click", () => {
            Todo.loadTodosForProject(project);
        });

        return projectElement;
    };

    const handleAddClick = () => {
        const project = projectManager.addProject("New Project");
        const container = document.querySelector(".projects-container");
        container.appendChild(createProjectItem(project));
    };

    const handleDeleteClick = (id) => {
        projectManager.deleteProject(id);
        const projectElement = document.querySelector(`[data-id="${id}"]`);
        if (projectElement) {
            projectElement.remove();
            const content = document.querySelector(".content");
            console.log(content);
            content.innerHTML = "";
        }
    };

    return { createProjectsContainer, handleAddClick, createProjectItem };
})();

export default Project;
