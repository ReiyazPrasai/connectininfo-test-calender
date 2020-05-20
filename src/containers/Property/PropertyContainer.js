import React, { Component } from 'react';

import Property from '../../components/Property';

export class PropertyContainer extends Component {
    render() {
        return (
            <Property
                {...this.props}
            />
        );
    }
}


export default PropertyContainer;