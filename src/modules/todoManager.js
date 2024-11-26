import createTodo from "./todoFactory.js";
import projectManager from "./projectManager.js";

const todoManager = (function () {
    
    const addTodo = (project, title, description=null, dueDate=null, priority=null) => {
        const todo = createTodo(title, description, dueDate, priority);
        projectManager.addTodoToProject(project, todo);

        return todo;
    };

    return { addTodo }
})();

export default todoManager;
