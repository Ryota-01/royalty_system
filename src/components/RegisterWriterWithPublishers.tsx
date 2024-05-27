import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { useFieldArray, useForm } from "react-hook-form";

type RegisterWritersWithPublishersProps = {
  setIsCheckedError: React.Dispatch<React.SetStateAction<boolean>>
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setRegisterPublisherData: React.Dispatch<React.SetStateAction<RegisterPublisherData[]>>;
  activeStep: number;
}

type RegisterPublisherData = {
  出版社?: string;
  マネジメント料率?: string;
}

type FormValues = {
  writersWithPublishersData: {
    出版社: string;
    マネジメント料率: string;
  }[];
};

export default function RegisterWriterWithPublishers(props: RegisterWritersWithPublishersProps) {
  const setActiveStep = props.setActiveStep;
  const setIsCheckedError = props.setIsCheckedError;
  const setErrorMessage = props.setErrorMessage;
  const setRegisterPublisherData = props.setRegisterPublisherData;
  const activeStep = props.activeStep;
  const publisherRef = useRef<HTMLInputElement>(null);
  const percentageRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      writersWithPublishersData: [{ 出版社: "", マネジメント料率: "%" }]
    }
  });
  const { fields, append } = useFieldArray({
    name: "writersWithPublishersData",
    control,
    // keyName: "key", // デフォルトはidだが、keyに変更
  })

  const handleRegisterPublisher = (data: FormValues) => {
    try {
      setRegisterPublisherData(data.writersWithPublishersData);
      setActiveStep(2);
    } catch (e: any) {
      setIsCheckedError(true);
      setErrorMessage(e.message);
      console.error(e.message);
    }
  }

  // 前のページに戻る
  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setIsCheckedError(false);
  }

  return (
    <div>
      <Box textAlign="center" padding="36px 0">
        <Typography variant="body1">
          取引先出版社を入力してください
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(handleRegisterPublisher)}>
        {fields.map((field, index) => {
          return (
            <Grid container columnSpacing={3} rowSpacing={3} alignItems="center" mb={4} key={field.id}>
              <Grid item alignItems="center">
                <Typography>出版社 {index + 1}</Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  {...register(`writersWithPublishersData.${index}.出版社` as const, {
                    required: true,
                  })}
                  placeholder="株式会社○○"
                  label="出版社名"
                  size="small"
                  inputRef={publisherRef}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  {...register(`writersWithPublishersData.${index}.マネジメント料率` as const, {
                    required: true
                  })}
                  placeholder="20%"
                  label="マネジメント率"
                  size="small"
                  inputRef={percentageRef}
                  fullWidth
                />
              </Grid>
            </Grid>
          )
        })}
        <Box mt={5}>
          <Button onClick={() => append({ 出版社: "", マネジメント料率: "%" })}>1件追加</Button>
        </Box>
        <Grid
          container
          justifyContent="center"
          mt={5}
        >
          <Box mr={1}>
            <Button variant="contained" fullWidth onClick={handleBack}>戻る</Button>
          </Box>
          <Box ml={1}>
            <Button type="submit" variant="contained" fullWidth>確認画面へ</Button>
          </Box>
        </Grid>
      </form>
    </div>
  )
}
