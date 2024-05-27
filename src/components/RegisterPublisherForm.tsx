import React, { RefObject, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { ErrorBasicAlert } from "./BasicAlert";
import { useNavigate } from "react-router-dom";

export default function RegisterPublisherForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckedError, setIsCheckedError] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const publisherNameRef = useRef<HTMLInputElement>(null);
  const furiganaRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  // 登録ボタンが押された時の処理（firebaseのpublishersコレクションに保存）
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const value = {
        出版社名: publisherNameRef.current?.value,
        フリガナ: furiganaRef.current?.value,
        連絡先: contactRef.current?.value,
        WEB明細: checked
      };
      console.log(value);
      const publishersCollectionRef = collection(db, "publishers");
      const publisherDocRef = doc(publishersCollectionRef, value.フリガナ);
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

  // チェックボタンが押された時の処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setChecked(e.target.checked);
  }

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
      <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "20px auto" }}>
        {isCheckedError ? (
          <Box mb={3}>
            <ErrorBasicAlert message={errorMessage} />
          </Box>
        ) : (
          <>
          </>
        )}
        <form onSubmit={handleOnSubmit}>
          <TextField
            {...inputValue("publisherName", "publisherName", "text", "出版社名", publisherNameRef).input}
            placeholder="株式会社レガートミュージック"
            helperText="正式名称（株式会社○○○、有限会社○○○など）で入力してください"
            size="small"
            margin="dense"
            required
            fullWidth
          />
          <TextField
            {...inputValue("furigana", "furigana", "text", "フリガナ", furiganaRef).input}
            placeholder="レガートミュージック"
            helperText="フリガナを入力してください"
            size="small"
            margin="dense"
            required
            fullWidth
          />
          <TextField
            {...inputValue("contact", "contact", "text", "連絡先", contactRef).input}
            helperText="電話番号またはメールアドレスを入力してください（任意）"
            margin="dense"
            size="small"
          />
          <Box mt={2} mb={3}>
            <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="WEB明細手続き済み" />
          </Box>
          <Button type="submit" variant="contained">登録</Button>
        </form>
      </Box>
    </>
  );
}


