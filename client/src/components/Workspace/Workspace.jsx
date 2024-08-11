import React, { useState, useRef } from "react";
import ProblemDescription from "./ProblemDescription";
import CodeEditor from "./CodeEditor";
import TestCases from "./TestCases";
import axios from "axios";
import "./Workspace.css";

const Workspace = ({ id }) => {
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [examples, setExamples] = useState([]);  // Initialize with an empty array
  const editorRef = useRef(null);

  const handleCompile = async () => {
    setProcessing(true);
    try {
      const response = await axios.post(`http://localhost:5000/compile`, {
        id,
        code,
      });
      setExamples(response.data.examples);
      console.log(response.data);  // Check the response structure

      return response.data.examples;
    } catch (error) {
      console.error("Error compiling code:", error);
      return [];
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
        <CodeEditor onChange={setCode} editorRef={editorRef} />
        <TestCases
          examples={examples}
          handleCompile={handleCompile}
          processing={processing}
        />
      </div>
    </div>
  );
};


export default Workspace;
