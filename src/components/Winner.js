import React from 'react';
import fireworks from '../assets/fireworks.png';

export default class Winner extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className="cell medium-1"></div>
                <div className="cell small-10">
                    <div className="grid-x full-height">
                        <div className="cell small-2"></div>
                        <div className="cell small-8">
                            <div className="grid-y full-height">
                                <div className="cell small-5 medium-6 center-align">
                                    <img src={fireworks} alt="Icecream icon" className="full-height image-contain"/>    
                                </div>
                                <div className="cell medium-1"></div>
                                <div className="cell small-4 medium-3 center-align game-text">
                                    You answered 10 in a row correctly, you won along with {this.props.otherWinners} other players
                                </div>
                                <div className="cell small-2 center-align">
                                    <div className="grid-container full-height">
                                        <div className="grid-x grid-margin-x full-height center-align">
                                            <div className="cell small-12">
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
                <div className="cell small-1"></div>
            </React.Fragment>
        )
    }
}