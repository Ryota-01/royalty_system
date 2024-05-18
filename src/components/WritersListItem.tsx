import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

type WriterData = {
  companyName: string,
  penName: string,
  furigana: string,
  writerName: string,
  bankName: string,
  branchName: string
}

export default function WritersListItem() {
  const [writersData, setWritersData] = useState<WriterData[]>([]);
  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const writersCollectionRef = collection(db, "作家一覧");
        const getWritersItem = await getDocs(writersCollectionRef);
        const getWritersData: any = getWritersItem.docs.map((doc) => doc.data());
        setWritersData(getWritersData);
      } catch (e: any) {
        console.error(e.message);
      }
    }
    fetchWriters();
  }, [])

  return (
    <>
      <ul>
        {writersData && writersData.map((writer, index) => (
          <div key={index}>
            <li>筆名：{writer.penName}</li>
            <li>作家名：{writer.writerName}</li>
            <li>フリガナ：{writer.furigana}</li>
            <li>所属：{writer.companyName}</li>
            <li>振込銀行：{writer.bankName}</li>
            <li>支店：{writer.branchName}</li>
          </div>
        ))}
      </ul>
    </>
  )
}
