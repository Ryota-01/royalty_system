import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from "@mui/material";

type WriterData = {
  companyName: string,
  penName: string,
  furigana: string,
  writerName: string,
  bankName: string,
  branchName: string
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type td, &:last-child th': {
    border: 0,
  },
}))

export default function WritersListItem() {
  const [writersData, setWritersData] = useState<WriterData[]>([]);
  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const writersCollectionRef = collection(db, "writers");
        const getWritersItem = await getDocs(writersCollectionRef);
        const getWritersData: any = getWritersItem.docs.map((doc) => doc.data());
        setWritersData(getWritersData);
      } catch (e: any) {
        console.error(e.message);
      }
    }
    fetchWriters();
  }, [])
  console.log(writersData)
  return (
    <TableContainer>
      <Table sx={{ width: "80%", margin: "20px auto", padding: "0 12px" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>実名</StyledTableCell>
            <StyledTableCell>筆名</StyledTableCell>
            <StyledTableCell>フリガナ</StyledTableCell>
            <StyledTableCell>所属</StyledTableCell>
            <StyledTableCell>振込銀行</StyledTableCell>
            <StyledTableCell>振込支店</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {writersData.length > 0 && (
            writersData.map((writer, index) => (
              <StyledTableRow key={writer.writerName}>
                <StyledTableCell >{writer.writerName}</StyledTableCell>
                <StyledTableCell>{writer.penName}</StyledTableCell>
                <StyledTableCell>{writer.furigana}</StyledTableCell>
                <StyledTableCell>{writer.companyName}</StyledTableCell>
                <StyledTableCell>{writer.bankName}</StyledTableCell>
                <StyledTableCell>{writer.branchName}</StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
      {writersData.length === 0 && (
        <Box textAlign="center" mt={8}>
          <Typography>
            作家情報が存在しません
          </Typography>
        </Box>
      )}
    </TableContainer>
  )
}
