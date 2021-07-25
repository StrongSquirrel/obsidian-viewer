import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DOCS_BASE_URL = process.env.REACT_APP_DOCS_BASE_URL;

function App() {
  const [tree, setTree] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log({DOCS_BASE_URL});
      const result = await axios(DOCS_BASE_URL);
      setTree(result.data);
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <pre>{JSON.stringify(tree, null, 2)}</pre>
    </div>
  );
}

export default App;
