import React, { Component } from 'react';

import Room from '../../components/Room';

export class RoomContainer extends Component {
    render() {
        return (
            <Room
                {...this.props}
            />
        );
    }
}


export default RoomContainer;