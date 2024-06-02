import React, { useState } from "react";
import { Box } from "@mui/material";
import { ErrorBasicAlert, InfoBasicAlert } from "../alert/BasicAlert";
import CreateRoyaltyStatementFormTable from "../table/CreateRoyaltyStatementFormTable";

export default function CreateRoyaltyStatementForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckedError, setIsCheckedError] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [createStatementData, setCreateStatementData] = useState()

  const handleFocus = (e: any) => {
    setIsFocus(true);
  }
  const handleBlur = (e: any) => {
    setIsFocus(false);
  }

  return (
    <>
      <Box sx={{ width: "92%", margin: "20px auto" }}>
        <Box mb={2}>
          <InfoBasicAlert message="計算書を作成する前に、今期のフォルダが作成されているかご確認ください" />
        </Box>
        {isCheckedError &&
          <Box mb={2}>
            <ErrorBasicAlert message={errorMessage} />
          </Box>
        }
        <CreateRoyaltyStatementFormTable
          setCreateStatementData={setCreateStatementData}
          setIsCheckedError={setIsCheckedError}
          setErrorMessage={setErrorMessage}
        />
      </Box>
    </>
  )
}
