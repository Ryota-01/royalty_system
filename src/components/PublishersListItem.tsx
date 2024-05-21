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

type PublisherData = {
  furigana: string,
  publisherName: string,
  contact: string
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

export default function PublishersListItem() {
  const [publisherData, setPublisherData] = useState<PublisherData[]>([]);
  useEffect(() => {
    const fetchPulishers = async () => {
      try {
        const publishersCollectionRef = collection(db, "出版社一覧");
        const getPublisherItem = await getDocs(publishersCollectionRef);
        const getPublisherData: any = getPublisherItem.docs.map((doc) => doc.data());
        setPublisherData(getPublisherData);
      } catch (e: any) {
        console.error(e.message);
      }
    }
    fetchPulishers();
  }, [publisherData])
  return (
    <>
      <TableContainer>
        <Table sx={{ width: {xs: "95%", md: "80%"}, margin: "20px auto", padding: "0 12px" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>出版社名</StyledTableCell>
              <StyledTableCell>フリガナ</StyledTableCell>
              <StyledTableCell>連絡先</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publisherData.length > 0 && publisherData.map((publisher, index) => (
              <StyledTableRow key={publisher.publisherName}>
                <StyledTableCell >{publisher.publisherName}</StyledTableCell>
                <StyledTableCell >{publisher.furigana}</StyledTableCell>
                <StyledTableCell >{publisher.contact}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {publisherData.length === 0 && (
          <Box textAlign="center" mt={8}>
            <Typography>
              出版社情報が存在しません
            </Typography>
          </Box>
        )}
      </TableContainer>
    </>
  )
}
