import React, { Component } from 'react';

import Profile from '../../components/Profile';

export class ProfileContainer extends Component {
    render() {
        return (
            <Profile
                {...this.props}
            />
        );
    }
}


export default ProfileContainer;