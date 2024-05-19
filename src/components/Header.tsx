import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box, Divider } from "@mui/material";

interface HeaderProps {
  title: string;
  discription: string;
}

export default function Header(props: HeaderProps) {
  const title = props.title;
  const discription = props.discription;
  return (
    <header style={{ padding: "28px 28px" }}>
      <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h4" fontWeight="bold">INZEIKSAN</Typography>
      </Link>
      <Box sx={{ margin: "0 auto", textAlign: "center" }}>
        <Typography variant="h4" mt={5} mb={2}>
          {title}
        </Typography>
        <Typography variant="body1">
          {discription}
        </Typography>
      </Box>
    </header>
  )
}

// export default Header;