import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import './styles.css';

/*const VariableInputForm = ({ variables, onChange }) => {
  const [newVarName, setNewVarName] = useState("");
  const [newVarValue, setNewVarValue] = useState("");

  const addVariable = () => {
    onChange(newVarName, newVarValue);
    setNewVarName("");
    setNewVarValue("");
  };
  console.log()

  return (
    <Box mb={4}>
      <HStack spacing={2}>
        <input
          type="text"
          value={newVarName}
          onChange={(e) => setNewVarName(e.target.value)}
          placeholder="Variable name"
        />
        <input
          type="text"
          value={newVarValue}
          onChange={(e) => setNewVarValue(e.target.value)}
          placeholder="Variable value"
        />
        <button onClick={addVariable}>Add Variable</button>
      </HStack>
    </Box>
  );
};
*/
const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  //const [variables, setVariables] = useState({});

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };
/*
  const handleVariableChange = (name, value) => {
    setVariables((prevVariables) => ({
      ...prevVariables,
      [name]: value,
    }));
    // Update the editor content with the latest variable values
    setValue(getCodeWithVariables(value, variables));
  };

  const getCodeWithVariables = (code, variables) => {
    let updatedCode = code;
    for (const [name, value] of Object.entries(variables)) {
      const variablePlaceholder = `{{${name}}}`;
      updatedCode = updatedCode.replace(new RegExp(variablePlaceholder, 'g'), value);
    }
    return updatedCode;
  };

  const onChange = (newValue) => {
    setValue(newValue);
    // Update the editor content with the latest variable values
    editorRef.current?.setValue(getCodeWithVariables(newValue, variables));
  };
*/
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
            //onChange={onChange}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;