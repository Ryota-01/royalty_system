import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from "@mui/material";

type RegisterWriterData = {
  所属事務所?: string,
  筆名?: string,
  フリガナ?: string,
  実名?: string,
  振込先?: string,
  支店名?: string
}

type RegisterPublisherData = {
  出版社?: string,
  マネジメント料率?: string,
}

type WriterData = {
  registerWriterData: RegisterWriterData,
  registerPublisherData: RegisterPublisherData
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

export default function WritersListTable() {
  const [writersData, setWritersData] = useState<WriterData[]>([]);
  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const writersCollectionRef = collection(db, "writers");
        const getWritersItem = await getDocs(writersCollectionRef);
        const getWritersData: any = getWritersItem.docs.map((doc) => doc.data() as RegisterWriterData);
        setWritersData(getWritersData);
      } catch (e: any) {
        console.error(e.message);
      }
    }
    fetchWriters();
  }, [])

  return (
    <TableContainer>
      <Table sx={{ width: { xs: "95%", md: "80%" }, margin: "20px auto", padding: "0 12px" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>実名</StyledTableCell>
            <StyledTableCell>筆名</StyledTableCell>
            <StyledTableCell>フリガナ</StyledTableCell>
            <StyledTableCell>所属事務所</StyledTableCell>
            <StyledTableCell>振込先</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {writersData.length > 0 && (
            writersData.map((writer, index) => {
              const writerInfo = writer.registerWriterData || {};
              return (
                <StyledTableRow key={writerInfo.実名 || index}>
                  <StyledTableCell >{writerInfo.実名}</StyledTableCell>
                  <StyledTableCell>{writerInfo.筆名}</StyledTableCell>
                  <StyledTableCell>{writerInfo.フリガナ}</StyledTableCell>
                  <StyledTableCell>{writerInfo.所属事務所}</StyledTableCell>
                  <StyledTableCell>
                    {writerInfo.振込先}　{writerInfo.支店名}
                  </StyledTableCell>
                </StyledTableRow>
              )
            })
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
