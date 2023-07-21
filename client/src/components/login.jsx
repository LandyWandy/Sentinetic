import React, {useState} from "react";
import Register from './register'
// import '../css/style.css';
// import Main from "./main";
import '../css/login.css';

// import { checkPassword, validateEmail } from '../utils/helpers';

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

  
    const [currentPage, setCurrentPage] = useState('');
  
    // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
    // const renderPage = () => {
    //   if (currentPage === 'Main') {
    //     return <Main />;
    //   }
    //   if (currentPage === 'Register') {
    //     return <Register />;
    //   }
      
    // };
  
    const handlePageChange = (page) => setCurrentPage(page);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        handlePageChange("Main");
    }

    return (
        <section>
        <div className="form">
            <div>
                <div  >
                    <h1 class="headerOne">Sentinetic</h1>
                </div>
                <div>
                    <div className="input-form-header">
                    <h3>Login</h3>
                    </div>

                    <div className="input-form-content" class="d-flex justify-content-center">
                        <form>
                            <div id="input" className="input-group mb-3">
                                <input 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Email" 
                                    aria-label="Email" 
                                    aria-describedby="basic-addon2" 
                                    id="email" name="email"
                                />
                            </div>
                            <div id="input" className="input-group mb-3">
                                <input 
                                    value={password}   
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password" 
                                    placeholder="Password" 
                                    aria-label="Password" 
                                    aria-describedby="basic-addon2"
                                    id="password" 
                                    name="password"/>

                            </div>
                            <div className="input-group-append" class="d-flex justify-content-center">
                                    <button 
                                        className="btn btn-outline-danger"
                                        type ="submit" 
                                        onSubmit={handleSubmit}
                                    >
                                        Log In
                                    </button>
                            </div>    
                            <div class="text-center">
                                <button className="btn btn-sm btn-block btn-danger" onClick={Register}>Register here if you do not have an account </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}



  export default Login;