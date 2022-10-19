import st from "./Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {BootstrapButton} from "./MaterialUiCommon/FilterButton";
import {TextField} from "@mui/material";

type TemplateForCreatingItemType={
  callback:(textInput: string)=>void
}

export const TemplateForCreatingItem = ({callback}:TemplateForCreatingItemType) => {

  const [textInput, SetTextInput] = useState('')
  const [errorNullText,setErrorNullText]=useState(false)

  const addedNewTaskHandler = () => {
    if (textInput.trim() != '') {
      callback(textInput.trim().toUpperCase().repeat(2))
      SetTextInput('')
    } else {setErrorNullText(true)}

  }

  const creatingTextInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    SetTextInput(event.currentTarget.value)
    setErrorNullText(false)
  }

  const clickEnterAddedTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addedNewTaskHandler()
    }
  }

  return(
      <div>
        <TextField
            className={errorNullText?st.frameInput:''}
            onKeyPress={clickEnterAddedTaskHandler}
            value={textInput}
            onChange={creatingTextInputHandler}
            size={"small"}
            id="outlined-basic"
            variant="outlined" />

          <BootstrapButton
              size="small"
              variant="contained"
              onClick={addedNewTaskHandler}
          >
              creating
          </BootstrapButton>

        {errorNullText&&<div className={st.allert}>
          НЕОБХОДИМ И ОБСАЛЮТНО ОБЯЗАТЕЛЕН ТЕКСТ </div>}
      </div>
  )
}