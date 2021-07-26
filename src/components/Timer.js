import React from 'react';

const colors = {
    0: 'red',
    1: 'blue',
    2: 'purple'
}

export default class Timer extends React.Component {

    render() {
        const fontColor = colors[this.props.timer % 3]
        console.log(this.props.timer);
        return (
            <div className={`cell small-2 medium-4 center-align timer ${fontColor}`}>{Math.max(this.props.timer, 0)}</div>
        )
    }

}