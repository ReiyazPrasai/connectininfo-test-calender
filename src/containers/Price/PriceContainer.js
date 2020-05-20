import React, { Component } from 'react';

import Price from '../../components/Price';

export class PriceContainer extends Component {
    render() {
        return (
            <Price
                {...this.props}
            />
        );
    }
}


export default PriceContainer;