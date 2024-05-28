import { Box, Button } from '@mui/material';
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

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

export default function CreateRoyaltyStatementFormTable() {
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
  console.log(fields)

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

  const tableHead = [
    // { th: "No.", width: "3%" },
    // // { th: "入金日", width: "10%" },
    // // { th: "出版社", width: "25%" },
    // { th: "発生額", width: "10%" },
    // { th: "消費税", width: "10%" },
    // { th: "源泉徴収税額", width: "10%" },
    // { th: "差引金額", width: "10%" },
    // { th: "料率", width: "4%" },
    // { th: "マネジメント料", width: "7.5%" },
    // { th: "振込金額", width: "8%" },
    // { th: "備考", width: "12%" },
  ]

  return (
    <div>
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
                    name="publisher"
                    type="text"
                    id="publisher"
                    placeholder="取引先出版社"
                    style={{ ...inputWithholdingTaxFormStyle.input }}
                  />
                </td>
                <td style={inputWithholdingTaxFormStyle.td}>
                  <input
                    {...register(`createRoyaltyStatementForm.${index}.料率` as const, {
                      required: true,
                    })}
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
                <td style={{ ...inputWithholdingTaxFormStyle.td, padding:"0 14px" }}>
                  <input
                    {...register(`createRoyaltyStatementForm.${index}.発生額` as const, {
                      required: true,
                    })}
                    name="deposits"
                    id="deposits"
                    type="tel"
                    placeholder="発生額"
                    style={inputWithholdingTaxFormStyle.input}
                  />
                </td>
                <td style={{ ...inputWithholdingTaxFormStyle.td, padding:"0 14px" }}>
                  <input
                    {...register(`createRoyaltyStatementForm.${index}.消費税` as const, {
                      required: true,
                    })}
                    name="tax"
                    id="tax"
                    type="tel"
                    placeholder="消費税"
                    style={inputWithholdingTaxFormStyle.input}
                  />
                </td>
                <td style={{ ...inputWithholdingTaxFormStyle.td, padding:"0 14px" }}>
                  <input
                    {...register(`createRoyaltyStatementForm.${index}.源泉徴収税額` as const, {
                      required: true,
                    })}
                    name="withholdingtax"
                    id="withholdingtax"
                    type="tel"
                    placeholder="源泉徴収税額"
                    style={inputWithholdingTaxFormStyle.input}
                  />
                </td>
                <td style={{ ...inputWithholdingTaxFormStyle.td, padding:"0 14px" }}>
                  <input
                    {...register(`createRoyaltyStatementForm.${index}.差引金額` as const, {
                      required: true,
                    })}
                    name="balanceofanaccount"
                    id="balanceofanaccount"
                    type="tel"
                    placeholder="差引金額"
                    style={inputWithholdingTaxFormStyle.input}
                  />
                </td>
                <td style={{ ...inputWithholdingTaxFormStyle.td, padding:"0 14px" }}>
                  <input
                    {...register(`createRoyaltyStatementForm.${index}.マネジメント料` as const, {
                      required: true
                    })}
                    name="managementFee"
                    id="managementFee"
                    type="tel"
                    placeholder="マネジメント料"
                    style={inputWithholdingTaxFormStyle.input}
                  />
                </td>
                <td style={{ ...inputWithholdingTaxFormStyle.td, padding:"0 14px" }}>
                  <input
                    {...register(`createRoyaltyStatementForm.${index}.振込金額` as const, {
                      required: true
                    })}
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
          出版社: "",
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
    </div >
  )
}
