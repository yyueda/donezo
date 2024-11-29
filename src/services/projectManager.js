import { format } from "date-fns";
import localStorageManager from "./localStorageManager.js";
import createProject from "../factories/projectFactory.js";
import createTodo from "../factories/todoFactory.js";

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
        const formattedDate = dueDate ? format(dueDate, "dd/MM/yyyy") : "";
        const todo = createTodo(title, description, formattedDate, priority);
        project.addTodo(todo);
        localStorageManager.updateProjectsInLocalStorage(projects);

        return todo;
    };

    const deleteTodo = (project, todo) => {
        project.deleteTodo(todo);
        localStorageManager.updateProjectsInLocalStorage(projects);
    };

    return { loadProjects, getProjects, addProject, deleteProject, addTodoToProject, deleteTodo };
})();

export default projectManager;
