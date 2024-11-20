function createProject({ name }) {
    let _name = name;
    let _listOfTodos = [];

    const getName = () => _name;

    const setName = (name) => {
        _name = name;
        return _name;
    }

    const addTodo = (todo) => {
        _listOfTodos.push(todo);
    }

    const getListOfTodos = () => [..._listOfTodos];

    return { getName, setName }
}

export default createProject;
