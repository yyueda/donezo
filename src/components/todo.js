import projectManager from "../services/projectManager";

const Todo = (function () {
    let projectContent;
    let todosContainer;

    const loadTodosForProject = (project) => {
        const content = document.querySelector(".content");
        content.innerHTML = ""; // Clear existing content

        projectContent = document.createElement("div");
        projectContent.classList.add("project-content");
        content.appendChild(projectContent);

        // Project Name Header
        const projectName = document.createElement("h1");
        projectName.textContent = project.getName();
        projectName.addEventListener("click", () => {
            handleProjectNameClick(project, projectContent, projectName);
        });
        projectContent.appendChild(projectName);

        // Create Task Button
        projectContent.appendChild(createAddTaskButton(project));

        todosContainer = document.createElement("div");
        todosContainer.classList.add("todo-container");

        project.getListOfTodos().forEach((todo) => {
            todosContainer.appendChild(createTodoItem(todo, project));
        });

        projectContent.appendChild(todosContainer);
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
        todoForm.autocomplete = "off";
        todoForm.classList.add("todo-form");
        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");

        // Task Name
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.id = "taskName";
        titleInput.name = "taskName";
        titleInput.placeholder = "Task Name";
        titleInput.required = true;

        // Description
        const descriptionInput = document.createElement("textarea");
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

            if (option.value === "high") {
                option.classList.add("high");
            } else if (option.value === "medium") {
                option.classList.add("medium");
            }

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
            todosContainer.appendChild(createTodoItem(todo, project));
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

        titleInput.addEventListener("input", toggleCreateButton)

        return todoForm;
    };

    const createTodoItem = (todo, project) => {
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
        const dateSvg = `
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> 
                    <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#000000"></rect> 
                    <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#000000"></rect> 
                    <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#000000"></rect> 
                </g>
            </svg>
        `;
        const dateSvgContainer = document.createElement("div");
        dateSvgContainer.classList.add("date-icon");
        dateSvgContainer.innerHTML = dateSvg;
        const dateText = document.createTextNode(`Due on: ${todo.getDueDate()}`);

        todoDueDate.classList.add("due-date");
        todoDueDate.appendChild(dateSvgContainer);
        todoDueDate.appendChild(dateText);

        // Todo Priority
        if (todo.getPriority() == "high") {
            todoButton.classList.add("high-priority");
        } else if (todo.getPriority() == "medium") {
            todoButton.classList.add("medium-priority");
        }

        todoContent.appendChild(todoTitle);
        todoContent.appendChild(todoDesc);
        todoContent.appendChild(todoDueDate);
        // todoContent.appendChild(todoPriority);

        todoDiv.appendChild(todoButton);
        todoDiv.appendChild(todoContent);

        return todoDiv;
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

    return { loadTodosForProject };
})();

export default Todo;
