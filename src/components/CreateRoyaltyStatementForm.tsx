import React, { RefObject, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import { ErrorBasicAlert } from "./BasicAlert";
import { formItems } from "./CreateRoyaltyStatementFormItems";
import InputWithholdingTaxFormTable from "./InputWithholdingTaxFormTable";

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
      padding: "22px 25px",
      fontSize: "0.9rem"
    },
    th: {
      fontWeight: "normal",
      backgroundColor: "#E5E5E5",
      fontSize: "0.9rem",
      padding: "10px 0",
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

  // function replaceFormatNumber(numberText: any) {
  //   if (!numberText) {
  //     return;
  //   }
  //   return String(numberText).replace(/\d+/, function (m) {
  //     return m.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  //   })
  // }

  // function replaceNumberText(formatNumber: any) {
  //   if (!formatNumber) {
  //     return "";
  //   }
  //   return formatNumber.replace(/,/g, '');
  // }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let value = e.target.value;
  //   // カンマ区切りされた文字列をフラットな数字列に変換
  //   value = String(replaceNumberText(value));
  //   value = replaceFormatNumber(value);
  //   return value;
  // }

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
              <tr>
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
              <tr>
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
          <InputWithholdingTaxFormTable />
          {/* <table style={inputWithholdingTaxFormStyle("100%").table}>
            <thead style={styles.thead}>
              <tr>
                <th scope="col" style={inputWithholdingTaxFormStyle("5%").th}></th>
                <th scope="col" style={inputWithholdingTaxFormStyle("8%").th}>入金日</th>
                <th scope="col" style={inputWithholdingTaxFormStyle("25%").th}>出版社</th>
                <th scope="col" style={inputWithholdingTaxFormStyle("10%").th}>発生額</th>
                <th scope="col" style={inputWithholdingTaxFormStyle("8%").th}>消費税</th>
                <th scope="col" style={inputWithholdingTaxFormStyle("8%").th}>源泉徴収税額</th>
                <th scope="col" style={inputWithholdingTaxFormStyle("8%").th}>差引金額</th>
                <th scope="col" style={inputWithholdingTaxFormStyle("5%").th}>料率</th>
                <th scope="col" style={inputWithholdingTaxFormStyle("8%").th}>マネジメント料</th>
                <th scope="col" style={inputWithholdingTaxFormStyle("8%").th}>振込金額</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan={2} style={inputWithholdingTaxFormStyle("20px").leftth}>
                  No.1
                </th>
                {formItems.map((item) => (
                  <td key={item.id} style={inputWithholdingTaxFormStyle("").td}>
                    <input
                      name={item.name}
                      id={item.id}
                      type={item.type}
                      ref={refs[item.name]}
                      placeholder={item.placeholder}
                      // onFocus={handleFocus}
                      // onBlur={handleBlur}
                      defaultValue={refs[item.name].current?.value}
                      required={item.required}
                      style={{
                        width: "100%",
                        border: "none",
                        padding: "5px",
                        textAlign: item.type === "tel" ? "right" : "left",
                      }}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td colSpan={9} style={inputWithholdingTaxFormStyle("").td}>
                  <input type="text" placeholder="MEMO" style={inputWithholdingTaxFormStyle("90%").input} />
                </td>
              </tr>
            </tbody>
          </table> */}
          <Button type="submit">登録</Button>
        </Box>
      </form >
    </>
  )
}
