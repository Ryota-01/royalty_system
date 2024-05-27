import React, { RefObject, useRef } from "react";
import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { db } from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore";

type RegisterWriterinfoProps = {
  setIsCheckedError: React.Dispatch<React.SetStateAction<boolean>>
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setRegisterWriterData: React.Dispatch<React.SetStateAction<object>>
}

export default function RegisterWriterInfo(props: RegisterWriterinfoProps) {
  const setActiveStep = props.setActiveStep;
  const setIsCheckedError = props.setIsCheckedError;
  const setErrorMessage = props.setErrorMessage;
  const setRegisterWriterData = props.setRegisterWriterData;
  const penNameRef = useRef<HTMLInputElement>(null);
  const writerNameRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const furiganaRef = useRef<HTMLInputElement>(null);
  const bankNameRef = useRef<HTMLInputElement>(null);
  const branchNameRef = useRef<HTMLInputElement>(null);
  const inputValue = (
    name: string,
    id: string,
    type: string,
    label: string,
    ref: RefObject<HTMLInputElement>
  ) => ({
    input: {
      name: name,
      id: id,
      type: type,
      label: label,
      inputRef: ref,
    },
  });

  // 作家情報を登録
  const handleRegisterWriterData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const value = {
        筆名: penNameRef.current?.value,
        実名: writerNameRef.current?.value,
        所属事務所: companyNameRef.current?.value,
        フリガナ: furiganaRef.current?.value,
        振込先: bankNameRef.current?.value,
        支店名: branchNameRef.current?.value,
      };
      console.log(value);
      const writerListCollectionRef = collection(db, "writers");
      const writerInfoDocRef = doc(writerListCollectionRef, value.フリガナ);
      const docSnap = await getDoc(writerInfoDocRef);
      if (docSnap.exists()) {
        // firebaseにすでに同一名（同一かどうかはフリガナで判定）の作家情報が登録している場合
        setIsCheckedError(true);
        setErrorMessage("すでに作家情報が存在しています。");
        return
      } else {
        // 同一作家情報が存在しない場合
        setRegisterWriterData(value)
        setActiveStep(1)
      }
    } catch (e: any) {
      console.error(e.message);
      setIsCheckedError(true);
      setErrorMessage(e.message);
    }
    setIsCheckedError(false);
  }

  return (
    <>
      <form onSubmit={handleRegisterWriterData}>
        <Grid container columnSpacing={2} rowSpacing={3}>
          <Grid item xs={12} md={12}>
            <TextField
              {...inputValue("penName", "penName", "text", "筆名", penNameRef)
                .input}
              size="small"
              placeholder="INZEI TARO"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              {...inputValue(
                "writerName",
                "writerName",
                "text",
                "実名",
                writerNameRef
              ).input}
              size="small"
              fullWidth
              placeholder="印税太郎"
              required
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              {...inputValue(
                "furigana",
                "furigana",
                "text",
                "フリガナ",
                furiganaRef
              ).input}
              size="small"
              placeholder="インゼイタロウ"
              helperText="実名のフリガナを入力してください"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              {...inputValue(
                "companyName",
                "companyName",
                "text",
                "所属事務所",
                companyNameRef
              ).input}
              size="small"
              helperText="所属事務所がある場合は入力してください"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...inputValue(
                "bankName",
                "bankName",
                "text",
                "振込口座",
                bankNameRef
              ).input}
              size="small"
              placeholder="○○銀行"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...inputValue(
                "branchName",
                "branchName",
                "text",
                "支店名",
                branchNameRef
              ).input}
              size="small"
              placeholder="○○支店"
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Box margin="24px auto" width={{ xs: "100%", sm: "32%", md: "45%" }}>
          <Button type="submit" variant="contained" fullWidth>
            取引先出版社登録へ
          </Button>
        </Box>
      </form>
    </>
  );
}
