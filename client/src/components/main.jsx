import Tweet from "./tweet";
import { useState, useEffect } from 'react';
import '../css/style.css';

function Main() {
    const [userInput, setUserInput] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);

    const handleInput = (e) => {
        setUserInput(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim() === '') return; 

        // # check
        const formattedInput = userInput.startsWith('#') ? userInput : `#${userInput}`;

        // save toi lcoal stoaraygae
        const newRecentSearches = [formattedInput, ...recentSearches];
        localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
        setRecentSearches(newRecentSearches);

        // Clear input on search
        setUserInput('');
    };

    // retrieve from localStorage
    const getRecentSearches = () => {
        const storedRecentSearches = localStorage.getItem('recentSearches');
        if (storedRecentSearches) {
            setRecentSearches(JSON.parse(storedRecentSearches));
        }
    };

    // Load the recent searches on init
    useEffect(() => {
        getRecentSearches();
    }, []);

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

                        <div className='recent-searches-container'>
                        {recentSearches.map((search, index) => (
                            <div key={index} className='recent-search'>
                                {search}
                            </div>
                        ))}
                        </div>

                        <div className="input-form-content">



                            <form onSubmit={handleFormSubmit}> {/* Add onSubmit to the form element */}
                                <div id="input" className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search a topic..."
                                        aria-label="Search a topic..."
                                        aria-describedby="basic-addon2"
                                        value={userInput}
                                        onChange={handleInput} // Update the user input state as the user types
                                    />

                                    <div className="input-group-append">
                                        <button
                                            id="searchBtn"
                                            className="btn btn-outline-secondary"
                                            type="submit" // Change the button type to 'submit' to trigger onSubmit
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="grid-item-column right bg-light">
                        <h3>Render Data</h3>
                    </div>

                    <div className="bg-light relevant-tweets-container">
                        <i className='fa-sharp fa-solid fa-angle-left fa-beat fa-2xl icon' />
                            <Tweet />
                        <i className='fa-sharp fa-solid fa-angle-right fa-beat fa-2xl icon' />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Main;
