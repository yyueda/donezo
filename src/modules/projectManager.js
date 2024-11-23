import localStorageManager from "./localStorage.js";
import createProject from "./projectFactory.js";

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

    return { loadProjects, getProjects, addProject };
})();

export default projectManager;
