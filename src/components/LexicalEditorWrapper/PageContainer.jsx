// components/PageContainer.jsx
import { Box } from "@mui/material";

const PageContainer = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        padding: "20px 0",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
