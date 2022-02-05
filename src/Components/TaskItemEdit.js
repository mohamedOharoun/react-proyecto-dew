import { useState } from "react";
export const TaskItemEdit = (task) => {
    const myStorage = window.localStorage;
    const maxChars = 125;
    const [counter, setCounter] = useState(0);
    const [isInValid, setIsInValid] = useState(false);
    const [isDone, setIsDone] = useState(task.task.completed);
    const [name, setName] = useState(task.task.name);
    const [content, setContent] = useState(task.task.content);

    const sendTask = async (e, index) => {
        e.preventDefault();

        const url = 'http://localhost:3030/api/v1/tasks/' + task.task._id;

        const postHeaders = new Headers();
        postHeaders.append('Authorization', 'Bearer ' + myStorage.getItem('token'));
        postHeaders.append('Content-Type', 'application/json');


        const data = {
            "name": document.getElementById('nameEdit' + index).value,
            "content": document.getElementById('contentEdit' + index).value,
            "completed": isDone
        }
        
        await fetch(url, {
                method: 'PATCH',
                headers: postHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
        })
        .then(() => task.setChange(true))
        .then(() => task.setEdit(true))
        .catch(err => console.log(err));
    };

    const cancelEdit = (e) => {
        e.preventDefault();

        task.setChange(true)
    }

    return <div key={task._id + 'itemEdit'} className="d-flex flex-column justify-content-center mb-3">
    <form className="form needs-validation" onSubmit={(e) => sendTask(e, task.index)}>
        <div className="form-control d-flex flex-column">

            <div className="d-flex flex-column">
                <label htmlFor="name" className="form-label align-self-center">Name</label>
                <input className="form-control" type="text" id={"nameEdit" + task.index} name="name" minLength={3} value={name} onChange={e => setName(e.target.value)} autoComplete="off"/>
                <div className="invalid-feedback">It can only be 250 characters long</div>
            </div>

            <br/>

            <div className="d-flex flex-column">
                <label htmlFor="content" className="visually-hidden">Task Content</label>
                <textarea value={content} rows="5" id={"contentEdit" + task.index} 
                className={"form-control"  + (isInValid ? " is-invalid" : "")} 
                htmlFor="content"
                onChange={(e) => {
                    setCounter(e.target.value.length); 
                    e.target.value.length > maxChars ? setIsInValid(true) : setIsInValid(false);
                    setContent(e.target.value);
                }} required></textarea>
                <div className="form-text align-self-end">{counter}/{maxChars}</div>
                <div className="invalid-feedback">It can only be {maxChars} characters long{isInValid}</div>
            </div>

            <br/>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id={"completedEdit" + task.index} onClick={() => setIsDone(!isDone)} defaultChecked={isDone}/>
                <label className="form-check-label" htmlFor="completed">{isDone ? 'Done' : 'Pending'}</label>
            </div>
            <br/>

            <div className="d-flex d-lg-column justify-content-between">
                <button type="submit" className="btn btn-primary">Edit</button>
                <button type="submit" className="btn btn-danger" onClick={(e) => cancelEdit(e)}>Cancel</button>
            </div>
            
        </div>
    </form>
</div>
}