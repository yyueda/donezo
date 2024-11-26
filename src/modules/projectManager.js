import localStorageManager from "./localStorageManager.js";
import createProject from "./projectFactory.js";
import createTodo from "./todoFactory.js";

const projectManager = (function () {
    let projects = [];

    const loadProjects = () => {
        projects = localStorageManager.loadProjectsFromLocalStorage();
    };

    const getProjects = () => [...projects];

    const addProject = (name) => {
        const project = createProject(name);
        projects.push(project);
        localStorageManager.updateProjectsInLocalStorage(projects);

        return project;
    };

    const deleteProject = (id) => {
        projects = projects.filter((project) => {
            return project.getId() !== id;
        });

        localStorageManager.updateProjectsInLocalStorage(projects);
    };

    const addTodoToProject = (project, title, description, dueDate, priority) => {
        const todo = createTodo(title, description, dueDate, priority);
        project.addTodo(todo);
        localStorageManager.updateProjectsInLocalStorage(projects);

        return todo;
    };

    return { loadProjects, getProjects, addProject, deleteProject, addTodoToProject };
})();

export default projectManager;
