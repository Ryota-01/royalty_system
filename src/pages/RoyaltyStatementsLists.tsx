import React, { useCallback, useEffect, useRef, useState } from 'react'
import { db } from "../firebase";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
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
import Header from '../components/Header'
import { WarningBasicAlert } from '../components/alert/BasicAlert';
import { useNavigate } from 'react-router-dom';

interface StatementDoc {
  id: string,
  term: string
}

export default function RoyaltyStatementsLists() {
  const [open, setOpen] = useState(false);
  const [isErrorChecked, setIsErrorChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statementData, setStatementData] = useState<StatementDoc[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const yearRef = useRef<HTMLInputElement>();
  const termRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  // Dialogを開く時の処理
  const handleOpen = () => {
    setOpen(true);
  }

  // Dialogを閉じる時の処理
  const handleClose = () => {
    setOpen(false);
    setIsErrorChecked(false);
  }

  // 今期のフォルダを作成する時の処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const statementYear = yearRef.current?.value;
      const statementTerm = termRef.current?.value;

      // ①statementsコレクションの参照
      const statementCollectionRef = collection(db, "statements");
      // ②statementsコレクションの中に今年度のドキュメント(年)が存在するか参照
      const statementDocRef = doc(statementCollectionRef, `${statementYear}_${statementTerm}term`);
      const statementSubCollectionDocSnapshot = await getDoc(statementDocRef);
      if (!statementSubCollectionDocSnapshot.exists()) {
        // ④今期のドキュメントが存在しない場合の処理
        const statementDocRef = doc(db, "statements", `${statementYear}_${statementTerm}term`);
        await setDoc(statementDocRef, { term: `${statementYear}年${statementTerm}期` });
        alert("ドキュメントを作成しました");
        setIsErrorChecked(false);
        setOpen(false);
      } else {
        // ④ドキュメントが存在する場合
        setIsErrorChecked(true);
        setErrorMessage("今期のドキュメントが存在しています");
        console.log(errorMessage);
        return
      }
      setFetchTrigger(prev => !prev);
    } catch (e: any) {
      console.error(e.message);
      setIsErrorChecked(true);
      setErrorMessage("ドキュメントの作成に失敗しました。管理者にお問合せください。");
    }
  }

  useEffect(() => {
    const fetchStatementData = async () => {
      const querySnapshot = await getDocs(collection(db, "statements"));
      const statementsData: StatementDoc[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        term: doc.data().term
      }));
      setStatementData(statementsData);
    }
    fetchStatementData();
  }, [])

  // 各計算書リンクをクリックした時の処理
  const handleNextPage = (id: string, term: string) => {
    navigate(`/royaltystatementlists/${encodeURIComponent(id)}`, { state: { id: id, term: term } });
  }

  // useEffect(() => {
  //   fetchStatementDocs();
  // }, [fetchStatementDocs, fetchTrigger]);

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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>作成する期を入力してください</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  {isErrorChecked && <WarningBasicAlert message={errorMessage} />}
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    id="name"
                    name="email"
                    margin='dense'
                    placeholder='2024'
                    type="text"
                    variant="standard"
                    sx={{ display: "block" }}
                    inputRef={yearRef}
                    autoFocus
                    required
                    fullWidth
                  />
                  <Typography>年</Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    type="text"
                    margin='dense'
                    id="name"
                    name="email"
                    placeholder='1'
                    variant="standard"
                    inputRef={termRef}
                    fullWidth
                    autoFocus
                    required
                  />
                  <Typography>期</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>CANCEL</Button>
              <Button type='submit'>CREATE</Button>
            </DialogActions>
          </form>
        </Dialog>
        <List>
          {statementData.length > 0 ? (
            statementData.map((statements, index) => (
              <Box key={index}>
                <ListItemButton onClick={() => handleNextPage(statements.id, statements.term)}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${statements.term} 印税計算書`}
                      primaryTypographyProps={{
                        color: 'text.secondary',
                        fontWeight: 'bold',
                        variant: 'body1',
                      }}
                    />
                  </ListItem>
                </ListItemButton>
                <Divider />
              </Box>
            ))
          ) : (
            <Box sx={{ margin: "24px auto", textAlign: "center" }}>
              <Typography variant='body1' color="text.secondary">計算書フォルダが存在しません</Typography>
            </Box>
          )}
        </List>
      </Box>
    </>
  )
}
