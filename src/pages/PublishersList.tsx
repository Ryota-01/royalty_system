import React from "react";
import Header from "../components/Header";
import PublishersListItem from "../components/PublishersListItem";

export default function PublishersList() {
  return (
    <>
      <Header title="PublishersList" discription="登録済みの出版社情報の一覧ページ"/>
      <PublishersListItem />
    </>
  );
}
