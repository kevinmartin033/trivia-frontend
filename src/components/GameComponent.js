import React from 'react';
import logo from '../assets/icecream.png';

export default class GameComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.answers)
        return (
            <div className="grid-y medium-grid-frame">
                {
                    this.props.gameState == 'In Lobby' ?
                    <React.Fragment>
                        <div className="cell small-1"></div>
                        <div className="cell small-6 center-align">
                            <img src={logo} alt="Icecream icon" className="full-height rotate"/>    
                        </div>
                        <div className="cell small-1"></div>
                        <div className="cell small-2 center-align game-text">
                            Game will begin shortly, there are currently {this.props.playerCount} players waiting 
                        </div>
                        <div className="cell small-2"></div>
                    </React.Fragment>:
                    <React.Fragment>
                        <div className="cell small-1"></div>
                        <div className="cell small-10">
                            <div className="grid-x full-height">
                                <div className="cell small-2"></div>
                                <div className="cell small-8">
                                    <div className="grid-y medium-grid-frame">
                                        <div className="cell small-1"></div>
                                        <div className="cell small-5 white-bg">{this.props.questionText}</div>
                                        <div className="cell small-1"></div>
                                        <div className="cell small-1 white-bg">A. {this.props.answers && this.props.answers['A']}</div>
                                        <div className="cell small-1 white-bg">B. {this.props.answers && this.props.answers['B']}</div>
                                        <div className="cell small-1 white-bg">C. {this.props.answers && this.props.answers['C']}</div>
                                        <div className="cell small-1 white-bg">D. {this.props.answers && this.props.answers['D']}</div>
                                    </div>
                                </div>
                                <div className="cell small-2"></div>
                            </div>
                        </div>
                        <div className="cell small-1"></div>
                    </React.Fragment>
                }
            </div>
        )
    }
}