import React from 'react';
import { SOCKET_URL } from '../contants';
import GameComponent from '../components/GameComponent';

export default class GamePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            gameState: 'In Lobby'
        }
        console.log(this.state.gameState)
        this.handleEvent = this.handleEvent.bind(this);
        this.pingStartTime = this.pingStartTime.bind(this);
    }

    componentDidMount() {
        this.socket = new WebSocket(SOCKET_URL + "/game" + this.props.location.pathname);
        
        this.socket.addEventListener('message', this.handleEvent);
    }

    handleEvent(event) {
        const data = JSON.parse(event.data)
        this.setState({})
        switch (data.code) {
            case "player_count":
                this.setState({
                    playerCount: data.message
                })
                setTimeout(this.pingStartTime, (data.start_time + 1) * 1000)
                break;
            case "start_game": 
                this.setState({
                    gameState: 'In Progress'
                })
                break;
            case "next_question":
                this.setState({
                    questionText: data.question_text,
                    questionId: data.question_id,
                    answers: data.answers
                })
        }
    }

    pingStartTime() {
        if (this.state.gameState == 'In Lobby') {
            this.socket.send(JSON.stringify({
                'code': 'game.start'
            }))
        }
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
                                    <GameComponent
                                        playerCount={this.state.playerCount}
                                        gameState={this.state.gameState}
                                        questionText={this.state.questionText}
                                        answers={this.state.answers}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cell small-3"></div>
                </div>
        )
    }
}