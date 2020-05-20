import React, { Component } from 'react';

import Dashboard from '../../components/Dashboard';

export class DashboardContainer extends Component {
    render() {
        return (
            <Dashboard
                {...this.props}
            />
        );
    }
}


export default DashboardContainer;