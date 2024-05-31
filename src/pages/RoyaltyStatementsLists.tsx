import React, { useState } from 'react'
import Header from '../components/Header'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List, ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';

export default function RoyaltyStatementsLists() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Header title="ROYALTY STATEMENTS LISTS" discription='印税計算書一覧' />
      <Box sx={{ padding: "12px", maxWidth: "750px", margin: "0 auto" }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Tooltip title="今期の印税計算書フォルダを作成">
            <IconButton onClick={handleOpen}>
              <CreateNewFolderOutlinedIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Dialog open={open} onClose={handleClose} component="form">
          <DialogTitle>フォルダ名を入力してください</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item md={6} sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  autoFocus
                  required
                  margin='dense'
                  id="name"
                  name="email"
                  placeholder='2024'
                  type="email"
                  variant="standard"
                  sx={{ display: "block" }}
                />
                <Typography>年</Typography>
              </Grid>
              <Grid item md={6} sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  autoFocus
                  required
                  margin='dense'
                  id="name"
                  name="email"
                  type="email"
                  placeholder='1'
                  variant="standard"
                />
                <Typography>期</Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button type='submit'>CREATE</Button>

          </DialogActions>
        </Dialog>
        <List>
          <ListItemButton>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="2024年4期印税計算書" />
            </ListItem>
          </ListItemButton>
          <Divider />
        </List>
      </Box>
    </>
  )
}
