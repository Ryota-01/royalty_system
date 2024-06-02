import React, { useEffect, useState } from 'react'
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
import { useLocation, useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

interface Authors {
  id: string
}

export default function PeriodStatementPage() {
  const [authors, setAuthors] = useState<Authors[]>([]);
  const location = useLocation();
  console.log(location)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAuthors = async () => {
      const querySnapshot = await getDocs(collection(db, `statements/${location.state.id}/authors`));
      console.log(querySnapshot)
      const authorsList: Authors[] = querySnapshot.docs.map(doc => ({ id: doc.id }));
      setAuthors(authorsList);
    }
    fetchAuthors();
  }, []);

  const handleCreateStatementPage = () => {
    navigate("/royaltystatementinput");
  }

  const handleDetailAuthorsStatementPage = (authorId: string) => {
    navigate(`/royaltystatementlists/${encodeURIComponent(location.state.id)}/${encodeURIComponent(authorId)}`, { state: { authorId: authorId } })
  }

  return (
    <>
      <Header title={location.state.term} discription="" />
      <Box sx={{ padding: "12px", maxWidth: "750px", margin: "0 auto" }}>
        <Box display="flex" justifyContent="center" mb={2} margin="0 auto">
          <Tooltip title="印税計算書を作成">
            <IconButton onClick={handleCreateStatementPage} sx={{ width: "16%", borderRadius: "30px", bgcolor: "skyblue" }}>
              <CreateOutlinedIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box mt={2}>
          <List>
            {authors.length > 0 ? (
              authors.map((author, index) => (
                <>
                  <ListItemButton onClick={() => handleDetailAuthorsStatementPage(author.id)}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${author.id}`}
                        primaryTypographyProps={{
                          color: 'text.secondary',
                          fontWeight: 'bold',
                          variant: 'body1',
                        }}
                      />
                    </ListItem>
                  </ListItemButton>
                  <Divider />
                </>
              ))
            ) : (
              <Box sx={{ margin: "24px auto", textAlign: "center" }}>
                <Typography variant='body1' color="text.secondary">作家情報が存在しません</Typography>
              </Box>
            )}
          </List>
        </Box>
      </Box>
    </>
  )
}
