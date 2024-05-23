import React, { RefObject, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Box, Button, Grid, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { WarningBasicAlert } from "./BasicAlert";
import { useNavigate } from "react-router-dom";

type RegisterWriterData = {
  筆名?: string;
  実名?: string;
  所属事務所?: string;
  フリガナ?: string;
  振込先銀行?: string;
  支店名?: string;
};

export default function RegisterWriterForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckedError, setIsCheckedError] = useState(false);
  const [registerWriterData, setRegisterWriterData] = useState<RegisterWriterData>({
    筆名: '',
    実名: '',
    所属事務所: '',
    フリガナ: '',
    振込先銀行: '',
    支店名: '',
  }); const [activeStep, setActiveStep] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true)
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
  //     const writerListCollectionRef = collection(db, "writers");
  //     const writerInfoDocRef = doc(writerListCollectionRef, value.フリガナ);
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
    setRegisterWriterData(value);
    console.log(registerWriterData)
    setActiveStep(activeStep + 1);
  }

  const handleBack = () => {
    if (activeStep === 0) {
      setIsDisabled(true)
      console.log(activeStep)
    } else {
      setActiveStep(activeStep - 1);
      console.log(activeStep)
    }
  }

  const handleNext = () => {
    if (activeStep === 2) {
      return
    } else {
      setActiveStep(activeStep + 1);
      setIsDisabled(false);
      console.log(activeStep)
    }
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

  const steps = [
    '作家情報登録',
    '取引先出版社登録',
    '確認',
  ]

  return (
    <>
      <Box sx={{ width: { xs: "90%", md: "64%" }, margin: "20px auto" }}>
        <Box mb={5}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {activeStep === 0 &&
          <>
            <Box sx={{ width: "100%" }} mb={3}>
              {isCheckedError ? (<WarningBasicAlert message={errorMessage} />) : (<></>)}
            </Box>
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
                  <TextField {...inputValue("companyName", "companyName", "text", "所属事務所", companyNameRef).input}
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
                </Grid>
              </Grid>
            </form>
          </>
        }
        {activeStep === 1 &&
          <>
            <Box textAlign="center" padding="36px 0">
              <Typography variant="body1">
                取引先の出版社を入力してください
              </Typography>
            </Box>
            <Grid container columnSpacing={2} rowSpacing={3}>
              <Grid item xs={12} md={2}>
                <Typography>出版社1</Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  placeholder="○○株式会社"
                  helperText="出版社名を正式名称で入力してください"
                  label="取引先出版社名"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  placeholder="20%"
                  label="マネジメント率"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          </>
        }
        <Button variant="contained" disabled={isDisabled} onClick={handleBack}>Back</Button>
        <Button variant="contained" onClick={handleNext}>NEXT</Button>

      </Box>
    </>
  );
}