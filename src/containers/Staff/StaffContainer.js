import React, { Component } from 'react';

import Staff from '../../components/Staff';

export class StaffContainer extends Component {
    render() {
        return (
            <Staff
                {...this.props}
            />
        );
    }
}


export default StaffContainer;