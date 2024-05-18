import React, { RefObject, useRef, useState } from "react";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export default function RegisterWriter() {
  const [errorMessage, setErrorMessage] = useState("");
  const penNameRef = useRef<HTMLInputElement>(null);
  const writerNameRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const furiganaRef = useRef<HTMLInputElement>(null);
  const bankNameRef = useRef<HTMLInputElement>(null);
  const branchNameRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const value = {
        penName: penNameRef.current?.value,
        writerName: writerNameRef.current?.value,
        companyName: companyNameRef.current?.value,
        furigane: furiganaRef.current?.value,
        bankName: bankNameRef.current?.value,
        branchName: branchNameRef.current?.value,
      };
      const writerListCollectionRef = collection(db, "作家一覧");
      const writerInfoDocRef = doc(writerListCollectionRef, value.writerName);
      const docSnap = await getDoc(writerInfoDocRef);
      if (!docSnap.exists()) {
        // 同一名のドキュメントが存在しない場合の処理
        await setDoc(writerInfoDocRef, value);
        alert("作家情報を登録しました");
      } else {
        // 同一名のドキュメントが存在する場合の処理
        setErrorMessage("すでに作家情報が存在しています。");
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
      <Header title="RegisterWriter" />
      <div>
        <form onSubmit={handleOnSubmit}>
          <ul>
            <li>
              <label htmlFor="penName">筆名</label>
              <input
                {...inputValue("penName", "penName", "text", penNameRef).input}
              />
            </li>
            <li>
              <label htmlFor="writerName">作家名</label>
              <input
                {...inputValue(
                  "writerName",
                  "writerName",
                  "text",
                  writerNameRef
                ).input}
                required
              />
            </li>
            <li>
              <label htmlFor="companyName">法人名</label>
              <input
                {...inputValue(
                  "companyName",
                  "companyName",
                  "text",
                  companyNameRef
                ).input}
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
            <li>
              <label htmlFor="bankName">振込銀行</label>
              <input
                {...inputValue("bankName", "bankName", "text", bankNameRef)
                  .input}
                required
              />
            </li>
            <li>
              <label htmlFor="branchName">支店名</label>
              <input
                {...inputValue(
                  "branchName",
                  "branchName",
                  "text",
                  branchNameRef
                ).input}
                required
              />
            </li>
            <p>{errorMessage}</p>
            <button>戻る</button>
            <button>登録</button>
          </ul>
        </form>
      </div>
    </>
  );
}
