import createTodo from "./todoFactory.js";
import projectManager from "./projectManager.js";

const todoManager = (function () {
    
    const addTodo = (project, title, description, dueDate, priority) => {
        const todo = createTodo(title, description, dueDate, priority);
        projectManager.addTodoToProject(project, todo);
    };
})();

export default todoManager;
