"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Box from "@mui/material/Box";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: { main: "#4361ee" },
    secondary: { main: "#7209b7" },
    success: { main: "#2ecc71" },
    background: { default: "#f8f9fa", paper: "#ffffff" },
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
});

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: sidebarOpen ? "280px" : "60px",
            transition: "margin-left 0.3s ease",
            p: { xs: 2, md: 4 },
            maxWidth: "960px",
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
