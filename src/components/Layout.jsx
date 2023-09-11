import React, { useReducer } from 'react';
import DigitButtons from './DigitButtons';
import OperationButtons from './OperationButtons';
import '../index.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      if (payload.digit === '0' && state.currentOperand === '0') return state;
      if (payload.digit === '.' && state.currentOperand.includes('.'))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''} ${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return state;

      if (state.currentOperand == null)
        return {
          ...state,
          operation: payload.operation,
        };
      if (state.previousOperand == null)
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };

      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1)
        return {
          ...state,
          currentOperand: null,
        };

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1), // removes last digit from currentOperand
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      )
        return state;

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(curr)) return '';

  let computation = '';

  switch (operation) {
    case '+':
      computation = prev + curr;
      break;
    case '-':
      computation = prev - curr;
      break;
    case 'x':
      computation = prev * curr;
      break;
    case '÷':
      computation = prev / curr;
      break;
  }

  return computation.toString();
};

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

const formatOperand = operand => {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};
const Layout = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <section className='calculator__grid'>
      <div className='calculator__output'>
        <div className='operand__previous'>
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className='operand__current'>{formatOperand(currentOperand)}</div>
      </div>

      <button
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        className='utility__span-two'>
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButtons
        operation='÷'
        dispatch={dispatch}
      />
      <DigitButtons
        digit='1'
        dispatch={dispatch}
      />
      <DigitButtons
        digit='2'
        dispatch={dispatch}
      />
      <DigitButtons
        digit='3'
        dispatch={dispatch}
      />
      <OperationButtons
        operation='x'
        dispatch={dispatch}
      />
      <DigitButtons
        digit='4'
        dispatch={dispatch}
      />
      <DigitButtons
        digit='5'
        dispatch={dispatch}
      />
      <DigitButtons
        digit='6'
        dispatch={dispatch}
      />
      <OperationButtons
        operation='+'
        dispatch={dispatch}
      />
      <DigitButtons
        digit='7'
        dispatch={dispatch}
      />
      <DigitButtons
        digit='8'
        dispatch={dispatch}
      />
      <DigitButtons
        digit='9'
        dispatch={dispatch}
      />
      <OperationButtons
        operation='-'
        dispatch={dispatch}
      />
      <DigitButtons
        digit='.'
        dispatch={dispatch}
      />
      <DigitButtons
        digit='0'
        dispatch={dispatch}
      />
      <button
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        className='utility__span-two'>
        {' '}
        ={' '}
      </button>
    </section>
  );
};

export default Layout;
