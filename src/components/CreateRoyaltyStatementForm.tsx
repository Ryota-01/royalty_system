import React, { RefObject, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import { ErrorBasicAlert } from "./BasicAlert";
import { formItems } from "./CreateRoyaltyStatementFormItems";
import CreateRoyaltyStatementFormTable from "./CreateRoyaltyStatementFormTable";

export default function CreateRoyaltyStatementForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckedError, setIsCheckedError] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const writerRef = useRef<HTMLInputElement>(null); //  作家
  const depositDateRef = useRef<HTMLInputElement>(null); // 入金日
  const publisherRef = useRef<HTMLInputElement>(null); // 出版社
  const depositsRef = useRef<HTMLInputElement>(null); // 入金額
  const withholdingTaxRef = useRef<HTMLInputElement>(null); // 源泉税額
  const taxRef = useRef<HTMLInputElement>(null); // 消費税
  const balanceOfAnAccountRef = useRef<HTMLInputElement>(null); //　差引金額
  const percentageRef = useRef<HTMLInputElement>(null); //　マネジメント料
  const managementFeeRef = useRef<HTMLInputElement>(null); //　マネジメント料
  const transferAmountRef = useRef<HTMLInputElement>(null); //　振込金額
  const dateofTransferRef = useRef<HTMLInputElement>(null); //　振込日
  const remarksRef = useRef<HTMLInputElement>(null); //　備考

  // formのinputaRef属性にmapで展開させる
  const refs: { [key: string]: RefObject<HTMLInputElement> } = {
    writer: writerRef,
    depositdate: depositDateRef,
    publisher: publisherRef,
    deposits: depositsRef,
    tax: taxRef,
    withholdingtax: withholdingTaxRef,
    balanceofanaccount: balanceOfAnAccountRef,
    percentage: percentageRef,
    managementFee: managementFeeRef,
    transferamount: transferAmountRef,
    remarks: remarksRef,
  }

  // 登録ボタンを押した際のデータベースへの登録処理
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const value = {
        writer: writerRef.current?.value,
        depositeDate: depositDateRef.current?.value,
        publisher: publisherRef.current?.value,
        deposits: depositsRef.current?.value,
        withHoldingTax: withholdingTaxRef.current?.value,
        tax: taxRef.current?.value,
        balanceOfAnAccount: balanceOfAnAccountRef.current?.value,
        percentage: percentageRef.current?.value,
        managementFee: managementFeeRef.current?.value,
        transferAmount: transferAmountRef.current?.value,
        dateofTransferRef: dateofTransferRef.current?.value,
        remarks: remarksRef.current?.value,
      };
      console.log(value)
      const termsDocRef = doc(db, "明細書一式", "2024年1期");
      const subCollectionRef = collection(termsDocRef, `${value.writer}`);
      const newDocRef = doc(subCollectionRef, "明細書");
      const docSnap = await getDoc(newDocRef);
      if (!docSnap.exists()) {
        // 同一名のドキュメントが存在しない場合の処理
        await setDoc(newDocRef, value);
        console.log("Success");
      } else {
        setIsCheckedError(true);
        setErrorMessage("すでに明細情報が存在しています。");
      }
    } catch (e: any) {
      setIsCheckedError(true);
      console.error(e.message);
      setErrorMessage("データの登録に失敗しました。");
    }
  };

  const handleFocus = (e: any) => {
    setIsFocus(true);
  }
  const handleBlur = (e: any) => {
    setIsFocus(false);
  }

  const styles = {
    table: {
      width: "50%",
      borderCollapse: "collapse" as "collapse",
    },
    thead: {
      fontWeight: "normal"
    },
    td: {
      backgroundColor: "#E5E5E5",
      padding: "10px 25px",
      fontSize: "0.9rem"
    },
    th: {
      fontWeight: "normal",
      backgroundColor: "#E5E5E5",
      fontSize: "0.9rem",
    },
    leftth: {
      width: "80px",
      fontWeight: "normal",
      backgroundColor: "#E5E5E5",
      fontSize: "0.9rem",
      letterSpacing: "1px",
    },
    input: {
      width: "100%",
      border: "none",
      padding: "4px "
    }
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <Box sx={{ width: "92%", margin: "20px auto" }}>
          {isCheckedError &&
            <Box mb={2}>
              <ErrorBasicAlert message={errorMessage} />
            </Box>
          }
          <table style={styles.table}>
            <tbody>
              <tr style={{ height:"40px" }}>
                <th scope="row" style={styles.leftth}>
                  <label htmlFor="dateoftransfer">振込日</label>
                </th>
                <td style={styles.td}>
                  <input
                    name="dateoftransfer"
                    id="dateoftransfer"
                    type="date"
                    ref={dateofTransferRef}
                    required
                    style={styles.input}
                  />
                </td>
              </tr>
              <tr style={{ height:"40px" }}>
                <th scope="row" style={styles.leftth}>
                  <label htmlFor="writerName">作家名</label>
                </th>
                <td style={styles.td}>
                  <input
                    name="writerName"
                    id="writerName"
                    type="text"
                    ref={writerRef}
                    placeholder="INZEI TARO"
                    style={styles.input}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <CreateRoyaltyStatementFormTable />
          <Button type="submit">登録</Button>
        </Box>
      </form >
    </>
  )
}
