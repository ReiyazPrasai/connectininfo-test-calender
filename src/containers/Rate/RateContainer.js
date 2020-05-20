import React, { Component } from 'react';

import Rate from '../../components/Rate';

export class RateContainer extends Component {
    render() {
        return (
            <Rate
                {...this.props}
            />
        );
    }
}


export default RateContainer;