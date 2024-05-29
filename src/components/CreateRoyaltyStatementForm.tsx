import React, { useState } from "react";
import { Box } from "@mui/material";
import { ErrorBasicAlert } from "./BasicAlert";
import CreateRoyaltyStatementFormTable from "./CreateRoyaltyStatementFormTable";

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
