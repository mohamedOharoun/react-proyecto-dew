import { useState } from "react";

export const NewTaskForm = () => {
    const maxChars = 250;
    const [counter, setCounter] = useState(0);
    const [isInValid, setIsInValid] = useState(false);
    return (
        <div className="col-md-3 d-flex flex-column justify-content-center">
            <form className="form needs-validation">
                <div className="form-control d-flex flex-column">

                    <div className="d-flex flex-column">
                        <label htmlFor="name" className="form-label align-self-center">Name</label>
                        <input className="form-control" type="text" id="name" name="name" minLength={3}/>
                        <div className="invalid-feedback">It can only be 250 characters long</div>
                    </div>

                    <br/>

                    <div className="d-flex flex-column">
                        <label htmlFor="content" className="visually-hidden">Task Content</label>
                        <textarea rows="10" className={"form-control"  + (isInValid ? " is-invalid" : "")} htmlFor="content" onChange={(e) => {setCounter(e.target.value.length); e.target.value.length > maxChars ? setIsInValid(true) : setIsInValid(false)}} required></textarea>
                        <div className="form-text align-self-end">{counter}/{maxChars}</div>
                        <div className="invalid-feedback">It can only be {maxChars} characters long{isInValid}</div>
                    </div>

                    <br/>

                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}

export default NewTaskForm;