import React from 'react'
import Header from '../components/Header'
import { Box, Typography } from '@mui/material'
import HomeMenuComponent from '../components/HomeMenuComponent'

export default function Home() {
  return (
    <>
      <Header title="" discription='' />
      <Box sx={{ padding: "24px 0", textAlign: "center" }}>
        <Typography variant="body1">
          以下よりメニューを選んでください
        </Typography>
      </Box>
      <Box sx={{ padding: "38px" }}>
        <HomeMenuComponent />
      </Box>
    </>
  )
}
