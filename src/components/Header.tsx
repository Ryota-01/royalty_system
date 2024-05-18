import React from "react";

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const title = props.title;
  return (
    <>
      <h2>{title}</h2>
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/writerregister">作家登録</a>
        </li>
        <li>
          <a href="/writers">作家一覧</a>
        </li>
        <li>
          <a href="/publisherregister">出版社登録</a>
        </li>
        <li>
          <a href="/publishers">出版社一覧</a>
        </li>
        <li>
          <a href="/royaltystatementinput">明細書作成</a>
        </li>
      </ul>
    </>
  )
}

// export default Header;