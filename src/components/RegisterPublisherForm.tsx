import React, { RefObject, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export default function RegisterPublisherForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const publisherNameRef = useRef<HTMLInputElement>(null);
  const furiganaRef = useRef<HTMLInputElement>(null);
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const value = {
        publisherName: publisherNameRef.current?.value,
        furigana: furiganaRef.current?.value,
      };
      const publishersCollectionRef = collection(db, "出版社一覧");
      const publisherDocRef = doc(publishersCollectionRef, value.furigana);
      const docSnap = await getDoc(publisherDocRef);
      if (!docSnap.exists()) {
        // 同一名のドキュメントが存在しない場合の処理
        await setDoc(publisherDocRef, value);
        alert("出版社情報を登録しました");
      } else {
        // 同一名のドキュメントが存在する場合の処理
        setErrorMessage("すでに出版社情報が存在しています。");
      }
    } catch (e: any) {
      console.error(e.message);
      setErrorMessage("データの登録に失敗しました。");
    }
  };

  const inputValue = (name: string, id: string, type: string, ref: RefObject<HTMLInputElement>) => ({
    input: {
      name: name,
      id: id,
      type: type,
      ref: ref,
      defaultValue: name + "test",
    },
  });

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <ul>
          <li>
            <label htmlFor="publisherName">出版社名</label>
            <input
              {...inputValue("publisherName", "publisherName", "text", publisherNameRef).input}
            />
          </li>
          <li>
            <label htmlFor="furigana">フリガナ</label>
            <input
              {...inputValue("furigana", "furigana", "text", furiganaRef)
                .input}
              required
            />
          </li>
          {/* <li>
              <label htmlFor="furigana">フリガナ</label>
              <input
                {...inputValue("furigana", "furigana", "checkbox", furiganaRef)
                  .input}
                required
              />
            </li> */}
          <p>{errorMessage}</p>
          <button>戻る</button>
          <button>登録</button>
        </ul>
      </form>
    </>
  );
}


