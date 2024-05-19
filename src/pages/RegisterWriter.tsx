import React from 'react';
import Header from "../components/Header";
import RegisterWriterForm from "../components/RegisterWriterForm";

export default function RegisterWriter() {
  return (
    <>
      <Header title="Writer Register" discription="作家情報の登録ページ"/>
      <RegisterWriterForm />
    </>
  )
}
