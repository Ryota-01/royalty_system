import React, { RefObject, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export default function CreateRoyaltyStatementForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const writerRef = useRef<HTMLInputElement>(null); //  作家
  const depositDateRef = useRef<HTMLInputElement>(null); // 入金日
  const publisherRef = useRef<HTMLInputElement>(null); // 出版社
  const depositsRef = useRef<HTMLInputElement>(null); // 入金額
  const WithholdingTaxRef = useRef<HTMLInputElement>(null); // 源泉税額
  const taxRef = useRef<HTMLInputElement>(null); // 消費税
  const balanceOfAnAccountRef = useRef<HTMLInputElement>(null); //　差引金額
  const managementFeeRef = useRef<HTMLInputElement>(null); //　マネジメント料
  const transferAmountRef = useRef<HTMLInputElement>(null); //　振込金額
  const dateofTransferRef = useRef<HTMLInputElement>(null); //　振込日
  const remarksRef = useRef<HTMLInputElement>(null); //　備考

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const value = {
        writer: writerRef.current?.value,
        depositeDate: depositDateRef.current?.value,
        publisher: publisherRef.current?.value,
        deposits: depositsRef.current?.value,
        withHoldingTax: WithholdingTaxRef.current?.value,
        tax: taxRef.current?.value,
        balanceOfAnAccount: balanceOfAnAccountRef.current?.value,
        managementFee: managementFeeRef.current?.value,
        transferAmount: transferAmountRef.current?.value,
        dateofTransferRef: dateofTransferRef.current?.value,
        remarks: remarksRef.current?.value,
      };
      const termsDocRef = doc(db, "明細書一式", "2024年1期");
      const subCollectionRef = collection(termsDocRef, `${value.writer}`);
      const newDocRef = doc(subCollectionRef, "明細書");
      const docSnap = await getDoc(newDocRef);

      if (!docSnap.exists()) {
        // 同一名のドキュメントが存在しない場合の処理
        await setDoc(newDocRef, value);
        console.log("Success");
      } else {
        setErrorMessage("すでに明細情報が存在しています。");
      }
    } catch (e: any) {
      console.error(e.message);
      setErrorMessage("データの登録に失敗しました。");
    }
  };

  const inputValue = (name: string, id: string, type: string, ref: RefObject<HTMLInputElement>) => ({
    input: {
      name: name,
      id: id,
      type: type,
      ref: ref,
      defaultValue: name + "test",
    },
  });

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <ul>
          <li>
            <label htmlFor="writerName">作家名</label>
            <input
              {...inputValue("writerName", "writerName", "text", writerRef).input}
            />
          </li>
          <li>
            <label htmlFor="dateoftransfer">振込日</label>
            <input
              {...inputValue("dateoftransfer", "dateoftransfer", "text", dateofTransferRef).input}
            />
          </li>
          <li>
            <label htmlFor="depositdate">入金日</label>
            <input
              {...inputValue("depositdate", "depositdate", "date", depositDateRef).input}
            />
          </li>
          <li>
            <label htmlFor="publisher">出版社名</label>
            <input
              {...inputValue("publisher", "publisher", "text", publisherRef).input}
            />
          </li>
          <li>
            <label htmlFor="deposits">入金額</label>
            <input
              {...inputValue("deposits", "deposits", "text", depositsRef).input}
            />
          </li>
          <li>
            <label htmlFor="withholdingtax">源泉徴収税額</label>
            <input
              {...inputValue("withholdingtax", "withholdingtax", "text", WithholdingTaxRef).input}
            />
          </li>
          <li>
            <label htmlFor="tax">消費税</label>
            <input
              {...inputValue("", "", "text", taxRef).input}
            />
          </li>
          <li>
            <label htmlFor="balanceofanaccount">差引金額</label>
            <input
              {...inputValue("balanceofanaccount", "balanceofanaccount", "text", balanceOfAnAccountRef).input}
            />
          </li>
          <li>
            <label htmlFor="managementFee">マネジメント料</label>
            <input
              {...inputValue("managementFee", "managementFee", "text", managementFeeRef).input}
            />
          </li>
          <li>
            <label htmlFor="transferamount">振込金額</label>
            <input
              {...inputValue("transferamount", "transferamount", "text", transferAmountRef).input}
            />
          </li>
          <li>
            <label htmlFor="remarks">備考</label>
            <input
              {...inputValue("remarks", "remarks", "text", remarksRef).input}
            />
          </li>
          <div>
          </div>
          <p>{errorMessage}</p>
          <button>戻る</button>
          <button>登録</button>
        </ul>
      </form>
    </div>
  )
}
