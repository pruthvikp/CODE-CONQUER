import React, { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "./api";

const Output = ({ editorRef, language, testcases }) => {
  const toast = useToast();
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    console.log("hello")
    console.log(testcases)
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      console.log(result)

      const actualOutput = result.output.split("\n");
      //setOutput(actualOutput);
      console.log(actualOutput);
      result.stderr ? setIsError(true) : setIsError(false);

      // Validate test cases
      const validatedTestCases = testcases.map((testcase, idx) => {
        console.log(testcase.output.trim())
        const passed = actualOutput[idx]?.trim() === testcase.output.trim();

        return {
          ...testcase,
          actualOutput: actualOutput[idx],
          passed,
        };
      });

      setOutput(validatedTestCases);

    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      {/* <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output.length > 0 ? (
          output.map((testcase, i) => (
            <Text key={i} color={testcase.passed ? "green.500" : "red.500"}>
              {`Test Case ${i + 1}: ${testcase.passed ? "Passed" : "Failed"} - Output: ${testcase.output}`}
            </Text>
          ))
        ) :''}
      </Box> */}
    </Box>
  );
};

export default Output;
