import React from 'react';

export default class GamePage extends React.Component {


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
                                    <div className="cell small-7"></div>
                                    <div className="cell small-1"></div>
                                    <div className="cell small-2"></div>
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