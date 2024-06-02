import React from "react";
import Header from "../components/Header";
import RegisterPublisherForm from "../components/forms/RegisterPublisherForm";

export default function RegisterPublisherPage() {
  return (
    <>
      <Header title="Publisher Register" discription="出版社情報の登録ページ"/>
      <RegisterPublisherForm />
    </>
  )
}
