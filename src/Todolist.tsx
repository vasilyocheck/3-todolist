import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";
import Task from "./Task";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (nextFilter: FilterValuesType, todolistId: string) => void
    changeTaskStatus:(taskId: string, isDone: boolean, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    todolistId: string
};

const TodoList: React.FC<TodoListPropsType> = ({
    todolistId,
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    removeTodolist
}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [emptyValueError, setEmptyValueError] = useState(false)
    const isAddTaskPossible = Boolean(newTaskTitle)
    const tasksComponents: JSX.Element = tasks.length
        ? <ul>
            {tasks.map((t) => {
                const removeTaskCallback = (taskId: string) => removeTask(taskId, todolistId);
                const changeTaskStatusCallback = (isDone: boolean) => changeTaskStatus(t.id, isDone, todolistId);
                return (
                    <Task
                        key={t.id}
                        {...t}
                        removeTask={removeTaskCallback}
                        changeTaskStatus={changeTaskStatusCallback}
                    />
                );
            })}
        </ul>
        : <span>Your taskslist is empty</span>

    const changeFilterOnClickHandlerCreator =
        (nextFilter: FilterValuesType): (() => void) => () => changeFilter(nextFilter, todolistId);

    const onClickAddTaskHandler = () => {
        if (isAddTaskPossible) {
            const trimmedTitle = newTaskTitle.trim()
            if(trimmedTitle){
                addTask(trimmedTitle, todolistId)
            } else {
                setEmptyValueError(true)
            }
            setNewTaskTitle("")
        } 
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(!newTaskTitle.trim()){
            setEmptyValueError(true)
        } else {
            emptyValueError && setEmptyValueError(false)
        }
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddTaskHandler()
    }
    const onClickRemoveTodolistHandler = () => {
        removeTodolist(todolistId);
    }
    
    return (
        <div className="todolist">
            <h3>{title}<button onClick={onClickRemoveTodolistHandler}>x</button></h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeSetLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={emptyValueError ? "empty-value-error" : "" }
                />
                <button
                    disabled={!isAddTaskPossible}
                    onClick={onClickAddTaskHandler}>+</button>
               <div style={{color: emptyValueError ? "red" : "black"}}>Please, enter title</div>
            </div>
            {tasksComponents}
            <div>
                <button
                    className={filter === "all" ? "btn-filter-active" : "btn-filter"}
                    onClick={() => changeFilter("all", todolistId)}>
                    All
                </button>
                <button
                    className={filter === "active" ? "btn-filter-active" : "btn-filter"}
                    onClick={changeFilterOnClickHandlerCreator("active")}>
                    Active
                </button>
                <button
                    className={filter === "completed" ? "btn-filter-active" : "btn-filter"}
                    onClick={changeFilterOnClickHandlerCreator("completed")}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
