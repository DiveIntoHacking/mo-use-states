import React, { useState } from 'react';
import { classToPlain, plainToClass } from 'class-transformer';

import './App.css';

const updatableAndReRenderable = '更新された値がre-renderされる。';

const updatableButUnReRenderable =
  '更新はされるが、更新後の値がre-renderされない。';

const StateIsNumber = () => {
  const [number, setNumber] = useState(0);
  const increment = () => {
    setNumber((previousCount) => previousCount + 1);
  };

  return (
    <tr>
      <td>1</td>
      <td>数値</td>
      <td>0</td>
      <td>
        <button onClick={increment}>更新する</button>
      </td>
      <td>{number}</td>
      <td>{updatableAndReRenderable}</td>
    </tr>
  );
};

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
    <tr>
      <td>2</td>
      <td>配列 - その1</td>
      <td>[{[1, 2, 3].toString()}]</td>
      <td>
        <button onClick={push}>更新する</button>
      </td>
      <td>[{array.toString()}]</td>
      <td>{updatableButUnReRenderable}</td>
    </tr>
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
    <tr>
      <td>3</td>
      <td>配列 - その2</td>
      <td>[{[1, 2, 3].toString()}]</td>
      <td>
        <button onClick={push}>更新する</button>
      </td>
      <td>[{array.toString()}]</td>
      <td>{updatableAndReRenderable}</td>
    </tr>
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
    <tr>
      <td>4</td>
      <td>クラスのインスタンス - その1</td>
      <td>0</td>
      <td>
        <button onClick={increment}>更新する</button>
      </td>
      <td>{counter.count}</td>
      <td>{updatableButUnReRenderable}</td>
    </tr>
  );
};

const StateIsClassInstance2 = () => {
  const [counter, setCounter] = useState(new Counter());
  const increment = () => {
    setCounter((previousCounter) => {
      const _previousCounter = Object.assign({}, previousCounter);
      _previousCounter.count = _previousCounter.count + 1;
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

const StateIsClassInstance3 = () => {
  const [counter, setCounter] = useState(new Counter());
  const increment = () => {
    setCounter((previousCounter) => {
      const _previousCounter = { ...previousCounter };
      _previousCounter.count = _previousCounter.count + 1;
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

const StateIsClassInstance4 = () => {
  const _counter = new Counter();
  _counter.counter = new Counter();
  const [counter, setCounter] = useState(_counter);
  const increment = () => {
    setCounter((previousCounter) => {
      let serializedPreviousCounter = classToPlain(previousCounter);
      let _previousCounter = plainToClass(Counter, serializedPreviousCounter);
      _previousCounter.counter.count = _previousCounter.counter.count + 1;
      return _previousCounter;
    });
  };

  return (
    <div>
      <button onClick={increment}>更新する</button>
      count: {counter.counter.count}
    </div>
  );
};

const App = () => {
  return (
    <table>
      <caption>useState 比較表</caption>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">ケース</th>
        <th scope="col">初期値</th>
        <th scope="col"></th>
        <th scope="col">更新後の値</th>
        <th scope="col">結果</th>
      </tr>
      <StateIsNumber />
      <StateIsArray />
      <StateIsArray2 />
      <StateIsClassInstance />
      <StateIsClassInstance2 />
      <StateIsClassInstance3 />
      <StateIsClassInstance4 />
    </table>
  );
};

export default App;
