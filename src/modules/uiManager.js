import projectManager from "./projectManager.js";
import addIcon from "../images/add.svg";
import deleteIcon from "../images/bin.svg";

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
        buttonsContainer.classList.add("btn-container");
        buttonsContainer.appendChild(addButton);

        const projectsHeaderContainer = document.createElement("div");
        projectsHeaderContainer.classList.add("projects-header");
        projectsHeaderContainer.appendChild(projectsHeader);
        projectsHeaderContainer.appendChild(buttonsContainer);

        return projectsHeaderContainer;
    };

    const createProjectItem = (project) => {
        const projectElement = document.createElement("div");
        const projectName = document.createElement("span");
        projectName.textContent = `# ${project.getName()}`;
        projectElement.setAttribute("data-id", project.getId());
        projectElement.classList.add("project-item");

        projectElement.addEventListener("click", (e) => {
            handleProjectElementClick(project);
        });

        // Delete Button
        const deleteButton = createButtonWithIcon(deleteIcon, "delete-btn", () => handleDeleteClick(project.getId()));

        projectElement.appendChild(projectName);
        projectElement.appendChild(deleteButton)

        return projectElement;
    };

    const createProjectContent = (project) => {
        const projectContent = document.createElement("div");
        const projectName = document.createElement("h1");

        projectName.textContent = project.getName();
        projectName.addEventListener("click", () => {
            handleProjectNameClick(project, projectContent, projectName);
        });

        projectContent.classList.add("project-content");
        projectContent.appendChild(projectName);
        projectContent.appendChild(createAddTaskButton());

        return projectContent;
    };

    const createButtonWithIcon = (iconSrc, className, onClick) => {
        const buttonIcon = document.createElement("img");
        buttonIcon.classList.add(className);
        buttonIcon.src = iconSrc;
        buttonIcon.addEventListener("click", onClick);
        return buttonIcon;
    };

    const createAddTaskButton = () => {
        const addTaskButton = document.createElement("button");
        const buttonText = document.createTextNode("Create Task");

        addTaskButton.innerHTML = `
            <svg fill="currentColor" width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
            </g>
            <g id="SVGRepo_iconCarrier">
            <path d="M9,17h6v6a1,1,0,0,0,2,0V17h6a1,1,0,0,0,0-2H17V9a1,1,0,0,0-2,0v6H9a1,1,0,0,0,0,2Z"></path>
            </g>
            </svg>
        `;
        addTaskButton.appendChild(buttonText);
        addTaskButton.classList.add("create-task-btn");

        addTaskButton.addEventListener("click", () => {
            const projectContentContainer = document.querySelector(".project-content");
            projectContentContainer.appendChild(createTodoForm());
        });

        return addTaskButton;
    };

    const createTodoForm = () => {
        const todoForm = document.createElement("form");
        todoForm.classList.add("todo-form");

        // Task Name
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "taskName";
        nameInput.name = "taskName";
        nameInput.placeholder = "Task Name";
        nameInput.required = true;

        // Description
        const descriptionInput = document.createElement("input");
        descriptionInput.type = "text";
        descriptionInput.id = "taskDescription";
        descriptionInput.name = "taskDescription";
        descriptionInput.placeholder = "Description";

        // Due Date
        const dueDateLabel = document.createElement("label");
        dueDateLabel.setAttribute("for", "dueDate");
        dueDateLabel.textContent = "Due Date:";

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        dueDateInput.id = "dueDate";
        dueDateInput.name = "dueDate";

        const dueDateContainer = document.createElement("div");
        dueDateContainer.appendChild(dueDateLabel);
        dueDateContainer.appendChild(dueDateInput);

        // Dropdown to select priority
        const priorityLabel = document.createElement("label");
        priorityLabel.setAttribute("for", "priority");
        priorityLabel.textContent = "Priority:"

        const priorityInput = document.createElement("select");
        priorityInput.id = "priority";
        priorityInput.name = "priority";

        const options = [
            { value: "low", text: "Low Priority" },
            { value: "medium", text: "Medium Priority" },
            { value: "high", text: "High Priority" }
        ];

        options.forEach(optionData => {
            const option = document.createElement("option");
            option.value = optionData.value;
            option.textContent = optionData.text;
            priorityInput.appendChild(option);
        });


        const priorityContainer = document.createElement("div");
        priorityContainer.appendChild(priorityLabel);
        priorityContainer.appendChild(priorityInput);

        // Form Buttons
        const buttonContainer = document.createElement("div");
        const cancelButton = document.createElement("button");
        const createButton = document.createElement("button");

        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("cancel-btn");
        createButton.textContent = "Add Task";
        createButton.classList.add("add-task-btn");
        buttonContainer.classList.add("form-btn-container");

        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(createButton);

        todoForm.appendChild(nameInput);
        todoForm.appendChild(descriptionInput);
        todoForm.appendChild(dueDateContainer);
        todoForm.appendChild(priorityContainer);
        todoForm.appendChild(buttonContainer);

        return todoForm;
    };

    const handleProjectElementClick = (project) => {
        const projectContent = createProjectContent(project);
        const contentContainer = document.querySelector(".content");

        contentContainer.innerHTML = "";
        contentContainer.appendChild(projectContent);
    };

    const handleAddClick = () => {
        const project = projectManager.addProject("New Project");
        const projectElement = createProjectItem(project);
        projectsContainer.appendChild(projectElement);
    };

    const handleDeleteClick = (id) => {
        projectManager.deleteProject(id);

        const projectElement = document.querySelector(`[data-id="${id}"]`);
        if (projectElement) {
            projectElement.remove();
        }
    };

    const handleProjectNameClick = (project, projectContentElement, projectHeaderElement) => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = project.getName();
        input.classList.add("project-name-input");

        projectContentElement.replaceChild(input, projectHeaderElement);
        input.focus();

        input.addEventListener("blur", () => {
            const newName = input.value.trim();
            if (newName) {
                project.setName(newName);
                projectHeaderElement.textContent = newName;
                const projectElement = document.querySelector(`[data-id="${project.getId()}"]`);
                projectElement.textContent = `# ${newName}`;
            }
            projectContentElement.replaceChild(projectHeaderElement, input)
        });
    };

    return { initialiseUI };
})();

export default UI;
