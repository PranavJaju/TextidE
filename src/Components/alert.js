import React from "react";
export default function Alert(props){
    return(
        <div style={{height:"45px"}}>
        {props.alert&&<div class="alert alert-success alert-dismissible fade show" role="alert">
        {props.alert.msg}
        
      </div>}
      </div>
       
    )

    }


