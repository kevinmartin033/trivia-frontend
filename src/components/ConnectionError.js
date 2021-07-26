import React from 'react';
import error from '../assets/error.png';

export default class ConnectionError extends React.Component {

    render() {
        return(
            <div className="cell small-12">
                <div className="grid-x full-height">
                    <div className="cell small-2"></div>
                    <div className="cell small-8">
                        <div className="grid-y full-height">
                            <div className="small-1"></div>
                            <div className="cell small-5 medium-6 center-align">
                                <img src={error} alt="Error icon" className="image-contain"/>    
                            </div>
                            <div className="cell small-4 medium-3 center-align game-text">
                                There was an issue connecting to the game
                            </div>
                            <div className="cell small-2 center-align">
                                <div className="grid-container full-height">
                                    <div className="grid-x grid-margin-x full-height center-align">
                                        <div className="cell small-8 small-offset-2">
                                            <div className="button game-button expanded" onClick={this.props.joinGame}>
                                                Join Next Available Game
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cell small-2"></div>
                </div>
            </div>
        )
    }
}