import React, { useState } from "react";
import "./Workspace.css";
import { Editor } from "@monaco-editor/react"; // Ensure correct import

const Playground = ({ onChange }) => {
  const [value, setValue] = useState("");

  const handleEditorChange = (newValue) => {
    setValue(newValue); // Update internal state
    onChange(newValue); // Notify parent component of the change
  };

  return (
    <div className="editor-container">
      <div className="code-editor-heading">JavaScript</div>
      <Editor
        width="100%"
        language="javascript"
        value={value}
        defaultValue="// Write Your Code Here...\n// Work on process for dynamic experience."
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default Playground;
