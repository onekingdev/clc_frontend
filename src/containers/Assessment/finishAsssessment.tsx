import React, { useState, useEffect } from "react";
// @ts-ignore
import { useHistory, useParams } from "react-router-dom";

function FinishAssessment(props: any) {
  const history = useHistory();
  
  // adjust dimensions
  useEffect(() => {
    console.log("finish assessment")
    const redirect_to: any = "results"
    history.push(redirect_to);
    // document.location.href = redirect_to;
    
  }, []);

  
  return (
    <div></div>
  );
}
export default FinishAssessment
