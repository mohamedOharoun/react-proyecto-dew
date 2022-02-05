import { useState } from "react";
import {TaskItemEdit} from './TaskItemEdit';
export const TaskItem = (task, index) => {
    const myStorage = window.localStorage;

    const [change, setChange] = useState(true);

    const changeCompleted = async (completed, index, id) => {
        const url = 'http://localhost:3030/api/v1/tasks/' + id;

        const postHeaders = new Headers();
        postHeaders.append('Authorization', 'Bearer ' + myStorage.getItem('token'));
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
        }).then(task.setEdit(true));
    };

    const deleteComponent = async (id) => {
        const url = 'http://localhost:3030/api/v1/tasks/' + id;

        const postHeaders = new Headers();
        postHeaders.append('Authorization', 'Bearer '+ myStorage.getItem('token'));
        
        await fetch(url, {
                method: 'DELETE',
                headers: postHeaders,
                redirect: 'follow'
        }).then(task.setEdit(true));
    };

    return(
        <>
            {change && (<article key={task.task._id} className="card mb-3">
                <div className="d-flex flex-column card-body">
                    <div className="d-flex justify-content-between">
                        <h4 id={"name" + task.index} className="align-self-start">{task.task.name}</h4>

                        <div onClick={() => changeCompleted(task.task.completed, task.index, task.task._id)} className={"align-self-end btn btn-"+ (task.task.completed ? 'success' : 'secondary')}>{task.task.completed ? 'Done' : 'Pending'}</div>
                    </div>
                    

                    <div id={"content" + task.index}>{task.task.content}</div>

                    
    
               <div className="d-flex justify-content-between">
                    <button className="btn btn-primary align-self-start" onClick={() => setChange(!change)}>Edit</button>
                    <button onClick={() => deleteComponent(task.task._id)} className="btn btn-danger align-self-end">Delete</button> 
               </div>
                </div>
               
            </article>)}

            {!change && (<TaskItemEdit key={task.task._id} task={task.task} setEdit={task.setEdit} setChange={setChange}/>)}
        </>
    );
}

export default TaskItem;