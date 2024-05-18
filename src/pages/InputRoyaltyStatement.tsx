import React from "react";
import Header from "../components/Header";

export default function InputRoyaltyStatement() {
  return (
    <div>
      <Header title="InputRoyaltyStatement" />
      <div>
        <ul>
          <li>作家名</li>
          <li>入金日</li>
          <li>出版社名</li>
          <li>入金額</li>
          <li>源泉徴収税額</li>
          <li>消費税</li>
          <li>差引金額</li>
          <li>マネジメント料</li>
          <li>振込金額</li>
          <li>振込日</li>
          <li>備考</li>
          <button>戻る</button>
          <button>登録</button>
        </ul>
      </div>
    </div>
  );
}
