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
        <div class="login-form">
            <div class="container">
                <div class="login-container">
                    <h2>Login</h2>
                    <form>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="email"placeholder="email@example.com"/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="password" placeholder="Enter your password"/>
                        </div>
                        <button type="submit" class="btn btn-danger btn-block" onClick={handleSubmit}>Login</button>
                    
                    </form>
                    <p> Need to register? <button class="btn btn-outline-danger">Click here</button></p>
                </div>
            </div>
        </div>
    </section>
    )
}



  export default Login;