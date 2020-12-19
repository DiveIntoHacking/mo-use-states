import React, { useState } from 'react';

const StateIsNumber = () => {
  const [number, setNumber] = useState(0);
  const increment = () => {
    setNumber((previousCount) => previousCount + 1);
  };

  return (
    <div>
      <button onClick={increment}>更新する</button>
      number: {number}
    </div>
  );
};

/* 状態は更新されるものの、 re-renderされないので、期待の動きとはならない。 */
const StateIsArray = () => {
  const [array, setArray] = useState([1, 2, 3]);
  const push = () => {
    setArray((previousArray) => {
      const item = previousArray[previousArray.length - 1] + 1;
      previousArray.push(item);
      console.log(previousArray);
      return previousArray;
    });
  };

  return (
    <div>
      <button onClick={push}>更新する</button>
      array: {array.toString()}
    </div>
  );
};

const StateIsArray2 = () => {
  const [array, setArray] = useState([1, 2, 3]);
  const push = () => {
    setArray((previousArray) => {
      const item = previousArray[previousArray.length - 1] + 1;
      return [...previousArray, item];
    });
  };

  return (
    <div>
      <button onClick={push}>更新する</button>
      array: {array.toString()}
    </div>
  );
};

class Counter {
  constructor() {
    this.count = 0;
  }
}

const StateIsClassInstance = () => {
  const [counter, setCounter] = useState(new Counter());
  const increment = () => {
    setCounter((previousCounter) => {
      previousCounter.count = previousCounter.count + 1;
      console.log({ count: previousCounter.count });
      return previousCounter;
    });
  };

  return (
    <div>
      <button onClick={increment}>更新する</button>
      count: {counter.count}
    </div>
  );
};

const StateIsClassInstance2 = () => {
  const [counter, setCounter] = useState(new Counter());
  const increment = () => {
    setCounter((previousCounter) => {
      previousCounter.count = previousCounter.count + 1;

      const _previousCounter = Object.assign(
        Object.create(Object.getPrototypeOf(previousCounter)),
        previousCounter
      );

      return _previousCounter;
    });
  };

  return (
    <div>
      <button onClick={increment}>更新する</button>
      count: {counter.count}
    </div>
  );
};

const App = () => {
  return (
    <>
      <StateIsNumber />
      <StateIsArray />
      <StateIsArray2 />
      <StateIsClassInstance />
      <StateIsClassInstance2 />
    </>
  );
};

export default App;
