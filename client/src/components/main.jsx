// require('dotenv').config();
import Tweet from "./tweet";
import { useState, useEffect } from 'react';
import '../css/style.css';
import { useMutation, useQuery } from '@apollo/client';
import Stats from './pieChart';
import { ADD_SEARCH } from "../utils/mutations";
import { GET_SEARCH } from "../utils/queries";
import logo from "../images/sentinetic-logo.svg"

function Main({onLogout}) {
    const [userInput, setUserInput] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [addSearch] = useMutation(ADD_SEARCH);
    const [searchData, setSearchData] = useState({});

    const handleInput = (e) => {
        setUserInput(e.target.value);
    }

    const { refetch } = useQuery(GET_SEARCH, { skip: true });

    async function handleRecentSearchClick(searchTerm) {
        const { data } = await refetch({ searchTerm });
        console.log(data)
        // Now you can handle the data as you need...
        setSearchData(data.getSearch);
        const mostLikedTweet = data.getSearch.tweets.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
        setSearchData({ ...data.getSearch, mostLikedTweet: mostLikedTweet });
    }
    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (userInput.trim() === '') return; 

        // check
        const formattedInput = userInput.startsWith('#') ? userInput : `#${userInput}`;

        // Here, we call the addSearch mutation
        const { data } = await addSearch({ variables: { searchTerm: formattedInput } });

        console.log(data.addSearch)
        // // Handle the returned data as needed...
        
        setSearchData(data.addSearch)
        const mostLikedTweet = data.addSearch.tweets.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
        setSearchData({ ...data.addSearch, mostLikedTweet: mostLikedTweet });
    
        // console.log(searchData.tweets);

        // save toi lcoal stoaraygae
        const newRecentSearches = [formattedInput, ...recentSearches.slice(0, 5)]; // Limit to 6 recent searches
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

    const handleClearRecentSearches = () => {
        // Clear recent searches from state and local storage
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
      };

    const logoutBtn = () => {
        onLogout();
    };

    return (
        <section>
            <button className="logout-btn btn btn-outline-danger bg-light" onClick={logoutBtn}>Logout</button>
            <div className="center-wrapper">
                
                <div className="wrapper">
                    <div className="chart-container">
        
                        <div id="toprow" className="bg-light justify-content-center alight-items-center">
                            <img src={logo} alt="sentinetic-logo" className="mt-2"/><h1 className="text-center mt-3 mx-3">sentinetic</h1>
                        </div>
            
                        <div id="columnleft" className="bg-light">
                            
                            <div className="input-form-content mt-3">
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
                            <div className="recent-searches-wrapper">
                                <div className='recent-searches-container py-2 mx-2 justify-content-center'>
                                    {recentSearches.map((search, index) => (
                                        <div key={index} className='recent-search' onClick={() => handleRecentSearchClick(search)}>
                                            {search}
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                            {recentSearches.length > 0 && (
                            <div className="clear-btn-wrapper">
                                <button className="btn btn-outline-danger clear-btn" onClick={handleClearRecentSearches}>
                                    Clear Recent Searches
                                </button>
                            </div>
                            )}
                        </div>

                        <div id="columnright" className="bg-light">
                            <h3 className="text-center mt-4">Data</h3>
                            <div className="pie-chart-container">
                                <div className="pie-chart">
                                    <Stats positive={searchData.positive} negative={searchData.negative} neutral={searchData.neutral}/>
                                </div>
                            </div>
                        </div>
                        
                        <div id="bottomrow" className="bg-light">
                                <Tweet tweet={searchData.mostLikedTweet} />
                        </div>
                    </div>
                    
                </div>
                <div className="svg-container">
                    <svg version="1.1" id="Layer_2_00000003786962689714120280000011913603199568242819_"
                    xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1202 789.3"
                    style={{ enableBackground: 'new 0 0 1202 789.3' }} xmlSpace="preserve">
                    <path className="st0" fill="#FFFFFF" d="M1202,63.7L1202,63.7c0,13.4-10.8,24.2-24.2,24.2H1074c-12.8,0-23.1,10.3-23.1,23.1l0,0
                        c0,12.8,10.3,23.1,23.1,23.1h66c16.2,0,29.3,13.1,29.3,29.3V177c0,16.2-13.1,29.3-29.3,29.3l0,0v393.5c0,12.5-10.1,22.5-22.6,22.5
                        l0,0c-12.4,0-22.6,10.1-22.6,22.5l0,0c0,12.5,10.1,22.5,22.6,22.5h35c19.9,0,36.1,16.2,36.1,36.1l0,0c0,19.9-16.2,36.1-36.1,36.1
                        H1140c0,27.4-22.2,49.6-49.6,49.6h-972c-27.4,0-49.6-22.2-49.6-49.6V464c0-15.3-12.4-27.6-27.6-27.6H24.8
                        C11.1,436.4,0,425.3,0,411.6l0,0c0-13.7,11.1-24.8,24.8-24.8h44h3.4c12.4,0,22.6-10.1,22.6-22.5l0,0c0-12.5-10.1-22.5-22.6-22.5
                        h-3.4H47.4c-13.7,0-24.8-11.1-24.8-24.8l0,0c0-13.7,11.1-24.8,24.8-24.8h2.3c10.6,0,19.2-8.6,19.2-19.2V182
                        c0-18.9,15.3-34.2,34.2-34.2h28.9c13.7,0,24.8-11.1,24.8-24.8l0,0c0-13.7-11.1-24.8-24.8-24.8h-14.1c-27.1,0-49.1-22-49.1-49l0,0
                        c0-27.1,21.9-49,49-49h982.7c21.8,0,39.5,17.7,39.5,39.5l0,0h37.8C1191.2,39.5,1202,50.3,1202,63.7z"
                    />
                    </svg>
                </div>
                <div className="spacer">
                
            </div>
            </div>
            
        </section>
    );
}

export default Main;
