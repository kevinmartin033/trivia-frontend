import React from 'react';

export default class Title extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className="grid-container full-height">
                    <div className="grid-x full-height">
                        <div className="cell small-12 medium-12 title-text">Trivia Time</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}