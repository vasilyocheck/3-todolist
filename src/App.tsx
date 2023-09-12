import React, { useState } from 'react';
import './App.css';
import TodoList from './Todolist';


//CRUD

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all"|"active"|"completed"

export type TodolistType = {
    todolistId: string
    todolistTitle: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App(): JSX.Element {
    // BLL:
    const todolistId_1 = crypto.randomUUID();
    const todolistId_2 = crypto.randomUUID();
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {todolistId: todolistId_1, todolistTitle: 'What to learn', filter: 'all'},
        {todolistId: todolistId_2, todolistTitle: 'What to buy', filter: 'all'}
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'ReactJS', isDone: false},

        ],
        [todolistId_2]: [
            {id: crypto.randomUUID(), title: 'Bread', isDone: true},
            {id: crypto.randomUUID(), title: 'Milk', isDone: false},
            {id: crypto.randomUUID(), title: 'Coffee', isDone: false},
        ]
    })


    const removeTask = (taskId: string, todolistId: string): void => {
       /* const taskToRemove = tasks[todolistId];
        const filteredTasks = taskToRemove.filter(t => t.id !== taskId);
        const copyTasks = {...tasks}
        copyTasks[todolistId] = filteredTasks;
        setTasks(copyTasks)*/
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
    }  // D
    const addTask = (taskTitle: string, todolistId: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title: taskTitle,
            isDone: false
        }
        //const nextTasks = [...tasks[todolistId], newTask];
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]});
    }  // C
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {

        setTasks({...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)});
    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks({...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)});

    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.todolistId !== todolistId))
        delete tasks[todolistId];
    }
    const getTasksForRender = (allTasks: Array<TaskType>, nextFilter: FilterValuesType): Array<TaskType> => {
        switch (nextFilter) {
            case "active":
                return allTasks.filter(t => t.isDone === false)
            case "completed":
                return allTasks.filter(t => t.isDone === true)
            default:
                return allTasks
        }
    }
    const changeTodolistFilter = (nextFilter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.todolistId === todolistId ? {...tl, filter: nextFilter} : tl));
    }
    // UI:

    const todolistComponents: Array<JSX.Element> = todolists.map(tl => {
        const tasksForRender: Array<TaskType> = getTasksForRender(tasks[tl.todolistId], tl.filter)
        return(
            <TodoList
                key={tl.todolistId}
                todolistId={tl.todolistId}
                filter={tl.filter}
                title={tl.todolistTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeTodolistFilter}
                changeTaskStatus={changeTaskStatus}
                addTask={addTask}
                removeTodolist={removeTodolist}
            />
        );
    })




    return (
        <div className="App">
            {todolistComponents}
        </div>
    );
}

export default App;
