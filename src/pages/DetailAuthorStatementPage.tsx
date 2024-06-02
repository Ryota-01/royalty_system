import React from 'react'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom'
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

export default function DetailAuthorStatementPage() {
  const location = useLocation();
  console.log(location)
  return (
    <>
      <Header title='STATEMENT DETAIL' discription='計算書確認' />
      <Box sx={{ padding: "12px", maxWidth: "750px", margin: "0 auto" }}>
        <List>
          <ListItem>
            <ListItemText
              primary={"著作者名"}
              primaryTypographyProps={{
                color: 'text.secondary',
                fontWeight: 'bold',
                variant: 'body1',
              }}
            />
            <ListItemText
              primary={`${location.state.authorId}`}
              primaryTypographyProps={{
                color: 'text.secondary',
                fontWeight: 'bold',
                variant: 'body1',
              }}
            />
          </ListItem>
        </List>
      </Box>
    </>
  )
}
