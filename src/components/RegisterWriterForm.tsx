import React, { RefObject, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Box, Button, Divider, Grid, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { ErrorBasicAlert, WarningBasicAlert } from "./BasicAlert";
import { useNavigate } from "react-router-dom";
import RegisterWriterInfo from "./RegisterWriterInfo";
import RegisterWritersWithPublishers from "./RegisterWritersWithPublishers";

type RegisterWriterData = {
  筆名?: string;
  実名?: string;
  所属事務所?: string;
  フリガナ?: string;
  振込先?: string;
  支店名?: string;
};

// type RegisterPublisherData = {
//   出版社?: string;
//   マネジメント料率?: string;
// }

type RegisterPublisherData = {
  出版社?: string;
  マネジメント料率?: string;
}

export default function RegisterWriterForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckedError, setIsCheckedError] = useState<boolean>(false);
  const [registerWriterData, setRegisterWriterData] = useState<RegisterWriterData>({
    筆名: '',
    実名: '',
    所属事務所: '',
    フリガナ: '',
    振込先: '',
    支店名: '',
  });
  // const [registerPublisherData, setRegisterPublisherData] = useState<RegisterPublisherData>({
  //   出版社: "",
  //   マネジメント料率: "",
  // });
  const [registerPublisherData, setRegisterPublisherData] = useState<RegisterPublisherData[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  console.log(registerPublisherData);

  // firebaseのwriterコレクションに作家情報(registerWriterData)と出版社情報(registerPublisherData)を保存
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const writerListCollectionRef = collection(db, "writers");
      const writerInfoDocRef = doc(writerListCollectionRef, registerWriterData.フリガナ);
      await setDoc(writerInfoDocRef, { registerWriterData, registerPublisherData });
      alert("作家情報を登録しました");
      navigate("/home");
    } catch (e: any) {
      console.error(e.message);
      if (e.message === "Quota exceeded.") {
        setErrorMessage("データの保存容量が上限に達しました。管理者にお問合せください。");
        console.log(e.message)
      } else {
        setErrorMessage("データの登録に失敗しました。");
        console.log(e.message)
      }
      setIsCheckedError(true);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setIsCheckedError(false);
  }

  const steps = [
    '作家情報登録',
    '取引先出版社登録',
    '確認',
  ];

  return (
    <>
      <Box sx={{ width: { xs: "95%", md: "64%" }, margin: "20px auto" }}>
        <Box mb={5}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{ width: "100%" }} mb={5}>
          {isCheckedError ? (<ErrorBasicAlert message={errorMessage} />) : (<></>)}
        </Box>
        {activeStep === 0 &&
          <RegisterWriterInfo
            setActiveStep={setActiveStep}
            setIsCheckedError={setIsCheckedError}
            setErrorMessage={setErrorMessage}
            setRegisterWriterData={setRegisterWriterData}
          />
        }
        {activeStep === 1 &&
          <RegisterWritersWithPublishers
            setActiveStep={setActiveStep}
            setIsCheckedError={setIsCheckedError}
            setErrorMessage={setErrorMessage}
            setRegisterPublisherData={setRegisterPublisherData}
            activeStep={activeStep}
          />
        }
        {activeStep === 2 &&
          <>
            <Box textAlign="center" padding="20px 0">
              <Typography variant="body1">
                以下の内容で登録しますか？
              </Typography>
            </Box>
            <form onSubmit={handleOnSubmit}>
              <table style={{ margin: "0 auto" }}>
                <tbody>
                  <tr>
                    <th style={{ textAlign: "right", padding: "12px", fontWeight: "normal" }}>筆名：</th>
                    <td style={{ textAlign: "left", padding: "12px" }}>{registerWriterData.筆名}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "right", padding: "12px", fontWeight: "normal" }}>実名：</th>
                    <td style={{ textAlign: "left", padding: "12px" }}>{registerWriterData.実名}</td>
                  </tr>
                  <tr style={{ textAlign: "right" }}>
                    <th style={{ textAlign: "right", padding: "12px", fontWeight: "normal" }}>フリガナ：</th>
                    <td style={{ textAlign: "left", padding: "12px" }}>{registerWriterData.フリガナ}</td>
                  </tr>
                  <tr style={{ textAlign: "right" }}>
                    <th style={{ textAlign: "right", padding: "12px", fontWeight: "normal" }}>所属事務所：</th>
                    {registerWriterData.所属事務所 ?
                      (
                        <td style={{ textAlign: "left", padding: "12px" }}>{registerWriterData.所属事務所}</td>
                      ) : (
                        <td style={{ textAlign: "left", padding: "12px" }}>無し</td>
                      )}
                  </tr>
                  <tr style={{ textAlign: "right" }}>
                    <th style={{ textAlign: "right", padding: "12px", fontWeight: "normal" }}>振込先：</th>
                    <td style={{ textAlign: "left", padding: "12px" }}>{registerWriterData.振込先}</td>
                  </tr>
                  <tr style={{ textAlign: "right" }}>
                    <th style={{ textAlign: "right", padding: "12px", fontWeight: "normal" }}>支店名：</th>
                    <td style={{ textAlign: "left", padding: "12px" }}>{registerWriterData.支店名}</td>
                  </tr>
                </tbody>
              </table>
              <Divider sx={{ margin: "20px 0" }} />
              <table style={{ margin: "0 auto", width: "90%", textAlign: "center" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "12px 0", fontWeight: "normal" }}></th>
                    <th style={{ padding: "12px 0", fontWeight: "normal" }}>出版社</th>
                    <th style={{ padding: "12px 0", fontWeight: "normal" }}>マネジメント料率</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {registerPublisherData.map((publisher) => {
                      return (
                        <>
                          {/* <th style={{ padding: "12px 0", fontWeight: "normal" }}>取引先出版社1</th>
                          <td style={{ padding: "12px 0" }}>{registerPublisherData.出版社}</td>
                          <td style={{ padding: "12px 0" }}>{registerPublisherData.マネジメント料率}</td> */}
                        </>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
              <Grid
                container
                justifyContent="center"
                mt={5}
              >
                <Box mr={1}>
                  <Button variant="contained" fullWidth onClick={handleBack}>BACK</Button>
                </Box>
                <Box ml={1}>
                  <Button type="submit" variant="contained" fullWidth>SUBMIT</Button>
                </Box>
              </Grid>
            </form>
          </>
        }
        <Grid
          container
          justifyContent="center"
          mt={5}
        >
          {/* <Box mr={1}>
            <Button variant="contained" fullWidth disabled={isDisabled} onClick={handleBack}>Back</Button>
          </Box>
          <Box ml={1}>
            <Button variant="contained" fullWidth onClick={handleNext}>NEXT</Button>
          </Box> */}
        </Grid>
      </Box >
    </>
  );
}