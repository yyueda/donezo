import createProject from "./projectFactory.js";
import createTodo from "./todoFactory.js";

const localStorageManager = (function () {
    const updateProjectsInLocalStorage = (projects) => {
        const serialisedProjects = projects.map(project => project.toJSON());
        localStorage.setItem("projects", JSON.stringify(serialisedProjects));
    };

    const loadProjectsFromLocalStorage = () => {
        const projectsData = JSON.parse(localStorage.getItem("projects"));

        if (!projectsData) {
            const choresProject = createProject("chores");
            const cleanTodo = createTodo(
                "Clean Up",
                "Make the bed and clean the toilet",
                "2024-11-20",
                "low",
            );
            choresProject.addTodo(cleanTodo);

            const defaultProjects = [choresProject];
            updateProjectsInLocalStorage(defaultProjects);

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

    return { updateProjectsInLocalStorage, loadProjectsFromLocalStorage };
})();

export default localStorageManager;
