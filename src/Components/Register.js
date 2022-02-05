import { useNavigate } from "react-router-dom";

export const Register = (changeComponent) => {

    const style = {width: '100%'};
    const myStorage = window.localStorage;
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();

        
        const url = 'http://localhost:3030/api/v1/login/register';

        const postHeaders = new Headers();
        postHeaders.append('Content-type', 'application/json');


        const data = {
            "name": document.getElementById('name-register').value,
            "email": document.getElementById('email-register').value,
            "password": document.getElementById('password-register').value
        }
        
        const res = await fetch(url, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
        })
        .then(res => res.json())
        .catch(err => console.log(err));

        myStorage.clear();
        myStorage.setItem('token', res.token)
        myStorage.setItem('name', res.user.name)

        if(myStorage.getItem('token') && myStorage.getItem('token')){
            navigate('/');
        }
    };
    
    const login = (e) => {
        e.preventDefault();
        changeComponent.changeToLogin();
    };

    return (
        
        <div style={style} className="col-12 d-flex flex-column justify-content-center align-items-center">
            <form id="formNewTask" className="col-11 col-sm-6 form needs-validation justify-content-cent align-items-center" onSubmit={(e) => registerUser(e)}>
                <div className="form-control d-flex flex-column justify-content-center align-items-center">
    
                    <div className="mb-3 col-8 mt-5">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input className="form-control" type="name" id="name-register" name="name"/>
                    </div>

                    <div className="mb-3 col-8">
                        <label htmlFor="email" className="form-label">E-Mail</label>
                        <input className="form-control" type="email" id="email-register" name="email"/>
                    </div>
    
                    <div className="mb-3 col-8">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input className="form-control" type="password" id="password-register" name="password"/>
                    </div>
                    
                    <button className="btn btn-primary mb-3">Register</button>
    
                    <button className="btn btn-link mb-5" onClick={e => login(e)}>Already have an account? Log In Here</button>
                </div>
            </form>
        </div>
    );
};

export default Register;