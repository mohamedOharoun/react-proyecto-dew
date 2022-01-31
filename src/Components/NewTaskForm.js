export const NewTaskForm = () => {

    return (
        <div className="col-md-3 d-flex flex-column justify-content-center">
            <form className="form needs-validation">
                <div className="form-control d-flex flex-column">

                    <div>
                        <label htmlFor="name" className="form-label align-self-center">Name</label>
                        <input className="form-control" type="text" id="name" name="name" minLength={3}/>
                        <div className="invalid-feedback">It can only be 250 characters long</div>
                    </div>

                    <br/>

                    <div>
                        <label htmlFor="Task Content" className="visually-hidden">Task Content</label>
                        <textarea className="form-control" htmlFor="content" required></textarea>
                        <div className="invalid-feedback">It can only be 250 characters long</div>
                    </div>

                    <br/>

                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}

export default NewTaskForm;