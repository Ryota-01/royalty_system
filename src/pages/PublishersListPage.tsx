import React from "react";
import Header from "../components/Header";
import PublishersListTable from "../components/table/PublishersListTable";

export default function PublishersListPage() {
  return (
    <>
      <Header title="PublishersList" discription="登録済みの出版社情報の一覧ページ"/>
      <PublishersListTable />
    </>
  );
}
