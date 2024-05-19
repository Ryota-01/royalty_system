import React from "react";
import Header from "../components/Header";
import CreateRoyaltyStatementForm from "../components/CreateRoyaltyStatementForm";

export default function CreateRoyaltyStatement() {
  return (
    <>
      <Header title="Royalty Statement" discription="印税明細書作成ページ"/>
      <CreateRoyaltyStatementForm />
    </>
  );
}
