import React, {useState, useEffect} from 'react';
import {TaskItem} from './TaskItem';

export const TasksList = (item) => {
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const myStorage = window.localStorage;

        const getTasks = async () => {
            const tasks = await fetch('http://localhost:3030/api/v1/tasks', {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + myStorage.getItem('token')
                    })
                })
                .then(res => res.json())
                .then(res => res.tasks);
    
            setTasks(tasks);
        };

        getTasks();
        setEdit(false);
    }, [edit, item]);

    const setChangeCompleted = (completed) => {
        setEdit(completed);
    }

    return (
        <div className="col-lg-5 mt-3">
        {tasks.map((task, index) => {
            return(
                <>
                    <TaskItem key={index.toString() + "tasksList"} task={task} index={index} setEdit={setChangeCompleted}/>
                </>
            );
        })}
        </div>
    )
}

export default TasksList;