import React from "react";
import Header from "../components/Header";

export default function RegisterPublisher() {
  return (
    <div>
      <Header title="RegisterPublisher" />
      <div>
        <ul>
          <li>出版社名</li>
          <li>フリガナ</li>
          <li>明細種別（WEB or 郵送）</li>
          <button>戻る</button>
          <button>登録</button>
        </ul>
      </div>
    </div>
  );
}
