import React, {useState} from 'react'

export default function TextArea(props){
  document.title="TextidE - Home";
    const [text, setText] = useState('');
    let text1;
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
          </div>
          <div className={`container text-${props.mode==="light"?"dark":"light"}`}>
            <p>{l} Words : {text.length} characters</p>
            <h3>PreView</h3>
            <p><i>{text.length>0?text:"Enter something to Preview"}</i></p>
          </div>

          </>

    )
    
}
