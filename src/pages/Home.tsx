import React, { useState } from 'react'
import Header from '../components/Header'
import { Box, Button, Typography } from '@mui/material'
import HomeMenuComponent from '../components/HomeMenuComponent'

export default function Home() {
  const [formCount, setFormCount] = useState<number[]>([1]);
  const addOnceForm = () => {
    setFormCount([...formCount, formCount.length + 1]);
    console.log(formCount);
  }
  return (
    <>
      <Header title="" discription='' />
      <Box sx={{ padding: "24px 0", textAlign: "center" }}>
        <ul>
          {formCount.map((form) => (
            <li key={form}>
              <input type='text' placeholder={`input${form}`} />
              <input type='text' placeholder="マネジメント料率" />
            </li>
          ))}
        </ul>
        <Button onClick={addOnceForm}>1件追加</Button>
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
