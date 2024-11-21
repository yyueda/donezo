import createProject from "./projectFactory.js";
import createTodo from "./todoFactory.js";

const localStorageManager = (function () {
    const addProjectsToLocalStorage = (projects) => {
        const serialisedProjects = projects.map(project => project.toJSON());
        localStorage.setItem("projects", JSON.stringify(serialisedProjects));
    };

    const loadProjectsFromLocalStorage = () => {
        const projectsData = JSON.parse(localStorage.getItem("projects"));

        if (!projectsData) {
            const choresProject = createProject("chores");
            const cleanTodo = createTodo({
                title: "Clean Up",
                description: "Make the bed and clean the toilet",
                dueDate: "2024-11-20",
                priority: 1,
            });
            choresProject.addTodo(cleanTodo);

            const defaultProjects = [choresProject];
            addProjectsToLocalStorage(defaultProjects);

            return defaultProjects
        }

        return projectsData.map(projectData => {
            const project = createProject(projectData.name);
            projectData.listOfTodos.forEach(todoData => {
                const todo = createTodo(
                    todoData.title,
                    todoData.description,
                    todoData.dueDate,
                    todoData.priority
                );
                project.addTodo(todo);
            });

            return project;
        });
    }

    return { addProjectsToLocalStorage, loadProjectsFromLocalStorage };
})();

export default localStorageManager;
