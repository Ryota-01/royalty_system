import React from "react";
import Alert from "@mui/material/Alert";

interface Message {
  message: string
}

//　上手くいったよ的なアラート
export function BasicAlert(props: Message) {
  const message = props.message
  return <Alert severity="success">{message}</Alert>;
}

// 何かお知らせしたい時のアラート
export function InfoBasicAlert(props: Message) {
  const message = props.message
  return <Alert severity="info">{message}</Alert>;
}

// 注意喚起したい時のアラート
export function WarningBasicAlert(props: Message) {
  const message = props.message
  return (
    <Alert severity="warning">
      {message}
    </Alert>
  );
}

// エラーの時のアラート
export function ErrorBasicAlert(props: Message) {
  const message = props.message
  return <Alert severity="error">{message}</Alert>;
}
