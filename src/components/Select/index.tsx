import React, { useState } from 'react'
import './styles.css'

const Select: React.FC<{
  options: Array<{
    text: string;
    code: string;
  }>;
  activeOption: string;
  changeHandler: (_code: string) => void;
}> = (props) => {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <div className="select-box">
      <div className="selected-view">
        <span>{props.options.filter((option) => option.code === props.activeOption)[0]}</span>
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 6L0.602885 2.19575e-07L8.39711 9.00968e-07L4.5 6Z" fill="white"/>
        </svg>
      </div>
      <div className="options-view">
        {props.options.map((option, index) => (
          <div key={index} onClick={() => props.changeHandler(option.code)}>AAAA</div>
        ))}
      </div>
    </div>
  )
}

export default Select