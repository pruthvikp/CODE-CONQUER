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
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      const actualOutput = result.output.split("\n");
      setOutput(actualOutput);
      result.stderr ? setIsError(true) : setIsError(false);

      // Validate test cases
      const validatedTestCases = testcases.map((testcase, idx) => {
        const passed = actualOutput[idx]?.trim() === testcase.expectedOutput.trim();
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
      <Box
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
              {`Test Case ${i + 1}: ${testcase.passed ? "Passed" : "Failed"} - Output: ${testcase.actualOutput}`}
            </Text>
          ))
        ) : (
          'Click "Run Code" to see the output here'
        )}
      </Box>
    </Box>
  );
};

export default Output;
