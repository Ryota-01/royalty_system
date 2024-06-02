import React from "react";
import Header from "../components/Header";
import WritersListTable from "../components/table/WritersListTable";

export default function WritersListPage() {
  return (
    <>
      <Header title="Writers" discription="登録済みの作家情報の一覧ページ" />
      <WritersListTable />
    </>
  );
}
