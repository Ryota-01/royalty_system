import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardActionArea, Grid, Typography } from '@mui/material'

export default function HomeMenuComponent() {
  const styles = {
    card: {
      textAlign: "center",
      padding: "32px 0",
      fontSize: "1.2rem",
    },
    link: {
      textDecoration: "none",
    },
    menuTitle: {
      fontWeight: "bold",
      mb: 0.5
    }
  }

  const menuItems = [
    {
      writerMenu: [
        { titleEn: "Writer Register", titleJa: "作家登録", pathName: "/writerregister" },
        { titleEn: "Writers", titleJa: "作家一覧", pathName: "/writers" },
      ],
      publisherMenu: [
        { titleEn: "Publisher Register", titleJa: "出版社登録", pathName: "/publisherregister" },
        { titleEn: "Publishers", titleJa: "出版社一覧", pathName: "/publishers" },
      ],
      statement: [
        { titleEn: "Create Statement", titleJa: "明細書作成", pathName: "/royaltystatementlists" },
      ]
    }
  ]
  return (
    <>
      <Grid container rowSpacing={{ xs: 3 }} columnSpacing={4} justifyContent="center" mb={4}>
        {menuItems.map((menuItem) => (
          <>
            {/* 作家関連のメニュー */}
            {menuItem.writerMenu.map((menu) =>
              <Grid key={menu.titleEn} item xs={12} md={4}>
                <Link to={menu.pathName} style={styles.link}>
                  <CardActionArea>
                    <Card sx={styles.card}>
                      <Typography variant='h6' sx={styles.menuTitle}>
                        {menu.titleEn}
                      </Typography>
                      <Typography variant='body2'>
                        ー {menu.titleJa} ー
                      </Typography>
                    </Card>
                  </CardActionArea>
                </Link>
              </Grid>
            )}
          </>
        ))}
      </Grid>
      <Grid container rowSpacing={{ xs: 3 }}  columnSpacing={4} justifyContent="center" mt={4}>
        {menuItems.map((menuItem) => (
          <>
            {/* 出版社関連のメニュー */}
            {menuItem.publisherMenu.map((menu) => (
              <Grid key={menu.titleEn} item xs={12} md={4}>
                <Link to={menu.pathName} style={styles.link}>
                  <CardActionArea>
                    <Card sx={styles.card}>
                      <Typography variant='h6' color="inherit" sx={styles.menuTitle}>
                        {menu.titleEn}
                      </Typography>
                      <Typography variant='body2'>
                        ー {menu.titleJa} ー
                      </Typography>
                    </Card>
                  </CardActionArea>
                </Link>
              </Grid>
            ))}
          </>
        ))}
      </Grid>
      <Grid container columnSpacing={4} justifyContent="center" mt={4}>
        {menuItems.map((menuItem) => (
          <>
            {/* 明細書作成メニューコンポ */}
            {menuItem.statement.map((menu) => (
              <Grid key={menu.titleEn} item xs={12} md={4}>
                <Link to={menu.pathName} style={styles.link}>
                  <CardActionArea>
                    <Card sx={styles.card}>
                      <Typography variant='h6' sx={styles.menuTitle}>
                        {menu.titleEn}
                      </Typography>
                      <Typography variant='body2'>
                        ー {menu.titleJa} ー
                      </Typography>
                    </Card>
                  </CardActionArea>
                </Link>
              </Grid>
            ))}
          </>
        ))}
      </Grid>
    </>
  )
}
