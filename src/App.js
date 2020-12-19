import React, { useState } from 'react';
import { classToClass } from 'class-transformer';

import './App.css';

const updatableAndReRenderable = '更新された値がre-renderされる。';

const updatableButUnReRenderable =
  '更新はされるが、更新後の値がre-renderされない。';

const StateIsNumber = ({ id }) => {
  const [number, setNumber] = useState(0);
  const increment = () => {
    setNumber((previousCount) => previousCount + 1);
  };

  return (
    <tr>
      <td>{id}</td>
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

const StateIsArray = ({ id }) => {
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
      <td>{id}</td>
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

const StateIsArray2 = ({ id }) => {
  const [array, setArray] = useState([1, 2, 3]);
  const push = () => {
    setArray((previousArray) => {
      const item = previousArray[previousArray.length - 1] + 1;
      return [...previousArray, item];
    });
  };

  return (
    <tr>
      <td>{id}</td>
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

const StateIsClassInstance = ({ id }) => {
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
      <td>{id}</td>
      <td>クラスのインスタンス </td>
      <td>0</td>
      <td>
        <button onClick={increment}>更新する</button>
      </td>
      <td>{counter.count}</td>
      <td>{updatableButUnReRenderable}</td>
    </tr>
  );
};

const StateIsClassInstance2 = ({ id }) => {
  const [counter, setCounter] = useState(new Counter());
  const increment = () => {
    setCounter((previousCounter) => {
      const _previousCounter = Object.assign({}, previousCounter);
      _previousCounter.count = _previousCounter.count + 1;
      return _previousCounter;
    });
  };

  return (
    <tr>
      <td>{id}</td>
      <td>クラスのインスタンス - Object.assignでshallow cloneをする版</td>
      <td>0</td>
      <td>
        <button onClick={increment}>更新する</button>
      </td>
      <td>{counter.count}</td>
      <td>{updatableAndReRenderable}</td>
    </tr>
  );
};

const StateIsClassInstance3 = ({ id }) => {
  const [counter, setCounter] = useState(new Counter());
  const increment = () => {
    setCounter((previousCounter) => {
      const _previousCounter = { ...previousCounter };
      _previousCounter.count = _previousCounter.count + 1;
      return _previousCounter;
    });
  };

  return (
    <tr>
      <td>{id}</td>
      <td>クラスのインスタンス - spread演算子でshallow cloneをする版</td>
      <td>0</td>
      <td>
        <button onClick={increment}>更新する</button>
      </td>
      <td>{counter.count}</td>
      <td>{updatableAndReRenderable}</td>
    </tr>
  );
};

const StateIsClassInstance4 = ({ id }) => {
  const _counter = new Counter();
  _counter.counter = new Counter();
  const [counter, setCounter] = useState(_counter);
  const increment = () => {
    setCounter((previousCounter) => {
      const _previousCounter = { ...previousCounter };
      _previousCounter.counter.count = _previousCounter.counter.count + 1;
      console.log({ _previousCounter });
      return _previousCounter;
    });
  };

  return (
    <tr>
      <td>{id}</td>
      <td>クラスのインスタンス(ネスト版)</td>
      <td>0</td>
      <td>
        <button onClick={increment}>更新する</button>
      </td>
      <td>{counter.counter.count}</td>
      <td>更新のされ方がトリッキー。最初の1回目だけ+1、以降、+2ずつ増える。</td>
    </tr>
  );
};

const StateIsClassInstance5 = ({ id }) => {
  const _counter = new Counter();
  _counter.counter = new Counter();
  const [counter, setCounter] = useState(_counter);
  const increment = () => {
    setCounter((previousCounter) => {
      let _previousCounter = classToClass(previousCounter);
      _previousCounter.counter.count = _previousCounter.counter.count + 1;
      return _previousCounter;
    });
  };

  return (
    <tr>
      <td>{id}</td>
      <td>
        クラスのインスタンス(ネスト版) - class-transformerによるdeep clone
      </td>
      <td>0</td>
      <td>
        <button onClick={increment}>更新する</button>
      </td>
      <td>{counter.counter.count}</td>
      <td>{updatableAndReRenderable}</td>
    </tr>
  );
};

const App = () => {
  return (
    <table>
      <caption>useState 比較表</caption>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">ケース</th>
          <th scope="col">初期値</th>
          <th scope="col"></th>
          <th scope="col">更新後の値</th>
          <th scope="col">結果</th>
        </tr>
      </thead>
      <tbody>
        <StateIsNumber id={1} />
        <StateIsArray id={2} />
        <StateIsArray2 id={3} />
        <StateIsClassInstance id={4} />
        <StateIsClassInstance2 id={5} />
        <StateIsClassInstance3 id={6} />
        <StateIsClassInstance4 id={7} />
        <StateIsClassInstance5 id={8} />
      </tbody>
    </table>
  );
};

export default App;
