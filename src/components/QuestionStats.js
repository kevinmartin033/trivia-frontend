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
                                <Timer timer={this.props.timer} />
                                <div className="cell small-1"></div>
                                <div className="cell small-3 medium-2 question-text">{this.props.questionNumber}. {this.props.questionText}</div>
                                <div className="cell small-2 medium-1"></div>
                                <div className="cell small-1 question-text">A. {this.props.answers && this.props.answers['A']}: {this.props.questionMetrics && this.props.questionMetrics['A']} / {total_votes}</div>
                                <div className="cell small-1 question-text">B. {this.props.answers && this.props.answers['B']}: {this.props.questionMetrics && this.props.questionMetrics['B']} / {total_votes}</div>
                                <div className="cell small-1 question-text">C. {this.props.answers && this.props.answers['C']}: {this.props.questionMetrics && this.props.questionMetrics['C']} / {total_votes}</div>
                                <div className="cell small-1 question-text">D. {this.props.answers && this.props.answers['D']}: {this.props.questionMetrics && this.props.questionMetrics['D']} / {total_votes}</div>
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