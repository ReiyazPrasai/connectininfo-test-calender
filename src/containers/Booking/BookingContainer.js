import React, { Component } from 'react';

import Booking from '../../components/Booking';

export class BookingContainer extends Component {
    render() {
        return (
            <Booking
                {...this.props}
            />
        );
    }
}


export default BookingContainer;