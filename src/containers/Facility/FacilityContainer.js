import React, { Component } from 'react';

import Facility from '../../components/Facility';

export class FacilityContainer extends Component {
    render() {
        return (
            <Facility
                {...this.props}
            />
        );
    }
}


export default FacilityContainer;