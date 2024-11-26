import { v4 as uuidv4 } from "uuid";

function createTodo(title, description, dueDate, priority) {
    let _id = uuidv4();
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;

    const getId = () => _id;

    const getTitle = () => _title;
    const setTitle = (title) => _title = title

    const getDescription = () => _description;
    const setDescription = (description) => _description = description;

    const getDueDate = () => _dueDate;
    const setDueDate = (dueDate) => _dueDate = dueDate;
    
    const getPriority = () => _priority;
    const setPriority = (priority) => _priority = priority;

    const toJSON = () => ({
        title: _title,
        description: _description,
        dueDate: _dueDate,
        priority: _priority
    });

    return { getId, getTitle, getDescription, getDueDate, getPriority, setTitle, setDescription, setDueDate, setPriority, toJSON };
}

export default createTodo;
