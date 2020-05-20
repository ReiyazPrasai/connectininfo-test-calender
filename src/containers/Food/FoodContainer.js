import React, { Component } from 'react';

import Food from '../../components/Food';

export class FoodContainer extends Component {
    render() {
        return (
            <Food
                {...this.props}
            />
        );
    }
}


export default FoodContainer;