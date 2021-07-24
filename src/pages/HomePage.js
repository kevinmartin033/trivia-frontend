import React from 'react';
import logo from '../assets/planet.webp';
import { API_URL } from '../constants';
import { withRouter } from 'react-router-dom'

class HomePageClass extends React.Component {

    constructor() {
        super();
        this.joinGame = this.joinGame.bind(this);
    }

    joinGame() {
        // Join a game & redirect to the lobby
        const url = API_URL + '/join_game/'
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.props.history.push(result['id'] + '/')
            }
        )
    }

    render() {
        return(
            <div className="grid-y medium-grid-frame">
                <div className="cell small-1"></div>
                <div className="cell small-2">
                    <div className="grid-container full-height">
                        <div className="grid-x full-height">
                            <div className="cell small-3"></div>
                            <div className="cell small-6 title-text">Trivia Time</div>
                        </div>
                    </div>
                </div>
                <div className="cell small-8">
                    <div className="grid-container full-height">
                        <div className="grid-x full-height">
                            <div className="cell small-3"></div>
                            <div className="cell small-6 game-container">
                                <div className="grid-y medium-grid-frame">
                                    <div className="cell small-1"></div>
                                    <div className="cell small-7 center-align">
                                        <img src={logo} alt="Planet icon" className="full-height"/>    
                                    </div>
                                    <div className="cell small-1"></div>
                                    <div className="cell small-2 center-align">

                                        <div className="grid-container full-height">
                                            <div className="grid-x grid-margin-x full-height center-align">
                                                <div className="cell small-8 small-offset-2">
                                                    <div className="button game-button expanded" onClick={this.joinGame}>
                                                        Join Next Available Game
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cell small-1"></div>
                                </div>
                            </div>
                                
                        </div>
                    </div>
                </div>
                <div className="cell small-3"></div>
            </div>
        )
    }
}

export default withRouter(HomePageClass);
