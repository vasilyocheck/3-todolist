import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';


//CRUD

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all"|"active"|"completed"

function App() {
    // BLL:
    const todoListTitle = "What to learn"
   
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: crypto.randomUUID(), title: "HTML", isDone: true},
        {id: crypto.randomUUID(), title: "JS/TS", isDone: true},
        {id: crypto.randomUUID(), title: "REACT", isDone: false},
    ])  
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskId: string): void => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }
    const addTask = (taskTitle: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title: taskTitle,
            isDone: false
        }
        setTasks([...tasks, newTask])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t));
    }
    const changeTaskTitle = () => {

    }

    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }
    // UI:
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
    const tasksForRender: Array<TaskType> = getTasksForRender(tasks, filter)
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
