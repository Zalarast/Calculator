import React from "react";
import "./CSS/App.css";

function App() {
  const [inputValue, setInputValue] = React.useState<InputValueProps>({
    values: [],
    lastInput: "",
    outputValue: "",
    result: 0,
  });
  const [tmp, setTmp] = React.useState<TmpProps>({ values: "", operator: "" });
  const [operator, setOperator] = React.useState("");
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = (event.target as HTMLInputElement);
    if (
      inputValue.lastInput !== target.title ||
      target.title !== "operator"
    ) {
      if (target.title !== "operator") {
        setTmp({ ...tmp, values: tmp.values + target.value });
        setInputValue({
          ...inputValue,
          lastInput: target.title,
          outputValue: inputValue.outputValue + target.value,
        });
      } else {
        setInputValue({
          ...inputValue,
          values: tmp.values
            ? [...inputValue.values, tmp.values]
            : [...inputValue.values],
          lastInput: target.title,
          outputValue: inputValue.outputValue + target.value,
        });
        if (tmp.operator) setOperator(tmp.operator);
        setTmp({ values: "", operator: target.value });
      }
    }
  };

  React.useEffect(() => {
    if (operator) {
      let result = 0;
      switch (operator) {
        case "+": {
          if (inputValue.result)
            result = inputValue.result + parseInt(inputValue.values[0]);
          else
            result =
              parseInt(inputValue.values[0]) + parseInt(inputValue.values[1]);

          break;
        }
        case "-": {
          if (inputValue.result)
            result = inputValue.result - parseInt(inputValue.values[0]);
          else
            result =
              parseInt(inputValue.values[0]) - parseInt(inputValue.values[1]);

          break;
        }
        case "*": {
          if (inputValue.result)
            result = inputValue.result * parseInt(inputValue.values[0]);
          else
            result =
              parseInt(inputValue.values[0]) * parseInt(inputValue.values[1]);

          break;
        }
        case "/": {
          if (inputValue.result)
            result = inputValue.result / parseInt(inputValue.values[0]);
          else
            result =
              parseInt(inputValue.values[0]) / parseInt(inputValue.values[1]);

          break;
        }
        default: {
          setOperator("");
          break;
        }
      }
      setInputValue({
        ...inputValue,
        result: result,
        values: [],
      });
      setOperator("");
    }
  }, [operator, inputValue]);

  return (
    <div className="App">
      <div className="calculator">
        <h1>Калькулятор</h1>
        <h2>Результат</h2>
        <input disabled value={inputValue.result || 0} />
        <h2>Действия</h2>
        <input disabled value={inputValue.outputValue} />
        <div className="buttons">
          <div className="numbers">
            <button onClick={handleClick} value="1" title="number">
              1
            </button>
            <button onClick={handleClick} value="2" title="number">
              2
            </button>
            <button onClick={handleClick} value="3" title="number">
              3
            </button>
            <button onClick={handleClick} value="4" title="number">
              4
            </button>
            <button onClick={handleClick} value="5" title="number">
              5
            </button>
            <button onClick={handleClick} value="6" title="number">
              6
            </button>
            <button onClick={handleClick} value="7" title="number">
              7
            </button>
            <button onClick={handleClick} value="8" title="number">
              8
            </button>
            <button onClick={handleClick} value="9" title="number">
              9
            </button>
            <button
              onClick={handleClick}
              className="item10"
              value="0"
              title="number"
            >
              0
            </button>
            <button onClick={handleClick} value="." title="number">
              .
            </button>
          </div>
          <div className="operators">
            <button onClick={handleClick} value="+" title="operator">
              +
            </button>
            <button onClick={handleClick} value="-" title="operator">
              -
            </button>
            <button onClick={handleClick} value="*" title="operator">
              *
            </button>
            <button onClick={handleClick} value="/" title="operator">
              /
            </button>
          </div>
          <div className="funtionalBtn">
            <button
              className="item15"
              onClick={() => {
                setInputValue({
                  values: [],
                  lastInput: "",
                  outputValue: "",
                  result: 0,
                });
                setOperator("");
                setTmp({ operator: "", values: "" });
              }}
            >
              С
            </button>
            <button
              className="item16"
              onClick={() => {
                setOperator(tmp.operator);
                setInputValue({
                  ...inputValue,
                  values: [...inputValue.values, tmp.values],
                });
                setTmp({ operator: "", values: "" });
              }}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
