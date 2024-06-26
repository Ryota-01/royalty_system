interface FormItems {
  name: string,
  id: string,
  type: string,
  label: string,
  placeholder: string,
  spacing: number,
  required: boolean,
}

export const formItems: FormItems[] = [
  {
    // 入金日
    name: "depositdate",
    id: "depositdate",
    type: "date",
    label: "入金日",
    placeholder: "",
    spacing: 3,
    required: true,
  },
  {
    // 出版社名
    name: "publisher",
    id: "publisher",
    type: "text",
    label: "出版社名",
    placeholder: "株式会社◯◯",
    spacing: 9,
    required: true,
  },
  {
    // 入金額
    name: "deposits",
    id: "deposits",
    type: "tel",
    label: "入金額",
    placeholder: "",
    spacing: 1.5,
    required: true,
  },
  {
    // 消費税
    name: "tax",
    id: "tax",
    type: "tel",
    label: "消費税",
    placeholder: "",
    spacing: 1.5,
    required: true,
  },
  {
    // 源泉徴収税額
    name: "withholdingtax",
    id: "withholdingtax",
    type: "tel",
    label: "源泉徴収税額",
    placeholder: "",
    spacing: 1.5,
    required: true,
  },
  {
    // 差引金額
    name: "balanceofanaccount",
    id: "balanceofanaccount",
    type: "tel",
    label: "差引金額",
    placeholder: "",
    spacing: 1.5,
    required: true,
  },
  {
    // 料率
    name: "percentage",
    id: "percentage",
    type: "tel",
    label: "料率",
    placeholder: "",
    spacing: 1.5,
    required: true
  },
  {
    // マネジメント料
    name: "managementFee",
    id: "managementFee",
    type: "tel",
    label: "マネジメント料",
    placeholder: "",
    spacing: 1.5,
    required: true
  },
  {
    // 振込金額
    name: "transferamount",
    id: "transferamount",
    type: "tel",
    label: "振込金額",
    placeholder: "",
    spacing: 2,
    required: true
  },
  // {
  //   // 備考
  //   name: "remarks",
  //   id: "remarks",
  //   type: "text",
  //   label: "備考",
  //   placeholder: "",
  //   spacing: 12,
  //   required: false
  // }
]