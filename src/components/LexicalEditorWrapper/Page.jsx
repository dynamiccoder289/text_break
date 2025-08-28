// components/Page.jsx
import { Box } from "@mui/material";

const Page = ({ children, sx = {} }) => {
  return (
    <Box
      sx={{
        width: "8.5in",
        minHeight: "11in",
        backgroundColor: "white",
        boxShadow: 2,
        margin: "20px auto",
        padding: "1in",
        boxSizing: "border-box",
        position: "relative",
        breakInside: "avoid",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Page;
