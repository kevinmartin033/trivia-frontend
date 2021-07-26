import React from 'react';
import Timer from './Timer';

export default class QuestionStats extends React.Component {

    render() {
        let total_votes = 0
        for (let key in this.props.questionMetrics) {
            total_votes += this.props.questionMetrics[key]
        }
        return (
            <React.Fragment>
                <div className="cell small-1"></div>
                <div className="cell small-10">
                    <div className="grid-x full-height">
                        <div className="cell small-2"></div>
                        <div className="cell small-8">
                            <div className="grid-y full-height">
                                <Timer timer={this.props.timer} smaller={true}/>
                                <div className="cell small-4 medium-3 question-text" style={{'overflowY': 'scroll'}}>{this.props.questionNumber}. {this.props.questionText}</div>
                                <div className="cell small-2 medium-3 question-text detail-text">Let's see how everyone else did</div>
                                <div className={`cell small-1 question-text  answer-text ${this.props.correctAnswer === "A"? "correct-answer": ""}`}>A. {this.props.answers && this.props.answers['A']}: {this.props.questionMetrics && this.props.questionMetrics['A']}</div>
                                <div className={`cell small-1 question-text  answer-text ${this.props.correctAnswer === "B"? "correct-answer": ""}`}>B. {this.props.answers && this.props.answers['B']}: {this.props.questionMetrics && this.props.questionMetrics['B']}</div>
                                <div className={`cell small-1 question-text  answer-text ${this.props.correctAnswer === "C"? "correct-answer": ""}`}>C. {this.props.answers && this.props.answers['C']}: {this.props.questionMetrics && this.props.questionMetrics['C']}</div>
                                <div className={`cell small-1 question-text  answer-text ${this.props.correctAnswer === "D"? "correct-answer": ""}`}>D. {this.props.answers && this.props.answers['D']}: {this.props.questionMetrics && this.props.questionMetrics['D']}</div>
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