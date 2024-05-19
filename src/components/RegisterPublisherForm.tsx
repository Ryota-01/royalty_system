import React, { RefObject, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Box, Button, Grid, TextField } from "@mui/material";
import { WarningBasicAlert } from "./BasicAlert";
import { useNavigate } from "react-router-dom";

export default function RegisterPublisherForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckedError, setIsCheckedError] = useState(false);
  const navigate = useNavigate();
  const publisherNameRef = useRef<HTMLInputElement>(null);
  const furiganaRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const value = {
        出版社名: publisherNameRef.current?.value,
        フリガナ: furiganaRef.current?.value,
        連絡先: contactRef.current?.value,
      };
      const publishersCollectionRef = collection(db, "出版社一覧");
      const publisherDocRef = doc(publishersCollectionRef, `value.フリガナ`);
      const docSnap = await getDoc(publisherDocRef);
      if (!docSnap.exists()) {
        // 同一名のドキュメントが存在しない場合の処理
        await setDoc(publisherDocRef, value);
        alert("出版社情報を登録しました");
        navigate("/home");
      } else {
        // 同一名のドキュメントが存在する場合の処理
        setIsCheckedError(true);
        setErrorMessage("すでに出版社情報が存在しています。");
        console.error("すでに出版社情報が存在しています。")
      }
    } catch (e: any) {
      setIsCheckedError(true);
      console.error(e.message);
      if (e.message === "Quota exceeded.") {
        setErrorMessage("データの保存容量が上限に達しました。管理者にお問合せください。");
      } else {
        setErrorMessage("データの登録に失敗しました。");
      }
    }
  };

  const inputValue = (name: string, id: string, type: string, label: string, ref: RefObject<HTMLInputElement>) => ({
    input: {
      name: name,
      id: id,
      type: type,
      inputRef: ref,
      label: label,
    },
  });

  return (
    <>
      <Box sx={{ width: { xs: "90%", md: "64%" }, margin: "0 auto" }}>
        {isCheckedError ? (<WarningBasicAlert message={errorMessage} />) : (<></>)}
      </Box>
      <Box sx={{ width: { xs: "90%", md: "64%" }, margin: "20px auto" }}>
        <form onSubmit={handleOnSubmit}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                {...inputValue("publisherName", "publisherName", "text", "出版社名", publisherNameRef).input}
                required
                placeholder="株式会社○○○"
                helperText="正式名称（株式会社○○○、有限会社○○○など）で入力してください"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                {...inputValue("furigana", "furigana", "text", "フリガナ", furiganaRef).input}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                {...inputValue("contact", "contact", "email", "連絡先メールアドレス", contactRef).input}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">登録</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}


