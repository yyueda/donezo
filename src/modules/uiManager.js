import projectManager from "./projectManager.js";
import addIcon from "../images/add.svg";
import deleteIcon from "../images/bin.svg";

const UI = (function () {
    let projectsContainer;
    let projectContent;
    let todoContainer;
    
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
        projectElement.dataset.id = project.getId();
        projectElement.classList.add("project-item");

        projectElement.addEventListener("click", (e) => {
            handleProjectElementClick(project);
        });

        // Delete Button
        const deleteButton = createButtonWithIcon(deleteIcon, "delete-btn", () => handleDeleteClick(project.getId())); //change to projects

        projectElement.appendChild(projectName);
        projectElement.appendChild(deleteButton)

        return projectElement;
    };

    const createProjectContent = (project) => {
        projectContent = document.createElement("div");
        const projectName = document.createElement("h1");
        todoContainer = createTodoContent(project);

        projectName.textContent = project.getName();
        projectName.addEventListener("click", () => {
            handleProjectNameClick(project, projectContent, projectName);
        });

        projectContent.classList.add("project-content");
        projectContent.appendChild(projectName);
        projectContent.appendChild(createAddTaskButton(project));
        projectContent.appendChild(todoContainer);

        return projectContent;
    };

    const createButtonWithIcon = (iconSrc, className, onClick) => {
        const buttonIcon = document.createElement("img");
        buttonIcon.classList.add(className);
        buttonIcon.src = iconSrc;
        buttonIcon.addEventListener("click", onClick);
        return buttonIcon;
    };

    const createAddTaskButton = (project) => {
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
            projectContent.replaceChild(createTodoForm(project), addTaskButton);
        });

        return addTaskButton;
    };

    const createTodoForm = (project) => {
        const todoForm = document.createElement("form");
        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");
        todoForm.classList.add("todo-form");

        // Task Name
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.id = "taskName";
        titleInput.name = "taskName";
        titleInput.placeholder = "Task Name";
        titleInput.required = true;

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

        // Container for due date and priority inputs
        const secInputContainer = document.createElement("div");
        secInputContainer.appendChild(dueDateContainer);
        secInputContainer.appendChild(priorityContainer);
        secInputContainer.classList.add("sec-input-container");

        // Form Buttons
        const buttonContainer = document.createElement("div");
        const cancelButton = document.createElement("button");
        const createButton = document.createElement("button");

        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("cancel-btn");
        cancelButton.addEventListener("click", (e) => {
            e.preventDefault();

            projectContent.replaceChild(createAddTaskButton(project), todoForm);
        });

        createButton.textContent = "Add Task";
        createButton.disabled = true;
        createButton.classList.add("add-task-btn");
        createButton.addEventListener("click", (e) => {
            e.preventDefault();

            // Form Values
            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();
            const dueDate = dueDateInput.value.trim();
            const priority = priorityInput.value.trim();

            const todo = projectManager.addTodoToProject(project, title, description, dueDate, priority);
            todoContainer.appendChild(createTodoDiv(project, todo));
            projectContent.replaceChild(createAddTaskButton(project), todoForm);
        });

        buttonContainer.classList.add("form-btn-container");
        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(createButton);

        // Appending to parent containers
        inputContainer.appendChild(titleInput);
        inputContainer.appendChild(descriptionInput);
        inputContainer.appendChild(secInputContainer);
        todoForm.appendChild(inputContainer);
        todoForm.appendChild(buttonContainer);

        // Disable create button when name field has nothing
        const toggleCreateButton = () => {
            if (titleInput.value.trim() !== "") {
                createButton.disabled = false;
            } else {
                createButton.disabled = true;
            }
        }

        titleInput.addEventListener("input", toggleCreateButton);

        return todoForm;
    };

    const createTodoContent = (project) => {
        const todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");
        renderTodosInProject(project, todoContainer);

        return todoContainer;
    };
    
    const renderTodosInProject = (project, todoContainer) => {
        const listOfTodos = project.getListOfTodos();
        
        listOfTodos.forEach((todo) => {
            todoContainer.appendChild(createTodoDiv(project, todo));
        });
    };

    const createTodoDiv = (project, todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo")
        const todoContent = document.createElement("div");
        todoContent.classList.add("todo-content");
        
        // Todo Checkbox
        const todoButton = document.createElement("button");
        todoButton.classList.add("todo-button");
        const buttonBorder = document.createElement("span");
        const svgElement = `
            <svg width="20px" height="20px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
                </g>
            </svg>
        `;
        todoButton.appendChild(buttonBorder);
        todoButton.addEventListener("click", (e) => {
            e.preventDefault();

            projectManager.deleteTodo(project, todo);
            todoDiv.remove();
        });

        todoButton.addEventListener("mouseenter", () => {
            buttonBorder.innerHTML = svgElement;
        });

        todoButton.addEventListener("mouseleave", () => {
            buttonBorder.innerHTML = "";
        });

        // Todo Title
        const todoTitle = document.createElement("h3");
        todoTitle.textContent = todo.getTitle();

        // Todo Description
        const todoDesc = document.createElement("p");
        todoDesc.textContent = todo.getDescription();

        // Todo Due Date
        const todoDueDate = document.createElement("div");
        todoDueDate.textContent = todo.getDueDate();

        // Todo Priority
        const todoPriority = document.createElement("div");
        todoPriority.textContent = todo.getPriority();

        todoContent.appendChild(todoTitle);
        todoContent.appendChild(todoDesc);
        todoContent.appendChild(todoDueDate);
        todoContent.appendChild(todoPriority);

        todoDiv.dataset.id = todo.getId();
        todoDiv.appendChild(todoButton);
        todoDiv.appendChild(todoContent);

        return todoDiv;
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
