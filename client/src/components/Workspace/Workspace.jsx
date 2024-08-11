import React, { useState, useRef, useEffect } from "react";
import ProblemDescription from "./ProblemDescription";
import CodeEditor from "./CodeEditor";
import TestCases from "./TestCases";
import axios from "axios";
import "./Workspace.css";
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
 import { CODE_SNIPPETS } from "./constants";


const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const handleCompile = async (language, sourceCode, testCases) => {
  try {
    const results = [];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      console.log(testCase);
      const response = await API.post("/execute", {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
          {
            content: sourceCode,
          },
        ],
        stdin: testCase.input, // Pass the input as stdin
      });
      console.log("API Response:", response.data); // Log the response to check its structure

        const output = response.data.run.stdout.trim();
        console.log("Output:", output);       
      const isCorrect = output === testCase.output.trim(); // Compare output with expected output

      results.push({
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: output,
        passed: isCorrect,
      });
    }

    return results; // Return results for all test cases
  } catch (error) {
    console.error("API call failed:", error.message || error);
    throw new Error("Failed to execute code. Please check your API connection or input parameters.");
  }
};

function Workspace({ id }) {
  const editorRef = useRef(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [examples, setExamples] = useState([""]);
  const [processing, setProcessing] = useState(false);
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const onSelectLanguage = (language) => {
    setLanguage(language);
    setCode(CODE_SNIPPETS[language]);
  };

  // const runCode = async () => {
  //   console.log("hello");
  //   const sourceCode = editorRef.current.getValue();
   
  //   if (!sourceCode) return;

  //   setProcessing(true);
  //   try {
  //     const results = await handleCompile(language, sourceCode, examples);
  //     console.log(results);
  //     setOutput(results);
  //     setIsError(results.some(result => !result.passed));
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       title: "An error occurred.",
  //       description: error.message || "Unable to run code",
  //       status: "error",
  //       duration: 6000,
  //     });
  //   } finally {
  //     setProcessing(false);
  //   }
  // };
useEffect(() => {
    const fetchProblem = async () => {
      const url = `http://localhost:5500/api/problem-details/${id}`;
      try {
        const response = await axios.get(url);
        console.log(response.data.examples);
        setExamples(response.data.examples);
      } catch (err) {
        console.error('Error fetching problem details:', err);
        //setError('Problem not found or server error');
      }
    };
    fetchProblem();
  }, [id]);
  return (
    <div className="workspace-container">
      <div className="problem-desc-container">
        <ProblemDescription id={id} setExamples={setExamples} />
      </div>
      <div className="right-pane">
        <CodeEditor onChange={setCode} editorRef={editorRef} id = {id}/>
        {/* <Button variant="outline" colorScheme="green" mb={4} isLoading={isLoading} onClick={runCode}>
          Run Code
        </Button> */}
        <Box className={`output-box ${isError ? "error" : ""}`}>
          {console.log(output)}
          {output.length > 0 ? (
            output.map((result, i) => (
              
              <div key={i}>
                <p><strong>Test Case {i + 1}</strong></p>
                <p><strong>Input:</strong> {result.input}</p>
                <p><strong>Expected Output:</strong> {result.expectedOutput}</p>
                <p><strong>Actual Output:</strong> {result.actualOutput}</p>
                <p style={{ color: result.passed ? "green" : "red" }}>
                  {result.passed ? "Passed" : "Failed"}
                </p>
              </div>
            ))
          ) : ("")}
        </Box>
        <TestCases
          examples={examples}
          handleCompile={() => handleCompile(language, code, examples)}
          processing={processing}
        />
      </div>
    </div>
  );
}

export default Workspace;
