import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title:string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            addNewTask();
        }
    }
    const addNewTask = () => {
        props.addTask(title);
        setTitle('');
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedHandler = () => {
        props.changeFilter("completed")
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addNewTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id);
                    }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    );
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>
                All
            </button>
            <button onClick={onActiveHandler}>
                Active
            </button>
            <button onClick={onCompletedHandler}>
                Completed
            </button>
        </div>
    </div>
}