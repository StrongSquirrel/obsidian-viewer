import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tree from './components/Tree';
import NodeContent from './components/NodeContent';

const DOCS_BASE_URL = process.env.REACT_APP_DOCS_BASE_URL;

function App() {
  const [branches, setBranches] = useState([]);
  const [nodeContent, setNodeContent] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(DOCS_BASE_URL);
      setBranches(result.data);

      const nodeContent = await axios(DOCS_BASE_URL + '/docs/README.md');
      setNodeContent(nodeContent.data);
    }
    fetchData();
  }, []);
  return (
    <div className="app-container">
      <Tree branches={branches} />
      <NodeContent content={nodeContent} />
    </div>
  );
}

export default App;
