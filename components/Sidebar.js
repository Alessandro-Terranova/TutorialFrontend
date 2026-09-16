"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { modules } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";

export default function Sidebar({ open, onToggle }) {
  const pathname = usePathname();
  const [expandedModules, setExpandedModules] = useState({});
  const { isCompleted, getModuleProgress } = useProgress();

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const isActive = (moduleId, lessonId) =>
    pathname === `/lesson/${moduleId}/${lessonId}`;

  return (
    <Box
      sx={{
        width: open ? 280 : 60,
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        bgcolor: "#1a1a2e",
        color: "#e0e0e0",
        transition: "width 0.3s ease",
        overflow: "hidden",
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          gap: 1,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          minHeight: 64,
        }}
      >
        <IconButton onClick={onToggle} sx={{ color: "#e0e0e0" }}>
          <MenuIcon />
        </IconButton>
        {open && (
          <Typography variant="subtitle1" fontWeight={700} noWrap>
            Tutorial Frontend
          </Typography>
        )}
      </Box>

      <Box sx={{ overflow: "auto", flexGrow: 1 }}>
        {open && (
          <List dense disablePadding>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemButton
                selected={pathname === "/"}
                sx={{
                  py: 1.5,
                  px: 2,
                  "&.Mui-selected": { bgcolor: "rgba(67,97,238,0.15)" },
                }}
              >
                <HomeIcon sx={{ mr: 1.5, fontSize: 20 }} />
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>

            {modules.map((mod) => {
              const progress = getModuleProgress(mod.id, mod.lessons);
              const allDone = progress.done === progress.total;
              return (
                <Box key={mod.id}>
                  <ListItemButton
                    onClick={() => toggleModule(mod.id)}
                    sx={{ py: 1, px: 2 }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: mod.color,
                        mr: 1.5,
                        flexShrink: 0,
                      }}
                    />
                    <ListItemText
                      primary={mod.title}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 600,
                        noWrap: true,
                      }}
                    />
                    {allDone && (
                      <CheckCircleIcon sx={{ fontSize: 16, color: "#2ecc71", mr: 0.5 }} />
                    )}
                    {!allDone && progress.done > 0 && (
                      <Typography sx={{ fontSize: 11, color: "#888", mr: 0.5 }}>
                        {progress.done}/{progress.total}
                      </Typography>
                    )}
                    {expandedModules[mod.id] ? (
                      <ExpandLess sx={{ fontSize: 18 }} />
                    ) : (
                      <ExpandMore sx={{ fontSize: 18 }} />
                    )}
                  </ListItemButton>

                  <Collapse in={expandedModules[mod.id]} timeout="auto">
                    <List dense disablePadding>
                      {mod.lessons.map((lesson, idx) => {
                        const done = isCompleted(mod.id, lesson.id);
                        return (
                          <Link
                            key={lesson.id}
                            href={`/lesson/${mod.id}/${lesson.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <ListItemButton
                              selected={isActive(mod.id, lesson.id)}
                              sx={{
                                pl: 5,
                                py: 0.75,
                                "&.Mui-selected": {
                                  bgcolor: "rgba(67,97,238,0.2)",
                                  borderRight: "3px solid #4361ee",
                                },
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  color: "#888",
                                  mr: 1,
                                  minWidth: 18,
                                }}
                              >
                                {done ? (
                                  <CheckCircleIcon sx={{ fontSize: 14, color: "#2ecc71" }} />
                                ) : (
                                  `${idx + 1}.`
                                )}
                              </Typography>
                              <ListItemText
                                primary={lesson.title}
                                primaryTypographyProps={{
                                  fontSize: 12.5,
                                  noWrap: true,
                                  sx: done ? { color: "rgba(46,204,113,0.85)" } : undefined,
                                }}
                              />
                            </ListItemButton>
                          </Link>
                        );
                      })}
                    </List>
                  </Collapse>
                </Box>
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
}
