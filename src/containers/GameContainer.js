import React from 'react';
import logo from '../assets/icecream.png';
import frown from '../assets/frown.png';
import Timer from '../components/Timer';
import QuestionStats from '../components/QuestionStats';

export default class GameComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.gameState)
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
                        </React.Fragment>
                    :
                    this.props.gameState == 'Correct Answer'?
                        <React.Fragment>
                            <div className="cell small-1"></div>
                            <div className="cell small-10">
                                <div className="grid-x full-height">
                                    <div className="cell small-2"></div>
                                    <div className="cell small-8">
                                        <div className="grid-y medium-grid-frame">
                                            <Timer timer={this.props.timer} />
                                            <div className="cell small-1"></div>
                                            <div className="cell small-2 white-bg">{this.props.questionText}</div>
                                            <div className="cell small-1"></div>
                                            <div className={`cell small-1 white-bg ${this.props.correctAnswer == "A"? "correct-answer": ""}`}>A. {this.props.answers && this.props.answers['A']}</div>
                                            <div className={`cell small-1 white-bg ${this.props.correctAnswer == "B"? "correct-answer": ""}`}>B. {this.props.answers && this.props.answers['B']}</div>
                                            <div className={`cell small-1 white-bg ${this.props.correctAnswer == "C"? "correct-answer": ""}`}>C. {this.props.answers && this.props.answers['C']}</div>
                                            <div className={`cell small-1 white-bg ${this.props.correctAnswer == "D"? "correct-answer": ""}`}>D. {this.props.answers && this.props.answers['D']}</div>
                                        </div>
                                    </div>
                                    <div className="cell small-2"></div>
                                </div>
                            </div>
                            <div className="cell small-1"></div>
                        </React.Fragment>
                    
                    :
                    this.props.gameState == 'Incorrect Answer' || this.props.gameState == 'Late Answer' ?
                        <React.Fragment>
                            <div className="cell small-1"></div>
                            <div className="cell small-4 center-align">
                                <img src={frown} alt="frown" className="full-height"/>    
                            </div>
                                <div className="cell small-1"></div>
                                {
                                    this.props.gameState == 'Incorrect Answer' ?
                                        <div className="cell small-1 center-align game-text">
                                            Incorrect answer, the correct answer was: {this.props.correctAnswer}. {this.props.answers[this.props.correctAnswer]}
                                        </div>:
                                        <div className="cell small-1 center-align game-text">
                                            Late answer, the correct answer was: {this.props.correctAnswer}. {this.props.answers[this.props.correctAnswer]}
                                        </div>
                                }
                                <div className="cell small-2"></div>
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
                            <div className="cell small-1"></div>
                        </React.Fragment>
                                
                    :
                    this.props.gameState === "Between Questions"?
                        <QuestionStats
                            questionText={this.props.questionText}    
                            correctAnswer={this.props.correctAnswer}
                            questionMetrics={this.props.questionMetrics}
                            answers={this.props.answers}
                            timer={this.props.timer}
                        />
                    :
                        <React.Fragment>
                            <div className="cell small-1"></div>
                            <div className="cell small-10">
                                <div className="grid-x full-height">
                                    <div className="cell small-2"></div>
                                    <div className="cell small-8">
                                        <div className="grid-y medium-grid-frame">
                                            <Timer timer={this.props.timer} />
                                            <div className="cell small-1"></div>
                                            <div className="cell small-2 white-bg">{this.props.questionText}</div>
                                            <div className="cell small-1"></div>
                                            <div className="cell small-1 white-bg" onClick={() => this.props.submitAnswer("A")}>A. {this.props.answers && this.props.answers['A']}</div>
                                            <div className="cell small-1 white-bg" onClick={() => this.props.submitAnswer("B")}>B. {this.props.answers && this.props.answers['B']}</div>
                                            <div className="cell small-1 white-bg" onClick={() => this.props.submitAnswer("C")}>C. {this.props.answers && this.props.answers['C']}</div>
                                            <div className="cell small-1 white-bg" onClick={() => this.props.submitAnswer("D")}>D. {this.props.answers && this.props.answers['D']}</div>
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