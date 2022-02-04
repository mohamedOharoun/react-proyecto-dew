import {useState, useEffect} from 'react';

export const TasksList = (token) => {
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);

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
        setEdit(false);
    }, [edit]);

    const changeCompleted = async (completed, index, id) => {
        const url = 'http://localhost:3030/api/v1/tasks/' + id;

        const postHeaders = new Headers();
        postHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWY2Y2Y2MjQ5ZGYzOGY0OGI0ODNmZjYiLCJuYW1lIjoiVXNlciA1IiwiaWF0IjoxNjQzNTY3MDY1LCJleHAiOjE2NDYxNTkwNjV9._fD8BVug_dBIunfkKNKx5mglbLqG5_32SgNUCB-ceOs');
        postHeaders.append('Content-type', 'application/json');

        const data = {
            "name": document.getElementById('name' + index).textContent,
            "content": document.getElementById('content' + index).textContent,
            "completed": !completed
        }
        
        await fetch(url, {
                method: 'PATCH',
                headers: postHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
        }).then(setEdit(true));
    };

    const deleteComponent = async (id) => {
        const url = 'http://localhost:3030/api/v1/tasks/' + id;

        const postHeaders = new Headers();
        postHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWY2Y2Y2MjQ5ZGYzOGY0OGI0ODNmZjYiLCJuYW1lIjoiVXNlciA1IiwiaWF0IjoxNjQzNTY3MDY1LCJleHAiOjE2NDYxNTkwNjV9._fD8BVug_dBIunfkKNKx5mglbLqG5_32SgNUCB-ceOs');
        
        await fetch(url, {
                method: 'DELETE',
                headers: postHeaders,
                redirect: 'follow'
        }).then(setEdit(true));
    };

    return <div className="col-12 col-md-5 mt-3">
    {tasks.map((task, index) => {
        return(
            <article key={task._id} className="card mb-3">
                <div className="d-flex flex-column card-body">
                    <div className="d-flex justify-content-between">
                        <h4 id={"name" + index} className="align-self-start">{task.name}</h4>

                        <div onClick={() => changeCompleted(task.completed, index, task._id)} className={"align-self-end btn btn-"+ (task.completed ? 'success' : 'secondary')}>{task.completed ? 'done' : 'pending'}</div>
                    </div>
                    

                    <div id={"content" + index}>{task.content}</div>

                    
    
               <div className="d-flex justify-content-between">
                    <button className="btn btn-primary align-self-start">Edit</button>
                    <button onClick={() => deleteComponent(task._id)} className="btn btn-danger align-self-end">Delete</button> 
               </div>
                </div>
               
            </article>
        );
    })}
    </div>
}

export default TasksList;