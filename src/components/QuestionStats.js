import React from 'react';
import Timer from './Timer';

export default class QuestionStats extends React.Component {

    render() {
        let total_votes = 0
        for (let key in this.props.questionMetrics) {
            total_votes += this.props.questionMetrics[key]
        }
        console.log(this.props.questionMetrics)
        return (
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
                                <div className="cell small-1 white-bg">A. {this.props.answers && this.props.answers['A']}: {this.props.questionMetrics && this.props.questionMetrics['A']} / {total_votes}</div>
                                <div className="cell small-1 white-bg">B. {this.props.answers && this.props.answers['B']}: {this.props.questionMetrics && this.props.questionMetrics['B']} / {total_votes}</div>
                                <div className="cell small-1 white-bg">C. {this.props.answers && this.props.answers['C']}: {this.props.questionMetrics && this.props.questionMetrics['C']} / {total_votes}</div>
                                <div className="cell small-1 white-bg">D. {this.props.answers && this.props.answers['D']}: {this.props.questionMetrics && this.props.questionMetrics['D']} / {total_votes}</div>
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