import React from 'react';
import { ACTIONS } from './Layout';

const OperationButtons = ({ dispatch, operation }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }>
      {operation}
    </button>
  );
};

export default OperationButtons;
