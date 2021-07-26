import React from 'react';

const colors = {
    0: 'red',
    1: 'blue',
    2: 'purple'
}

export default class Timer extends React.Component {

    render() {
        const fontColor = colors[this.props.timer % 3]
        const smallSize = this.props.smallSize || 2
        const mediumSize = this.props.mediumSize || 4
        return (
            <div className={`cell small-${smallSize} medium-${mediumSize} center-align timer ${fontColor}`}>{Math.max(this.props.timer, 0)}</div>
        )
    }

}