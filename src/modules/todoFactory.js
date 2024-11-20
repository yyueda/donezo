function createTodo({ title, description, dueDate, priority }) {
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;

    const getTitle = () => _title;
    const getDescription = () => _description;
    const getDueDate = () => _dueDate;
    const getPriority = () => _priority;

    const setTitle = (title) => {
        _title = title;
        return _title;
    };

    const setDescription = (description) => {
        _description = description;
        return _description;
    };
    const setDueDate = (dueDate) => {
        _dueDate = dueDate;
        return _dueDate;
    };
    const setPriority = (priority) => {
        _priority = priority;
        return _priority;
    };


    return { getTitle, getDescription, getDueDate, getPriority, setTitle, setDescription, setDueDate, setPriority };
}

export default createTodo;
