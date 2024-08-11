import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./constants";
import Output from "./Output";
import { useEffect  } from "react";
import axios from "axios";
const CodeEditor = ({id}) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [testCase, setTestCase] = useState([]);
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  useEffect(() => {
    const fetchProblem = async () => {
      const url = `http://localhost:5500/api/problem-details/${id}`;
      try {
        const response = await axios.get(url);
        console.log(response.data.examples);
        setTestCase(response.data.examples);
      } catch (err) {
        console.error('Error fetching problem details:', err);
        //setError('Problem not found or server error');
      }
    };
    fetchProblem();
  }, [id]);

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} testcases={testCase} />
      </HStack>
    </Box>
  );
};
export default CodeEditor;