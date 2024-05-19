import React from "react";
import Header from "../components/Header";
import WritersListItem from "../components/WritersListItem";

export default function WritersList() {
  return (
    <>
      <Header title="Writers" discription="登録済みの作家情報の一覧ページ" />
      <WritersListItem />
    </>
  );
}
