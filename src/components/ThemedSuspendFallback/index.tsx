import { Box, Typography } from "@mui/material";

const ThemedSuspenseFallback = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography fontSize="24">Loading...</Typography>
    </Box>
  );
};

export default ThemedSuspenseFallback;
