import React, { useState } from 'react';

function StateIsNumber() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <div>
      count: {count} <button onClick={increment}>click me</button>
    </div>
  );
}

const App = () => {
  return <StateIsNumber />;
};

export default App;
