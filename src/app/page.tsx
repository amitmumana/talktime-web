"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/webcam");
  };

  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center" flexDirection="column" gap={2}>
      <Typography variant="h4">Discover & Share</Typography> {/* Added variant="h4" */}
      <Button variant="contained" onClick={handleLoginClick}>
        Video call
      </Button>
    </Box>
  );
};

export default Home;
