import React, { useState } from "react";

const TestCases = ({ examples, handleCompile, processing }) => {
  console.log(examples);
  const [results, setResults] = useState([]);

  const handleRunTestCases = async () => {
    const results = await handleCompile();
    console.log(results)
    setResults(results);  // Set the results to display them
  };

  return (
    <div className="testcase-container">
      <div className="test-cases">
        <div className="test-cases-heading">Testcases</div>
        {examples?.map((example, idx) => (
          <div key={idx}>
            <div className="test-case-number">Case {idx + 1}</div>
            <div className="testcases-input-container">
              <p>Input:</p>
              <div className="testcase-input">{example.input}</div>
            </div>
            <div className="testcases-output-container">
              <p>Expected Output:</p>
              <div className="testcase-output">{example.output}</div>
            </div>
            {results[idx] && (
              <div className="testcases-result-container">
                <p>Result:</p>
                <div className={`testcase-result ${results[idx].passed ? "passed" : "failed"}`}>
                  {results[idx].passed ? "Passed" : "Failed"} - Output: {results[idx].output}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="compile-btn-container">
        <button onClick={handleRunTestCases} disabled={processing}>
          {processing ? "Processing..." : "Compile and Execute"}
        </button>
      </div>
    </div>
  );
};

export default TestCases;