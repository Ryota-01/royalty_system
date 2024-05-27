import React from 'react'

export default function InputWithholdingTaxFormTable() {
  const inputWithholdingTaxFormStyle = (width: string) => ({
    table: {
      // width: width,
      borderCollapse: "collapse" as "collapse",
      marginTop: "16px",
    },
    thead: {
      fontWeight: "normal"
    },
    th: {
      fontWeight: "normal",
      backgroundColor: "#E5E5E5",
      fontSize: "0.8rem",
      padding: "15px 0",
      width: width,
      borderSpacing: "8px 0px"
    },
    leftth: {
      width: width,
      fontWeight: "normal",
      backgroundColor: "#E5E5E5",
      fontSize: "0.9rem",
      letterSpacing: "1px",
    },
    td: {
      backgroundColor: "#E5E5E5",
      padding: "15px",
      fontSize: "0.9rem"
    },
    input: {
      fontSize: "0.8rem",
      width: "100%",
      border: "none",
      padding: "4px",
    }
  })

  const tableHead = [
    { th: "入金日", width: "5%" },
    { th: "出版社", width: "20%" },
    { th: "発生額", width: "6%" },
    { th: "消費税", width: "6%" },
    { th: "源泉徴収税額", width: "6%" },
    { th: "差引金額", width: "6%" },
    { th: "料率", width: "6%" },
    { th: "マネジメント料", width: "5%" },
    { th: "振込金額", width: "6%" },
  ]

  return (
    <div>
      <table style={inputWithholdingTaxFormStyle("100%").table}>
        <thead style={inputWithholdingTaxFormStyle("").th}>
          <tr>
            {tableHead.map((th) => {
              console.log(th)
              return (
                <th scope="col" style={inputWithholdingTaxFormStyle(`${th.width}`).th}>{th.th}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <th rowSpan={4} style={inputWithholdingTaxFormStyle("20px").leftth}>
              No.1
            </th>
          </tr> */}
          <tr>
            <td style={inputWithholdingTaxFormStyle("").td}>
              <input
                name="depositdate"
                type="date"
                id="depositdate"
                placeholder=""
                style={inputWithholdingTaxFormStyle("").input}
                required
              />
            </td>
            <td style={inputWithholdingTaxFormStyle("").td}>
              <input
                name="publisher"
                type="text"
                id="publisher"
                placeholder=""
                style={inputWithholdingTaxFormStyle("").input}
                required
              />
            </td>
            <td style={inputWithholdingTaxFormStyle("").td}>
              <input
                name="deposits"
                type="tel"
                id="deposits"
                placeholder=""
                style={inputWithholdingTaxFormStyle("").input}
                required
              />
            </td>
            <td style={inputWithholdingTaxFormStyle("").td}>
              <input
                name="tax"
                type="tel"
                id="tax"
                placeholder=""
                style={inputWithholdingTaxFormStyle("").input}
                required
              />
            </td>
            <td style={inputWithholdingTaxFormStyle("").td}>
              <input
                name="withholdingtax"
                type="tel"
                id="withholdingtax"
                style={inputWithholdingTaxFormStyle("").input}
                placeholder=""
                required
              />
            </td>
            <td style={inputWithholdingTaxFormStyle("").td}>
              <input
                name="balanceofanaccount"
                type="tel"
                id="balanceofanaccount"
                style={inputWithholdingTaxFormStyle("").input}
                placeholder=""
                required
              />
            </td>
            <td style={inputWithholdingTaxFormStyle("").td}>
              <input
                name="percentage"
                type="tel"
                id="percentage"
                style={inputWithholdingTaxFormStyle("").input}
                placeholder=""
                required
              />
            </td>
            <td style={inputWithholdingTaxFormStyle("").td}>
              <input
                name="managementFee"
                type="tel"
                id="managementFee"
                style={inputWithholdingTaxFormStyle("").input}
                placeholder=""
                required
              />
            </td>
            <td style={inputWithholdingTaxFormStyle("").td}>
              <input
                name="transferamount"
                type="tel"
                id="transferamount"
                style={inputWithholdingTaxFormStyle("").input}
                placeholder=""
                required
              />
            </td>
          </tr>
          <tr>
            {/* <td style={inputWithholdingTaxFormStyle("").td}>
              <label htmlFor="publisher">出版社</label>
              <input
                name="publisher"
                type="text"
                id="publisher"
                placeholder="株式会社○○○"

                required
              />
            </td> */}
          </tr>
          {/* {formItems.map((item) => (
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
            ))} */}
          <tr>
            <td colSpan={10} style={inputWithholdingTaxFormStyle("").td}>
              <input type="text" placeholder="MEMO" style={inputWithholdingTaxFormStyle("90%").input} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
