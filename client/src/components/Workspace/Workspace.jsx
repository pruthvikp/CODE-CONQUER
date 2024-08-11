import React, { useState } from "react";
import ProblemDescription from "./ProblemDescription";
import CodeEditor from "./CodeEditor";
import TestCases from "./TestCases";
import axios from "axios";
import "./Workspace.css";

const Workspace = ({ id }) => {
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [testcases, setTestcases] = useState([]);

  const handleCompile = async () => {
    setProcessing(true);
    try {
      const response = await axios.post(``, {
        id,
        code,
      });
      setTestcases(response.data.testcases);
    } catch (error) {
      console.error("Error compiling code:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="workspace-container">
      <div className="problem-desc-container">
        <ProblemDescription id={id} />
      </div>
      <div className="right-pane">
        <CodeEditor onChange={setCode} />
        <TestCases 
          testcases={testcases} 
          handleCompile={handleCompile} 
          processing={processing} 
        />
      </div>
    </div>
  );
};

export default Workspace;