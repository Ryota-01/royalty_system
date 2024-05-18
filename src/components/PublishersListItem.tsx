import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

type PublisherData = {
  furigana: string,
  publisherName: string
}

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
  }, [])

  console.log(publisherData)

  return (
    <>
      <ul>
        {publisherData && publisherData.map((publisher, index) => (
          <div key={index}>
            <li>{publisher.publisherName}</li>
            <li>{publisher.furigana}</li>
          </div>
        ))}
      </ul>
    </>
  )
}
