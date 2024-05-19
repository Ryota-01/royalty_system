import React, { RefObject, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Box, Button, Grid, TextField } from "@mui/material";
import { WarningBasicAlert } from "./BasicAlert";
import { useNavigate } from "react-router-dom";

export default function RegisterWriterForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckedError, setIsCheckedError] = useState(false);
  const navigate = useNavigate();
  const penNameRef = useRef<HTMLInputElement>(null);
  const writerNameRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const furiganaRef = useRef<HTMLInputElement>(null);
  const bankNameRef = useRef<HTMLInputElement>(null);
  const branchNameRef = useRef<HTMLInputElement>(null);

  // const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const value = {
  //       筆名: penNameRef.current?.value,
  //       実名: writerNameRef.current?.value,
  //       所属事務所: companyNameRef.current?.value,
  //       フリガナ: furiganaRef.current?.value,
  //       振込先銀行: bankNameRef.current?.value,
  //       支店名: branchNameRef.current?.value,
  //     };
  //     const writerListCollectionRef = collection(db, "作家一覧");
  //     const writerInfoDocRef = doc(writerListCollectionRef, `value.フリガナ`);
  //     const docSnap = await getDoc(writerInfoDocRef);
  //     if (!docSnap.exists()) {
  //       // 同一名のドキュメントが存在しない場合の処理
  //       await setDoc(writerInfoDocRef, value);
  //       alert("作家情報を登録しました");
  //       navigate("/home");
  //     } else {
  //       // 同一名のドキュメントが存在する場合の処理
  //       setIsCheckedError(true);
  //       setErrorMessage("すでに作家情報が存在しています。");
  //     }
  //   } catch (e: any) {
  //     console.error(e.message);
  //     if (e.message === "Quota exceeded.") {
  //       setErrorMessage("データの保存容量が上限に達しました。管理者にお問合せください。");
  //     } else {
  //       setErrorMessage("データの登録に失敗しました。");
  //     }
  //     setIsCheckedError(true);
  //   }
  // };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = {
      筆名: penNameRef.current?.value,
      実名: writerNameRef.current?.value,
      所属事務所: companyNameRef.current?.value,
      フリガナ: furiganaRef.current?.value,
      振込先銀行: bankNameRef.current?.value,
      支店名: branchNameRef.current?.value,
    };
    console.log(value);
    navigate("/home", { state: value })
  };

  const handleOnClick = () => {
  }

  const inputValue = (name: string, id: string, type: string, label: string, ref: RefObject<HTMLInputElement>) => ({
    input: {
      name: name,
      id: id,
      type: type,
      label: label,
      inputRef: ref,
    },
  });

  return (
    <>
      <Box sx={{ width: { xs: "90%", md: "64%" }, margin: "0 auto" }}>
        {isCheckedError ? (<WarningBasicAlert message={errorMessage} />) : (<></>)}
      </Box>
      <Box sx={{ width: { xs: "90%", md: "64%" }, margin: "20px auto" }}>
        <form onSubmit={handleOnSubmit}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                {...inputValue("penName", "penName", "text", "筆名", penNameRef).input}
                placeholder="INZEI TARO"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                {...inputValue("writerName", "writerName", "text", "実名", writerNameRef).input}
                placeholder="印税太郎"
                helperText="姓と名の間はスペースを空けず入力してください"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                {...inputValue("furigana", "furigana", "text", "フリガナ", furiganaRef).input}
                placeholder="インゼイタロウ"
                helperText="実名のフリガナを入力してください"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField {...inputValue("companyName", "companyName", "text", "法人名", companyNameRef).input}
                helperText="所属事務所がある場合は入力してください"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...inputValue("bankName", "bankName", "text", "振込口座", bankNameRef).input}
                placeholder="○○銀行"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...inputValue("branchName", "branchName", "text", "支店名", branchNameRef).input}
                placeholder="○○支店"
                required
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">REGISTER</Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" onClick={handleOnClick}>NEXT</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}