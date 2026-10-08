import { useState } from 'react';
import './App.css';

function CalcDisplay({ dispValue }) {
  const isLongText = String(dispValue).length > 10;

  return (
    <div className={`Display ${isLongText ? 'small-text' : ''}`}>
      {dispValue}
    </div>
  );
}

function CalcButton({ buttonLabel, onClick, className = '' }) {
  return (
    <button className={`Button ${className}`} onClick={() => onClick(buttonLabel)}>
      {buttonLabel}
    </button>
  );
}

function App() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNextValue, setWaitingForNextValue] = useState(false);

  const handleButtonClick = (label) => {
    // Clear display and reset memory
    if (label === 'C') {
      setDisplay('0');
      setPrevValue(null);
      setOperator(null);
      setWaitingForNextValue(false);
      return;
    }

    // Handle operator buttons (+, -, ×, ÷)
    if (['+', '-', '×', '÷'].includes(label)) {
      setPrevValue(parseFloat(display));
      setOperator(label);
      setDisplay(label); // Shows only the pressed operator on screen
      setWaitingForNextValue(true);
      return;
    }

    // Handle equals (=) button
    if (label === '=') {
      if (operator === null || prevValue === null) return;

      const currentValue = parseFloat(display);
      let result = 0;

      switch (operator) {
        case '+':
          result = prevValue + currentValue;
          break;
        case '-':
          result = prevValue - currentValue;
          break;
        case '×':
          result = prevValue * currentValue;
          break;
        case '÷':
          result = currentValue === 0 ? 'Error' : prevValue / currentValue;
          break;
        default:
          return;
      }

      setDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
      setWaitingForNextValue(true);
      return;
    }

    // Handle number inputs
    if (waitingForNextValue) {
      setDisplay(label);
      setWaitingForNextValue(false);
    } else {
      setDisplay(display === '0' || display === 'Error' || display === 'Sean Aethan Kleine T. Nunag' ? label : display + label);
    }
  };

  const handleNameClick = () => {
    setDisplay('Sean Aethan Kleine T. Nunag');
    setPrevValue(null);
    setOperator(null);
    setWaitingForNextValue(true);
  };

  return (
    <div className="App">
      <div className="Header">Calculator of Sean Aethan Kleine T. Nunag - WMD3A</div>

      <div className="Calculator">
        <CalcDisplay dispValue={display} />

        <div className="Keypad">
          <CalcButton buttonLabel="7" onClick={handleButtonClick} />
          <CalcButton buttonLabel="8" onClick={handleButtonClick} />
          <CalcButton buttonLabel="9" onClick={handleButtonClick} />
          <CalcButton buttonLabel="÷" className="btn-operator" onClick={handleButtonClick} />

          <CalcButton buttonLabel="4" onClick={handleButtonClick} />
          <CalcButton buttonLabel="5" onClick={handleButtonClick} />
          <CalcButton buttonLabel="6" onClick={handleButtonClick} />
          <CalcButton buttonLabel="×" className="btn-operator" onClick={handleButtonClick} />

          <CalcButton buttonLabel="1" onClick={handleButtonClick} />
          <CalcButton buttonLabel="2" onClick={handleButtonClick} />
          <CalcButton buttonLabel="3" onClick={handleButtonClick} />
          <CalcButton buttonLabel="-" className="btn-operator" onClick={handleButtonClick} />

          <CalcButton buttonLabel="C" className="btn-clear" onClick={handleButtonClick} />
          <CalcButton buttonLabel="0" onClick={handleButtonClick} />
          <CalcButton buttonLabel="=" className="btn-equals" onClick={handleButtonClick} />
          <CalcButton buttonLabel="+" className="btn-operator" onClick={handleButtonClick} />
        </div>

        <button className="FooterTag" onClick={handleNameClick}>
          NUNAG
        </button>
      </div>
    </div>
  );
}

export default App;