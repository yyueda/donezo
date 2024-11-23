import { v4 as uuidv4 } from "uuid";

function createProject(name) {
    let _name = name;
    let _id = uuidv4();
    let _listOfTodos = [];

    const getId = () => _id;

    const getName = () => _name;

    const setName = (name) => {
        _name = name;
        return _name;
    }

    const addTodo = (todo) => {
        _listOfTodos.push(todo);
    }

    const getListOfTodos = () => [..._listOfTodos];

    const toJSON = () => ({
        name: _name,
        listOfTodos: _listOfTodos.map(todo => todo.toJSON())
    });

    return { getId, getName, setName, addTodo, getListOfTodos, toJSON }
}

export default createProject;
