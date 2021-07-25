import React from 'react';
import { withRouter } from 'react-router';
import { API_URL, SOCKET_URL } from '../constants';
import GameContainer from '../containers/GameContainer';
import Title from '../components/Title';

const LOBBY_STATE = {
    gameState: 'In Lobby',
    answers: [],
    questionMetrics: {},
    playerCount: 0,
    questionText: '',
    questionId: '',
    timer: -1,
    correctAnswer: null

}

class GamePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = LOBBY_STATE
        this.handleEvent = this.handleEvent.bind(this);
        this.pingStartTime = this.pingStartTime.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.questionMetrics = this.questionMetrics.bind(this);
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
                    timer: Math.ceil(data.start_time)
                })
                if (this.timer) {
                    clearInterval(this.timer);
                }
                this.timer = setInterval(() => {
                        this.setState({timer: this.state.timer - 1})
                    }
                    , 1000
                );
                this.nextStep = setTimeout(this.pingStartTime, (data.start_time + 1) * 1000)
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
                    timer: Math.ceil(data.expiry),
                    gameState: 'Answering'
                })
                if (this.timer){
                    clearInterval(this.timer);
                }
                this.nextStep = setTimeout(this.questionMetrics, (data.expiry) * 1000)
                this.timer = setInterval(() => {
                        this.setState({timer: this.state.timer - 1})
                    }
                    , 1000
                );
                break;
            case "late_answer":
                this.setState({
                    gameState: "Late Answer",
                    correctAnswer: data.correct_answer
                })
                break;
            case "correct_answer":
                this.setState({
                    gameState: "Correct Answer",
                    correctAnswer: data.correct_answer,
                });
                break;
            case "question_metrics":
                this.setState({
                    gameState: "Between Questions",
                    correctAnswer: data.correct_answer,
                    questionMetrics: data.metrics,
                    timer: Math.ceil(data.expiry)
                })
                clearTimeout(this.nextStep)
                this.nextStep = setTimeout(this.nextQuestion, (data.expiry) * 1000)
                break;
            case "incorrect_answer":
                this.setState({
                    gameState: "Incorrect Answer",
                    correctAnswer: data.correct_answer
                })
                clearInterval(this.timer);
                clearTimeout(this.nextStep);
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
        clearInterval(this.timer);
        if (this.state.gameState == 'In Lobby') {
            this.socket.send(JSON.stringify({
                'code': 'game.start'
            }))
        }
    }

    nextQuestion() {
        if (this.state.gameState == 'Between Questions') {
            this.socket.send(JSON.stringify({
                'code': 'game.next_question'
            }))
        }
    }

    questionMetrics() {
        if (this.state.gameState == 'Correct Answer') {
            this.socket.send(JSON.stringify({
                'code': 'game.question_metrics',
                'question_id': this.state.questionId
            }));
        } else {
            this.submitAnswer('A');
        }
    }

    render() {
        return(
            <div className="grid-y" style={{'height': '100vh'}}>
                <div className="cell small-2"><Title /></div>
                <div className="cell small-9">
                    <div className="grid-container full-height">
                        <div className="grid-x full-height">
                            <div className="cell small-10 small-offset-1 medium-6 medium-offset-3 game-container">
                                <GameContainer
                                    playerCount={this.state.playerCount}
                                    gameState={this.state.gameState}
                                    questionText={this.state.questionText}
                                    questionId={this.state.questionId}
                                    answers={this.state.answers}
                                    submitAnswer={this.submitAnswer}
                                    correctAnswer={this.state.correctAnswer}
                                    joinGame={this.joinGame}
                                    timer={this.state.timer}
                                    questionMetrics={this.state.questionMetrics}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(GamePage);