import React, {useState} from "react";
import { checkPassword, validateEmail } from '../utils/helpers';


function Form() {
    // Create state variables for the fields in the form
    // We are also setting their initial values to an empty string
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleInputChange = (e) => {
      // Getting the value and name of the input which triggered the change
      const { target } = e;
      const inputType = target.name;
      const inputValue = target.value;
  
      // Based on the input type, we set the state of either email, username, and password
      if (inputType === 'email') {
        setEmail(inputValue);
      } else if (inputType === 'userName') {
        setUserName(inputValue);
      } else {
        setPassword(inputValue);
      }
    };
  
    const handleFormSubmit = (e) => {
      // Preventing the default behavior of the form submit (which is to refresh the page)
      e.preventDefault();
  
      // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
      if (!validateEmail(email) || !userName) {
        setErrorMessage('Email or username is invalid');
        // We want to exit out of this code block if something is wrong so that the user can correct it
        return;
        // Then we check to see if the password is not valid. If so, we set an error message regarding the password.
      }
      if (!checkPassword(password)) {
        setErrorMessage(
          `Choose a more secure password for the account: ${userName}`
        );
        return;
      }
      alert(`Hello ${userName}`);
  
      // If everything goes according to plan, we want to clear out the input after a successful registration.
      setUserName('');
      setPassword('');
      setEmail('');
    };
  
    return (
      <div>
        <p>Hello {userName}</p>
        <form className="form">
          <input
            value={email}
            name="email"
            onChange={handleInputChange}
            type="email"
            placeholder="email"
          />
          <input
            value={userName}
            name="userName"
            onChange={handleInputChange}
            type="text"
            placeholder="username"
          />
          <input
            value={password}
            name="password"
            onChange={handleInputChange}
            type="password"
            placeholder="Password"
          />
          <button type="button" onClick={handleFormSubmit}>Submit</button>
        </form>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
  
  export default Form;


// function Register (props) {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
    

//     const handleRegister = (e) => {
//         e.preventDefault();
//         console.log(email);
//     }

//     return (
//         <>

//         <form onSubmit={(handleRegister)}>
//             <label for="email">Plesae type in your email</label>
//             <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
//             <label for="password">Create a password</label>
//             <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******" id="password" name="password"/>
//             <button type ="submit" onSubmit={handleRegister}>Log In</button>
//         </form>
        
//         </>
//     )
// }

// export default Register;