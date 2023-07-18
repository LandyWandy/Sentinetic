import { useState } from 'react';
import '../css/style.css';

function Main() {
    const [userInput, setUserInput] = useState('');

    const handleInput = (e) => {
        setUserInput(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('User Input:', userInput); // Log the userInput state on submit
        // You can now use the userInput state value in your logic or pass it to other functions, APIs, etc.
    };

    return (
        <section>
            <div className="form">
                <div className="grid-container">
                    <div className="grid-item-row bg-light">
                        <h1>Sentinetic</h1>
                    </div>

                    <div className="grid-item-column left bg-light">
                        <div className="input-form-header">
                            <h3>Search a topic!</h3>
                        </div>

                        <div className="input-form-content">
                            <form>
                                <div id="input" className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search a topic..."
                                        aria-label="Search a topic..."
                                        aria-describedby="basic-addon2"
                                        onChange={handleInput} // Update the user input state as the user types
                                    />

                                    <div className="input-group-append">
                                        <button
                                            id="searchBtn"
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={handleFormSubmit} // Handle the form submit
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="grid-item-column right bg-light"></div>
                </div>
            </div>
        </section>
    );
}

export default Main;
