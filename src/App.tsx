import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';



export type FilterValuesType = "all" | "active" | "completed";

type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TodolistsTasksType = {
    [key: string]: TaskType[]
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TodolistsTasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(id: string, todolistId: string) {
        let filteredTasks = tasks[todolistId].filter(t => t.id !== id);
        tasks[todolistId] = filteredTasks;
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks[todolistId]];
        tasks[todolistId] = newTasks;
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let task = tasks[todolistId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        let changedTodolist = todolists.find(tl => tl.id === todolistId);
        if(changedTodolist) {
            changedTodolist.filter = value;
            setTodolists([...todolists]);
        }
    }


    return (
        <div className="App">
            {todolists.map(todolist => {
                let tasksForTodolist = tasks[todolist.id];

                if (todolist.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (todolist.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={todolist.id}
                        title={todolist.title}
                        todolistId={todolist.id}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={todolist.filter}/>
                );
            })}

            {/*<Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />*/}
        </div>
    );
}

export default App;