import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from "../../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

type RegisterWriterData = {
  筆名?: string;
  実名?: string;
  所属事務所?: string;
  フリガナ?: string;
  振込先?: string;
  支店名?: string;
};

type RegisterPublisherData = {
  出版社?: string;
  マネジメント料率?: string;
}

type ConfirmRegisterWriterWithPublishersProps = {
  setIsCheckedError: React.Dispatch<React.SetStateAction<boolean>>
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  registerWriterData: RegisterWriterData;
  registerPublisherData: RegisterPublisherData[];
  activeStep: number;
}

export default function ConfirmRegisterWriterWithPublishers(props: ConfirmRegisterWriterWithPublishersProps) {
  const setErrorMessage = props.setErrorMessage;
  const setIsCheckedError = props.setIsCheckedError;
  const registerWriterData = props.registerWriterData;
  const registerPublisherData = props.registerPublisherData;
  const setActiveStep = props.setActiveStep;
  const activeStep = props.activeStep;
  const navigate = useNavigate();

  // firebaseのwriterコレクションに作家情報(registerWriterData)と出版社情報(registerPublisherData)を保存
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const writerListCollectionRef = collection(db, "writers");
      const writerInfoDocRef = doc(writerListCollectionRef, registerWriterData.フリガナ);
      await setDoc(writerInfoDocRef, { registerWriterData, registerPublisherData });
      alert("作家情報を登録しました");
      navigate("/home");
    } catch (e: any) {
      console.error(e.message);
      if (e.message === "Quota exceeded.") {
        setErrorMessage("データの保存容量が上限に達しました。管理者にお問合せください。");
        console.log(e.message)
      } else {
        setErrorMessage("データの登録に失敗しました。");
        console.log(e.message)
      }
      setIsCheckedError(true);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setIsCheckedError(false);
  }

  const styles = {
    tr: {
      textAlign: "right" as "right",
    },
    th: {
      fontWeight: "normal",
      padding: "10px 0 0 0",
    },
    td: {
      textAlign: "left" as "left",
      padding: "10px 0 0 28px",
      backGround: "red"
    }
  }

  return (
    <div>
      <Box textAlign="center" padding="40px 0">
        <Typography variant="body1">
          以下の内容で登録しますか？
        </Typography>
      </Box>
      <form onSubmit={handleOnSubmit}>
        <table style={{ margin: "0 auto" }}>
          <tbody>
            <tr style={styles.tr}>
              <th style={styles.th}>筆名：</th>
              <td style={styles.td}>{registerWriterData.筆名}</td>
            </tr>
            <tr style={styles.tr}>
              <th style={styles.th}>実名（ヨミ）：</th>
              <td style={styles.td}>{registerWriterData.実名}（{registerWriterData.フリガナ}）</td>
            </tr>
            <tr style={styles.tr}>
              <th style={styles.th}>所属事務所：</th>
              {registerWriterData.所属事務所 ?
                (
                  <td style={styles.td}>{registerWriterData.所属事務所}</td>
                ) : (
                  <td style={styles.td}>無し</td>
                )}
            </tr>
            <tr style={styles.tr}>
              <th style={styles.th}>振込先：</th>
              <td style={styles.td}>{registerWriterData.振込先}　{registerWriterData.支店名}</td>
            </tr>
            {registerPublisherData.map((publisher, index) => {
              console.log(index)
              console.log(publisher)
              return (
                <>
                  <tr style={styles.tr}>
                    <th style={styles.th}>取引先出版社 {index + 1}（手数料）：</th>
                    <td style={styles.td}>{publisher.出版社}（{publisher.マネジメント料率}）</td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
        <Grid
          container
          justifyContent="center"
          mt={5}
        >
          <Box mr={1}>
            <Button variant="contained" fullWidth onClick={handleBack}>BACK</Button>
          </Box>
          <Box ml={1}>
            <Button type="submit" variant="contained" fullWidth>SUBMIT</Button>
          </Box>
        </Grid>
      </form>
    </div >
  )
}
