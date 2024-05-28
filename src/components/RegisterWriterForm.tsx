import React, { RefObject, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Box, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { ErrorBasicAlert, WarningBasicAlert } from "./BasicAlert";
import { useNavigate } from "react-router-dom";
import RegisterWriterInfo from "./RegisterWriterInfo";
import RegisterWriterWithPublishers from "./RegisterWriterWithPublishers";
import ConfirmRegisterWriterWithPublishers from "./ConfirmRegisterWriterWithPublishers";

type RegisterWriterData = {
  筆名?: string;
  実名?: string;
  所属事務所?: string;
  フリガナ?: string;
  振込先?: string;
  支店名?: string;
};

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
  const [registerPublisherData, setRegisterPublisherData] = useState<RegisterPublisherData[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    '作家情報登録',
    '取引先出版社登録',
    '確認',
  ];

  return (
    <>
      <Box width="60%" margin="30px auto">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box sx={{ width: { xs: "95%", md: "60%" }, margin: "20px auto" }}>
        {isCheckedError ? (
          <Box sx={{ width: "100%" }} mb={5}>
            <ErrorBasicAlert message={errorMessage} />
          </Box>
        ) : (
          <></>
        )}
        {activeStep === 0 &&
          <RegisterWriterInfo
            setActiveStep={setActiveStep}
            setIsCheckedError={setIsCheckedError}
            setErrorMessage={setErrorMessage}
            setRegisterWriterData={setRegisterWriterData}
          />
        }
        {activeStep === 1 &&
          <RegisterWriterWithPublishers
            setActiveStep={setActiveStep}
            setIsCheckedError={setIsCheckedError}
            setErrorMessage={setErrorMessage}
            setRegisterPublisherData={setRegisterPublisherData}
            activeStep={activeStep}
          />
        }
        {activeStep === 2 &&
          <ConfirmRegisterWriterWithPublishers
            setActiveStep={setActiveStep}
            setIsCheckedError={setIsCheckedError}
            setErrorMessage={setErrorMessage}
            registerWriterData={registerWriterData}
            registerPublisherData={registerPublisherData}
            activeStep={activeStep}
          />
        }
        <Grid
          container
          justifyContent="center"
          mt={5}
        >
        </Grid>
      </Box >
    </>
  );
}