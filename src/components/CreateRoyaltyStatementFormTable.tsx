import React, { useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Box, Button } from "@mui/material";

type FormValues = {
  createRoyaltyStatementForm: {
    入金日: Date;
    出版社: string;
    発生額: number;
    消費税: number;
    源泉徴収税額: number;
    差引金額: number;
    料率: number;
    マネジメント料: number;
    振込金額: number;
    備考: string;
  }[];
};

type CreateRoyaltyStatementFormTableProps = {
  setCreateStatementData: React.Dispatch<React.SetStateAction<undefined>>;
  setIsCheckedError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function CreateRoyaltyStatementFormTable(props: CreateRoyaltyStatementFormTableProps) {
  const setIsCheckedError = props.setIsCheckedError;
  const setErrorMessage = props.setErrorMessage;
  const [isFocus, setIsFocus] = useState(false);
  const [createStatementData, setCreateStatementData] = useState()
  const writerRef = useRef<HTMLInputElement>(null); //  作家
  const dateofTransferRef = useRef<HTMLInputElement>(null); //　振込日
  const depositDateRef = useRef<HTMLInputElement>(null); // 入金日
  const publisherRef = useRef<HTMLInputElement>(null); // 出版社
  const depositsRef = useRef<HTMLInputElement>(null); // 入金額
  const withholdingTaxRef = useRef<HTMLInputElement>(null); // 源泉税額
  const taxRef = useRef<HTMLInputElement>(null); // 消費税
  const balanceOfAnAccountRef = useRef<HTMLInputElement>(null); //　差引金額
  const percentageRef = useRef<HTMLInputElement>(null); //　マネジメント料
  const managementFeeRef = useRef<HTMLInputElement>(null); //　マネジメント料
  const transferAmountRef = useRef<HTMLInputElement>(null); //　振込金額
  const remarksRef = useRef<HTMLInputElement>(null); //　備考

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      createRoyaltyStatementForm: [{
        入金日: new Date(),
        出版社: "",
        発生額: undefined,
        消費税: undefined,
        源泉徴収税額: undefined,
        差引金額: undefined,
        料率: undefined,
        マネジメント料: undefined,
        振込金額: undefined,
        備考: "",
      }]
    }
  });
  const { fields, append } = useFieldArray({
    name: "createRoyaltyStatementForm",
    control,
    // keyName: "key", // デフォルトはidだが、keyに変更
  })

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
      console.log(value);
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

  const inputWithholdingTaxFormStyle = ({
    table: {
      borderCollapse: "collapse" as "collapse",
      width: "100%",
      borderSpacing: "0 5px",
      marginTop: "16px",
    },
    thead: {
      fontWeight: "normal"
    },
    th: {
      fontWeight: "normal",
      fontSize: "0.8rem",
      padding: "15px 0",
    },
    leftth: {
      fontWeight: "normal",
      backgroundColor: "#E5E5E5",
      fontSize: "0.9rem",
      letterSpacing: "1px",
    },
    tbody: {
      backgroundColor: "#E5E5E5",
    },
    td: {
      fontSize: "0.9rem",
      padding: "15px",
    },
    input: {
      fontSize: "0.8rem",
      width: "100%",
      border: "none",
      padding: "5px",
    }
  })

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <table style={styles.table}>
          <tbody>
            <tr style={{ height: "40px" }}>
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
            <tr style={{ height: "40px" }}>
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
        <table style={{ ...inputWithholdingTaxFormStyle.table, padding: "10px" }}>
          <thead style={inputWithholdingTaxFormStyle.th}>
            <tr>
              {/* {tableHead.map((th, index) => {
              return (
                <th key={index} scope="col" style={{ ...inputWithholdingTaxFormStyle.th, width: th.width }}>{th.th}</th>
              )
            })} */}
            </tr>
          </thead>
          {fields.map((field, index) => {
            console.log(field)
            return (
              <tbody style={inputWithholdingTaxFormStyle.tbody}>
                <tr>
                  <td rowSpan={4} style={inputWithholdingTaxFormStyle.td}>
                    {index + 1}
                  </td>
                </tr>
                <tr>
                  <td style={inputWithholdingTaxFormStyle.td}>
                    <input
                      {...register(`createRoyaltyStatementForm.${index}.入金日` as const, {
                        required: true,
                      })}
                      ref={depositDateRef}
                      name="depositdate"
                      type="date"
                      id="depositdate"
                      placeholder=""
                      style={{ ...inputWithholdingTaxFormStyle.input }}
                    />
                  </td>
                  <td colSpan={2} style={inputWithholdingTaxFormStyle.td}>
                    <input
                      {...register(`createRoyaltyStatementForm.${index}.出版社` as const, {
                        required: true,
                      })}
                      ref={publisherRef}
                      name="publisher"
                      type="text"
                      id="publisher"
                      placeholder="取引先出版社"
                      style={inputWithholdingTaxFormStyle.input}
                    />
                  </td>
                  <td style={inputWithholdingTaxFormStyle.td}>
                    <input
                      {...register(`createRoyaltyStatementForm.${index}.料率` as const, {
                        required: true,
                      })}
                      ref={percentageRef}
                      name="percentage"
                      id="percentage"
                      type="tel"
                      placeholder="料率"
                      style={inputWithholdingTaxFormStyle.input}
                      required
                    />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ ...inputWithholdingTaxFormStyle.td, padding: "0 14px" }}>
                    <input
                      {...register(`createRoyaltyStatementForm.${index}.発生額` as const, {
                        required: true,
                      })}
                      ref={depositsRef}
                      name="deposits"
                      id="deposits"
                      type="tel"
                      placeholder="発生額"
                      style={inputWithholdingTaxFormStyle.input}
                    />
                  </td>
                  <td style={{ ...inputWithholdingTaxFormStyle.td, padding: "0 14px" }}>
                    <input
                      {...register(`createRoyaltyStatementForm.${index}.消費税` as const, {
                        required: true,
                      })}
                      ref={taxRef}
                      name="tax"
                      id="tax"
                      type="tel"
                      placeholder="消費税"
                      style={inputWithholdingTaxFormStyle.input}
                    />
                  </td>
                  <td style={{ ...inputWithholdingTaxFormStyle.td, padding: "0 14px" }}>
                    <input
                      {...register(`createRoyaltyStatementForm.${index}.源泉徴収税額` as const, {
                        required: true,
                      })}
                      ref={withholdingTaxRef}
                      name="withholdingtax"
                      id="withholdingtax"
                      type="tel"
                      placeholder="源泉徴収税額"
                      style={inputWithholdingTaxFormStyle.input}
                    />
                  </td>
                  <td style={{ ...inputWithholdingTaxFormStyle.td, padding: "0 14px" }}>
                    <input
                      {...register(`createRoyaltyStatementForm.${index}.差引金額` as const, {
                        required: true,
                      })}
                      ref={balanceOfAnAccountRef}
                      name="balanceofanaccount"
                      id="balanceofanaccount"
                      type="tel"
                      placeholder="差引金額"
                      style={inputWithholdingTaxFormStyle.input}
                    />
                  </td>
                  <td style={{ ...inputWithholdingTaxFormStyle.td, padding: "0 14px" }}>
                    <input
                      {...register(`createRoyaltyStatementForm.${index}.マネジメント料` as const, {
                        required: true
                      })}
                      ref={managementFeeRef}
                      name="managementFee"
                      id="managementFee"
                      type="tel"
                      placeholder="マネジメント料"
                      style={inputWithholdingTaxFormStyle.input}
                    />
                  </td>
                  <td style={{ ...inputWithholdingTaxFormStyle.td, padding: "0 14px" }}>
                    <input
                      {...register(`createRoyaltyStatementForm.${index}.振込金額` as const, {
                        required: true
                      })}
                      ref={transferAmountRef}
                      name="transferamount"
                      id="transferamount"
                      type="tel"
                      placeholder="振込金額"
                      style={inputWithholdingTaxFormStyle.input}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ ...inputWithholdingTaxFormStyle.td }}>
                    <input
                      {...register(`createRoyaltyStatementForm.${index}.備考` as const, {
                        required: true
                      })}
                      ref={remarksRef}
                      name="remarks"
                      id="remarks"
                      type="text"
                      placeholder="MEMO"
                      style={{ ...inputWithholdingTaxFormStyle.input, width: "100%" }}
                    />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr style={{ height: "16px" }}></tr>
              </tbody>
            )
          })}
        </table>
        <Box mt={1}>
          <Button onClick={() => append({
            入金日: new Date(),
            出版社: "a",
            発生額: 0,
            消費税: 0,
            源泉徴収税額: 0,
            差引金額: 0,
            料率: 0,
            マネジメント料: 0,
            振込金額: 0,
            備考: "",
          })}>1件追加</Button>
        </Box>
        <Button type="submit">登録</Button>
      </form>
    </>
  )
}
