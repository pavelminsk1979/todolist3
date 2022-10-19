import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type TemplateForEditItemType={
  title:string
  callback:(editText:string)=>void
}

export const TemplateForEditItem = (props:TemplateForEditItemType) => {

  const [toggle,setToggle]=useState(true)
  const [editText,setEditText]=useState(props.title)

  const addedEditTextHandler = () => {
    props.callback(editText)
    setToggle(true)
  }

  const inputOnChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    setEditText(event.currentTarget.value)
  }

  const onDoubleClickHandler = () => {
    setToggle(false)
  }

  return(
      toggle
      ?<span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
          : <TextField
              autoFocus
              onBlur={addedEditTextHandler}
              onChange={inputOnChangeHandler}
              value={editText}
              id="standard-basic"
              variant="standard" />

  )
}