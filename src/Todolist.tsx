import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";
import Task from "./Task";

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void;
    changeFilter: (nextFilter: FilterValuesType) => void;
    addTask: (taskTitle: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
};

const TodoList: React.FC<TodoListPropsType> = ({
    title,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    filter
}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<false | string>(false);
    const isAddTaskPossible = !!newTaskTitle
    const tasksComponents: JSX.Element = tasks.length
        ? <ul>
            {tasks.map((t) => <Task
                {...t}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
            />)}
        </ul>
        : <span>Your taskslist is empty</span>

    const changeFilterOnClickHandlerCreator =
        (nextFilter: FilterValuesType): (() => void) => () => changeFilter(nextFilter);

    const onClickAddtaskHandler = () => {
        if (isAddTaskPossible) {
            const trimmedTitle = newTaskTitle.trim();
            if(trimmedTitle) {
                addTask(trimmedTitle)
            } else {
                setError('empty input is not allowed');
            }
            setNewTaskTitle("")
        } 
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {

        error && setError(false);
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(!newTaskTitle && e.code === 'Space') {
            setError('Fuck!')
        }
        console.log(e.code);
        e.key === "Enter" && onClickAddtaskHandler()
    }
    
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input className={error ? 'empty-input-error' : ''}
                    value={newTaskTitle}
                    onChange={onChangeSetLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                />
                <button
                    disabled={!isAddTaskPossible}
                    onClick={onClickAddtaskHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            {tasksComponents}
            <div>
                <button onClick={() => changeFilter("all")} className={filter === 'all' ? 'active-button' : ''}>All</button>
                <button onClick={changeFilterOnClickHandlerCreator("active")} className={filter === 'active' ? 'active-button' : ''}>
                    Active
                </button>
                <button onClick={changeFilterOnClickHandlerCreator("completed")} className={filter === 'completed' ? 'active-button' : ''}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
