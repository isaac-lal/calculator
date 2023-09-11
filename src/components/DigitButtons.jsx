import React from 'react';
import { ACTIONS } from './Layout';

const DigitButtons = ({ digit, dispatch }) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  );
};

export default DigitButtons;
