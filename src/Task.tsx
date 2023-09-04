import React, {ChangeEvent, MouseEvent, FC} from "react";
import {TaskType} from "./App";

type TaskPropsType = {
    removeTask: (taskId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void
} & TaskType

const Task: FC<TaskPropsType> = (
    {
        id,
        title,
        isDone,
        removeTask,
        changeTaskStatus
    }) => {
    const onClickRemoveTaskHandler = () => removeTask(id);
    const onChangeAlterStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(id, e.currentTarget.checked)
    }
    return (
        <li key={id} className={isDone ? 'task-done' : 'task'}>
            <input type="checkbox" checked={isDone} onChange={onChangeAlterStatusHandler}/>
            <span>{title}</span>
            <button onClick={onClickRemoveTaskHandler}>&times;</button>
        </li>
    )
}
export default Task;