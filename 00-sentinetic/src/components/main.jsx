import '../css/style.css';

function Main() {
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
                        <div id="input" className="input-group mb-3">

                            <input type="text" className="form-control" placeholder="Search a topic..." aria-label="Search a topic..." aria-describedby="basic-addon2"></input>
                            
                            <div class="input-group-append">
                              <button id="searchBtn" className="btn btn-outline-secondary" type="button">Search</button>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="grid-item-column right bg-light"></div>

            </div>
        </div>
    </section>
    )
}

export default Main;