import React from 'react';

const colors = {
    0: 'red',
    1: 'blue',
    2: 'purple'
}

export default class Timer extends React.Component {

    render() {
        const fontColor = colors[this.props.timer % 3]
        const mediumSize = this.props.smaller ? 2: 4
        return (
            <div className={`cell small-2 medium-${mediumSize} center-align timer ${this.props.smaller? "smaller" : ""} ${fontColor}`}>{Math.max(this.props.timer, 0)}</div>
        )
    }

}