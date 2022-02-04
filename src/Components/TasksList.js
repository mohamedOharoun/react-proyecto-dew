import {useState, useEffect} from 'react';

export const TasksList = (token) => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        const tasks = await fetch('http://localhost:3030/api/v1/tasks', {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWY2Y2Y2MjQ5ZGYzOGY0OGI0ODNmZjYiLCJuYW1lIjoiVXNlciA1IiwiaWF0IjoxNjQzNTY3MDY1LCJleHAiOjE2NDYxNTkwNjV9._fD8BVug_dBIunfkKNKx5mglbLqG5_32SgNUCB-ceOs'
                })
            })
            .then(res => res.json())
            .then(res => res.tasks);
        setTasks(tasks);
    };

    useEffect(() => {
        getTasks();
    }, []);

    return <div className="col-5">
    {tasks.map((task) => {
        return(
            <article key={task._id} className="card">
                <div className="d-flex flex-column card-body">
                    <div className="d-flex justify-content-between">
                        <h4 className="align-self-start">{task.name}</h4>

                        <div className={"align-self-end btn btn-"+ (task.completed ? 'success' : 'primary')}>{task.completed ? 'done' : 'completed'}</div>
                    </div>
                    

                    <div>{task.content}</div>

                    
    
               <div className="d-flex justify-content-between">
                    <button className="btn btn-primary align-self-start">Edit</button>
                    <button className="btn btn-danger align-self-end">Delete</button> 
               </div>
                </div>
               
            </article>
        );
    })}
    </div>
}

export default TasksList;