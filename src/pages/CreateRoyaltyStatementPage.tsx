import React from "react";
import Header from "../components/Header";
import CreateRoyaltyStatementForm from "../components/forms/CreateRoyaltyStatementForm";

export default function CreateRoyaltyStatementPage() {
  return (
    <>
      <Header title="Royalty Statement" discription="印税明細書作成ページ"/>
      <CreateRoyaltyStatementForm />
    </>
  );
}
