import { breakStatement } from "@babel/types";
import React, { useState, useEffect } from "react";



import Editor from "./Editor";

import useLocalStorage from "./hooks/useLocalStorage";




function App() {
  const [editorLanguage, setEditorLanguage] = useState('');
  const[ html, setHtml] = useLocalStorage('html','')
  const[ css, setCss] = useLocalStorage('css','')
  const[ js, setJs] = useLocalStorage('js','')
  const[ srcDoc, setHotReload] = useState('')

  useEffect(() =>{
    const timeout = setTimeout(()=>{
      setHotReload(
      `
      <html>
        <body>${html}</body>
        <style>${css}</styles>
        <script>${js}</script>
      </html>
      `
      )
    }, 300)

    return () => clearTimeout(timeout)
  }, [html,css,js])
 
  return(
    <>
    
    <h1>Online Code Editor</h1>
<form>

  <input
    type="radio"
    id="javascript"
    name="language"
    value="javascript"
    checked={editorLanguage === "javascript"}
    onChange={() => setEditorLanguage("javascript")}
  />
  <label htmlFor="javascript">JavaScript</label>
  <input
    type="radio"
    id="xml"
    name="language"
    value="markup"
    checked={editorLanguage === "markup"}
    onChange={() => setEditorLanguage("markup")}
  />
  <label htmlFor="xml">XML</label>
  <input
    type="radio"
    id="css"
    name="language"
    value="css"
    checked={editorLanguage === "css"}
    onChange={() => setEditorLanguage("css")}
  />
  <label htmlFor="css">CSS</label>
</form>


    <div className="pane top-pane">
      <Editor 
        language="xml"
        displayName = "HTML"
        value={html}
        onChange={setHtml}
      />
      <Editor 
        language="css"
        displayName = "CSS"
        value={css}
        onChange={setCss}
      />
      <Editor 
        language="javascript"
        displayName = "JS"
        value={js}
        onChange={setJs}
      />
    </div>
    <h2>Live Output</h2>
    <div className="pane">
      
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"

      />
    </div>
    </>
  )

}
export default App;
