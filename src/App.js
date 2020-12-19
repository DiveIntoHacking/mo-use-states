import React, { useState } from 'react';

function App() {
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

export default App;
