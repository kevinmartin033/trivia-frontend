import React from 'react';

const colors = {
    0: 'red',
    1: 'blue',
    2: 'purple'
}

export default class Timer extends React.Component {

    render() {
        const fontColor = colors[this.props.timer % 3]
        return (
            <div className={`cell small-4 center-align timer ${fontColor}`}>{this.props.timer}</div>
        )
    }

}