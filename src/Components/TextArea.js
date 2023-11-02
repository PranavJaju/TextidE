import React, { useState, useRef } from 'react';

const useUndoRedo = (initialText = '') => {
  const [text, setText] = useState(initialText);
  const history = useRef({ past: [], present: text, future: [] });

  const updateText = (newText) => {
    const { past, present } = history.current;
    history.current = {
      past: [...past, present],
      present: newText,
      future: [],
    };
    setText(newText);
  };

  const undo = () => {
    const { past, present, future } = history.current;
    if (past.length === 0) return;
    const previousText = past[past.length - 1];
    history.current = {
      past: past.slice(0, past.length - 1),
      present: previousText,
      future: [present, ...future],
    };
    setText(previousText);
  };

  const redo = () => {
    const { past, present, future } = history.current;
    if (future.length === 0) return;
    const nextText = future[0];
    history.current = {
      past: [...past, present],
      present: nextText,
      future: future.slice(1),
    };
    setText(nextText);
  };

  return {
    text,
    setText: updateText,
    undo,
    redo,
  };
};

export default function TextArea(props){
  document.title="TextidE - Home";
    // const [text, setText] = useState('');
    const { text, setText, undo, redo } = useUndoRedo();
    let text1;
    const copyToClipboard = (text) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    };
  
  
    const copyText = () => {
      copyToClipboard(text);
    };
    const lowerchange=()=>{
        text1=text.toLowerCase();
        setText(text1);
    }
    const handleReverse = (event) => {
        /* Convert string to array*/
        let strArr = text.split("");
        /* Reverse array*/
        strArr = strArr.reverse();
        /* Convert array to string*/
        let newText = strArr.join("");
        setText(newText);
      };
    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
      }
    const clrtext = ()=>{
      setText("");
    }
    const UpChange=()=>{
                text1=text.toUpperCase();
                setText(text1);  
            } 
    const onchangefun=(event)=>{
        setText(event.target.value)
    }     
    var l = text.split(" ").length;
    if (text.length===0){
        l=0
    } 


    return(
        <>

          <div className="container my-3">  
          <div>
          <label className={`text-${props.mode==="light"?"dark":"light"}`}>Enter Your Text:</label>
          <textarea  value={text} onChange={onchangefun}  rows="7" cols={170}></textarea>
          </div>
          <button  className="btn btn-primary mx-1 my-2" onClick={UpChange} > Convert to UpperCase </button>
          <button  className="btn btn-primary my-2 mx-1" onClick={lowerchange}> Convert to LowerCase </button>
          <button  className="btn btn-primary my-2 mx-1" onClick={handleReverse}> Reverse </button>
          <button  className="btn btn-primary my-2 mx-1" onClick={clrtext}> Clear </button>
          <button type="submit" onClick={speak} className="btn btn-warning mx-2 my-2">Speak</button>
          <button className="btn btn-success mx-2 my-2" onClick={copyText}>Copy to Clipboard</button>
          <button className="btn btn-info mx-2 my-2" onClick={undo} >Undo</button>
      <button className="btn btn-info mx-2 my-2" onClick={redo}>Redo</button>
          </div>
          <div className={`container text-${props.mode==="light"?"dark":"light"}`}>
            <p>{l} Words : {text.length} characters</p>
            <h3>PreView</h3>
            <p><i>{text.length>0?text:"Enter something to Preview"}</i></p>
          </div>

          </>

    )
    
}
