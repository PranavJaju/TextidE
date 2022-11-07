import "./App.css"
import React from "react";
import{ useState } from "react";
import Navbar from "./Components/navbar";
import TextArea from "./Components/TextArea";
import Alert from "./Components/alert";
import About from "./Components/About";
import {
  BrowserRouter as Router,
  
  Routes,
  Route,
  
} from "react-router-dom";

function App() {
  const [mode,setmode]=useState("light")
  const [alrt,setalert]=useState(null)
  const showalert = (message,type)=>{
    setalert({msg:message,type:type});
    setTimeout(()=>{setalert(null)},1500)
  }
  const togglemode = ()=>{
   if (mode==="light"){
       setmode("dark");
       document.body.style.backgroundColor="black";
       showalert("Dark Mode has been enabled","success")

   }
   else{
      setmode('light');
      document.body.style.backgroundColor="white";
      showalert("Light Mode has been enabled","success")
   }
}
  return (
 <>
 <Router>
 <Navbar title="TextidE" mode={mode} togglemode={togglemode}/>
 <Alert alert={alrt}/>
        <Routes>
          <Route path="/About" element={<About mode={mode}/>}>
          </Route>
          <Route path="/" element={<TextArea mode={mode}/>}>
          </Route>
        </Routes>
  </Router>
 
        
</>   
  );
}

export default App;
