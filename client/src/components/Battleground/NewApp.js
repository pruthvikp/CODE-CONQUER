import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, useToast, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import "./NewApp.css";

const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

const CODE_SNIPPETS = {
  javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp: `using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n`,
  php: `<?php\n\n$name = 'Alex';\necho $name;\n`,
};

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {
  try {
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    });

    return response.data;
  } catch (error) {
    console.error("API call failed:", error.message || error);
    throw new Error("Failed to execute code. Please check your API connection or input parameters.");
  }
};

function NewApp() {
  const editorRef = useRef();
  const [value, setValue] = useState(CODE_SNIPPETS.javascript);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [uuid, setUuid] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [username, setUsername] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchUuid = async () => {
      try {
        const newUuid = uuidv4();
        setUuid(newUuid);
      } catch (error) {
        console.error("Error fetching UUID:", error);
      }
    };
    fetchUuid();
  }, []);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelectLanguage = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    const startTime = Date.now();
    try {
      setIsLoading(true);
      const response = await executeCode(language, sourceCode);
      console.log(response);

      const { run, stderr } = response;
      const endTime = Date.now();
      const compilationTime = endTime - startTime;

      setOutput(run.output.split('\n')); // Split the output by new lines to treat it as an array
      setIsError(!!stderr);

      await axios.post('http://localhost:5500/api/leaderboard', {
        uuid: uuid,
        username: username, // Include username in the request
        language: language,
        compilationTime: compilationTime,
        success: !stderr,
      });

      const leaderboardResponse = await axios.get('http://localhost:5500/api/leaderboard');
      setLeaderboard(leaderboardResponse.data);

    } catch (error) {
      console.error(error);
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

  const registerUser = async () => {
    try {
      setIsRegistering(true);
      const response = await axios.post('http://localhost:5500/api/register', { username });
      setUuid(response.data.uuid);
      toast({
        title: "Registration successful.",
        description: "User registered successfully.",
        status: "success",
        duration: 6000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Registration failed.",
        description: error.message || "Unable to register user",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Box className="app-container">
      <Box className="language-selector">
        <FormControl id="username" isRequired mt={4}>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <Button
          onClick={registerUser}
          colorScheme="blue"
          isLoading={isRegistering}
          mt={2}
        >
          Register
        </Button>
        <Text mb={2} fontSize="lg">Language:</Text>
        <Menu isLazy>
          <MenuButton as={Button}>{language}</MenuButton>
          <MenuList>
            {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
              <MenuItem key={lang} onClick={() => onSelectLanguage(lang)}>
                {lang} <Text as="span" fontSize="sm" color="gray.600">({version})</Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <section className="sample-problem-description">
        <Text fontSize="lg" fontWeight="bold">Problem:</Text>
        <Text mt={2}>
          Write a function that takes a name as an argument and prints a greeting message to the console. 
          The message should be in the format: "Hello, [name]!" where [name] is the argument passed to the function.
        </Text>
        </section>
      </Box>
        
      <Box className="editor-container">
        <Editor
          key={language}
          options={{ minimap: { enabled: false } }}
          theme="vs-dark"
          height="70vh"
          language={language}
          value={value}
          onMount={onMount}
          onChange={(value) => setValue(value)}
        />
        <Box className="output-container">
          <Button variant="outline" colorScheme="green" mb={4} isLoading={isLoading} onClick={runCode}>
            Run Code
          </Button>
          <Box className={`output-box ${isError ? "error" : ""}`}>
            {output ? (
              Array.isArray(output) ? (
                output.map((line, i) => <Text key={i}>{line}</Text>)
              ) : (
                <Text>{output}</Text>
              )
            ) : 'Click "Run Code" to see the output here'}
          </Box>
        </Box>
      </Box>

      <Box className="leaderboard-container">
        <Text mb={2} fontSize="lg">Leaderboard</Text>
        <Box className="leaderboard-box">
          {leaderboard.map((entry, index) => (
            <Text key={index}>
              {`${index + 1}. Username: ${entry.username} - Time: ${entry.compilationTime}ms - Accuracy: ${entry.success ? 'Success' : 'Failure'}`}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default NewApp;
