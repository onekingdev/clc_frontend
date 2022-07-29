import React, { useState, useEffect } from "react";
// @ts-ignore
import { useHistory, useParams } from "react-router-dom";

function FinishSignup(props: any) {
  const { to } = useParams();
  const history = useHistory();
  const [width, setWidth] = useState(window.innerWidth);
  
  // adjust dimensions
  useEffect(() => {
    console.log("hello")
    const redirect_to = localStorage.getItem('redirect_to')
    history.push(redirect_to);
    // setTimeout(function() { history.push(redirect_to); }, 5000);
    
  }, []);

  
  return (
    <div></div>
  );
}
export default FinishSignup
