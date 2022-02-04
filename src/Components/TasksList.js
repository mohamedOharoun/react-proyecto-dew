import React, {useState, useEffect} from 'react';
import {TaskItem} from './TaskItem';
import {TaskItemEdit} from './TaskItemEdit.js';

export const taskContext = React.createContext();

export const TasksList = (token) => {
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);
    const [change] = useState(false);

    const getTasks = async () => {
        const tasks = await fetch('http://localhost:3030/api/v1/tasks', {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWY2Y2Y2MjQ5ZGYzOGY0OGI0ODNmZjYiLCJuYW1lIjoiVXNlciA1IiwiaWF0IjoxNjQzNTY3MDY1LCJleHAiOjE2NDYxNTkwNjV9._fD8BVug_dBIunfkKNKx5mglbLqG5_32SgNUCB-ceOs'
                })
            })
            .then(res => res.json())
            .then(res => res.tasks);
        setTasks(tasks);
    };

    useEffect(() => {
        getTasks();
        setEdit(false);
    }, [edit]);

    const setChangeCompleted = (completed) => {
        setEdit(completed);
    }

    return (
        <div className="col-lg-6 mt-3">
        {tasks.map((task, index) => {
            return(
                <>
                    {!change && <TaskItem key={index + 'item'} task={task} index={index} setEdit={setChangeCompleted}/>}
                    {change && <TaskItemEdit key={index + 'itemEdit'} task={task} index={index} setEdit={setChangeCompleted}/>}
                </>
            );
        })}
        </div>
    )
}

export default TasksList;