import React from 'react';
import { API_URL, SOCKET_URL } from '../contants';
import GameComponent from '../components/GameComponent';
import { withRouter } from 'react-router';

const LOBBY_STATE = {
    gameState: 'In Lobby',
    answers: [],
    playerCount: 0,
    questionText: '',
    questionId: '',
    correctAnswer: null

}

class GamePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = LOBBY_STATE
        console.log(this.state.gameState)
        this.handleEvent = this.handleEvent.bind(this);
        this.pingStartTime = this.pingStartTime.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    componentDidMount() {
        this.socket = new WebSocket(SOCKET_URL + "/game" + this.props.location.pathname);
        
        this.socket.addEventListener('message', this.handleEvent);
    }

    componentDidUpdate(props) {
        if (this.props.location.pathname !== props.location.pathname) {
            this.socket = new WebSocket(SOCKET_URL + "/game" + this.props.location.pathname);
            this.socket.addEventListener('message', this.handleEvent);
            this.setState(LOBBY_STATE)
        }
    }

    joinGame() {
        // Join a game & redirect to the lobby
        const url = API_URL + '/join_game/'
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.props.history.push(`/${result['id']}/`)
            }
        )
    }

    handleEvent(event) {
        const data = JSON.parse(event.data)
        this.setState({})
        switch (data.code) {
            case "player_count":
                this.setState({
                    playerCount: data.message,
                    startTime: data.start_time + 1
                })
                setTimeout(this.pingStartTime, (data.start_time + 1) * 1000)
                break;
            case "start_game": 
                this.setState({
                    gameState: 'In Progress'
                })
                break;
            case "next_question":
                if (this.state.gameState == 'Answering'){
                    console.log('goofeeeed')
                    break;
                }
                this.setState({
                    questionText: data.question_text,
                    questionId: data.question_id,
                    answers: data.answers,
                    gameState: 'Answering'
                })
                break;
            case "late_answer":
                debugger;
                break
            case "correct_answer":
                this.setState({
                    gameState: "Correct Answer",
                    correctAnswer: data.correct_answer
                })
                setTimeout(this.nextQuestion, (data.next_question) * 1000)
                break;
            case "incorrect_answer":
                this.setState({
                    gameState: "Incorrect Answer",
                    correctAnswer: data.correct_answer
                })
                break;
            case "error_answer":
                debugger;
                break;
        }   
    }

    submitAnswer(answer) {
        this.socket.send(JSON.stringify({
            'code': 'game.submit_answer',
            'answer': answer,
            'question_id': this.state.questionId
        }));
    }

    pingStartTime() {
        if (this.state.gameState == 'In Lobby') {
            this.socket.send(JSON.stringify({
                'code': 'game.start'
            }))
        }
    }

    nextQuestion() {
        if (this.state.gameState == 'Correct Answer') {
            this.socket.send(JSON.stringify({
                'code': 'game.next_question'
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
                                        questionId={this.state.questionId}
                                        answers={this.state.answers}
                                        submitAnswer={this.submitAnswer}
                                        correctAnswer={this.state.correctAnswer}
                                        joinGame={this.joinGame}
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

export default withRouter(GamePage);