import React from 'react';
import Loader from './Loader';

const Loading = props => {
  if (props.error) {
    return <div style={{textAlign: 'center'}}>Error! Please refresh the page</div>;
  } else if (props.pastDelay) {
    return (
      <div style={{textAlign: 'center'}}>
        {' '}
        <Loader />{' '}
      </div>
    );
  } else {
    return null; // Avoiding Flash Of Loading Component (<200ms)
  }
};

export default Loading;
