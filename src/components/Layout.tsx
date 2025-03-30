import React, { useState, ReactElement } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Collapse,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  TableChart as TableChartIcon,
  History as HistoryIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

interface LayoutProps {
  children: ReactElement;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

const menuItems = [
  { text: "Overview", icon: <DashboardIcon />, path: "/" },
  { text: "Real-Time Chart", icon: <TimelineIcon />, path: "/real-time" },
  { text: "My Stocks", icon: <TableChartIcon />, path: "/stocks" },
  { text: "Transaction History", icon: <HistoryIcon />, path: "/transactions" },
];

const Layout: React.FC<LayoutProps> = ({
  children,
  toggleTheme,
  isDarkMode,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    useState<null | HTMLElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchAnchorEl, setSearchAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpAnchorEl, setHelpAnchorEl] = useState<null | HTMLElement>(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [logoutAnchorEl, setLogoutAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMobileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMobileMenuAnchorEl(event.currentTarget);
    setIsMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // For example:
    // localStorage.removeItem("token");
    // navigate("/login");
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #1E1B4B 0%, #312E81 100%)"
            : "linear-gradient(180deg, #F3E8FD 0%, #E9D8FD 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: 2,
          minHeight: "64px !important",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(90deg, rgba(49, 46, 129, 0.8) 0%, rgba(30, 27, 75, 0.8) 100%)"
              : "linear-gradient(90deg, rgba(243, 232, 253, 0.8) 0%, rgba(233, 216, 253, 0.8) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Collapse in={!isCollapsed} orientation="horizontal">
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                  : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dashboard
          </Typography>
        </Collapse>
        <IconButton onClick={handleCollapseToggle} size="small">
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Toolbar>
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: "8px",
              mx: 1,
              mb: 1,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, rgba(159, 122, 234, 0.2) 0%, rgba(233, 216, 253, 0.2) 100%)"
                    : "linear-gradient(90deg, rgba(107, 70, 193, 0.2) 0%, rgba(159, 122, 234, 0.2) 100%)",
                transform: "translateX(4px)",
                "& .MuiListItemIcon-root": {
                  color: "#FFFFFF",
                },
                "& .MuiListItemText-primary": {
                  color: "#FFFFFF",
                },
              },
              "&.Mui-selected": {
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #9F7AEA 0%, #E9D8FD 100%)"
                    : "linear-gradient(90deg, #6B46C1 0%, #9F7AEA 100%)",
                color: theme.palette.mode === "dark" ? "#1E1B4B" : "#FFFFFF",
                "&:hover": {
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(90deg, #8B6AE9 0%, #D8C3FD 100%)"
                      : "linear-gradient(90deg, #5A3AB0 0%, #8B6AE9 100%)",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === item.path
                    ? "#FFFFFF"
                    : theme.palette.mode === "dark"
                    ? "#E9D8FD"
                    : "#6B46C1",
                minWidth: isCollapsed ? "auto" : 40,
                mr: isCollapsed ? 0 : 2,
                transition: "all 0.2s ease-in-out",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <Collapse in={!isCollapsed} orientation="horizontal">
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 700,
                    color:
                      location.pathname === item.path
                        ? "#FFFFFF"
                        : theme.palette.mode === "dark"
                        ? "#E9D8FD"
                        : "#6B46C1",
                    fontSize: "1rem",
                    letterSpacing: "0.5px",
                    opacity: 0.95,
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              />
            </Collapse>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Fade in timeout={500}>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            sx={{
              width: "100%",
              justifyContent: isCollapsed ? "center" : "flex-start",
              color: theme.palette.mode === "dark" ? "#9F7AEA" : "#6B46C1",
              transition: "all 0.2s ease-in-out",
              borderRadius: "8px",
              "&:hover": {
                background: "transparent",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 0 0 2px rgba(159, 122, 234, 0.3)"
                    : "0 0 0 2px rgba(107, 70, 193, 0.3)",
                transform: "translateX(4px)",
              },
            }}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            {!isCollapsed && (
              <Typography sx={{ ml: 2 }}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Typography>
            )}
          </IconButton>
        </Fade>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: {
            xs: "100%",
            sm: `calc(100% - ${
              isCollapsed ? collapsedDrawerWidth : drawerWidth
            }px)`,
          },
          ml: { sm: `${isCollapsed ? collapsedDrawerWidth : drawerWidth}px` },
          backdropFilter: "blur(10px)",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(90deg, rgba(49, 46, 129, 0.8) 0%, rgba(30, 27, 75, 0.8) 100%)"
              : "linear-gradient(90deg, rgba(243, 232, 253, 0.8) 0%, rgba(233, 216, 253, 0.8) 100%)",
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMobileMenuClick}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: isDarkMode ? "#E9D8FD" : "#6B46C1",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                  : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {menuItems.find((item) => item.path === location.pathname)?.text}
            {location.pathname === "/" && " (past 30 days)"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: isCollapsed ? collapsedDrawerWidth : drawerWidth },
          flexShrink: { sm: 0 },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Slide direction="right" in={mobileOpen} mountOnEnter unmountOnExit>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: `1px solid ${theme.palette.divider}`,
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(26, 31, 44, 0.95)"
                    : "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(10px)",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Slide>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              background:
                theme.palette.mode === "dark"
                  ? "rgba(26, 31, 44, 0.95)"
                  : "#d0bfff",
              backdropFilter: "blur(10px)",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 0, md: 3 },
          pt: { xs: 8, md: 11 },
          width: { xs: "100%", md: "100%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          minHeight: "calc(100vh - 64px)",
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #F3E8FD 0%, #E9D8FD 50%, #D6BCFA 100%)"
              : "linear-gradient(90deg, rgba(49, 46, 129, 0.8) 0%, rgba(30, 27, 75, 0.8) 100%)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              theme.palette.mode === "light"
                ? "radial-gradient(circle at 50% 50%, rgba(233, 216, 253, 0.3) 0%, rgba(214, 188, 250, 0.1) 100%)"
                : "radial-gradient(circle at 50% 50%, rgba(45, 55, 72, 0.3) 0%, rgba(26, 32, 44, 0.1) 100%)",
            zIndex: 0,
          },
          "& > *": {
            position: "relative",
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchorEl}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: "16px",
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(49, 46, 129, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)"
              : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${
              isDarkMode ? "rgba(233, 216, 253, 0.2)" : "rgba(0, 0, 0, 0.1)"
            }`,
            boxShadow: isDarkMode
              ? "0 4px 20px rgba(0, 0, 0, 0.2)"
              : "0 4px 20px rgba(0, 0, 0, 0.1)",
            minWidth: "200px",
            overflow: "hidden",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            onClick={() => {
              handleMobileMenuClose();
              navigate(item.path);
            }}
            selected={location.pathname === item.path}
            sx={{
              color: isDarkMode ? "#E9D8FD" : "#6B46C1",
              "&:hover": {
                background: isDarkMode
                  ? "rgba(233, 216, 253, 0.1)"
                  : "rgba(107, 70, 193, 0.1)",
              },
              "&.Mui-selected": {
                background: isDarkMode
                  ? "linear-gradient(90deg, rgba(159, 122, 234, 0.2) 0%, rgba(233, 216, 253, 0.2) 100%)"
                  : "linear-gradient(90deg, rgba(107, 70, 193, 0.2) 0%, rgba(159, 122, 234, 0.2) 100%)",
                color: isDarkMode ? "#E9D8FD" : "#6B46C1",
              },
            }}
          >
            <ListItemIcon>
              {React.cloneElement(item.icon as React.ReactElement, {
                sx: {
                  color:
                    location.pathname === item.path
                      ? isDarkMode
                        ? "#E9D8FD"
                        : "#6B46C1"
                      : "inherit",
                },
              })}
            </ListItemIcon>
            {item.text}
          </MenuItem>
        ))}
        <Divider
          sx={{
            my: 1,
            borderColor: isDarkMode
              ? "rgba(233, 216, 253, 0.1)"
              : "rgba(107, 70, 193, 0.1)",
          }}
        />
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            toggleTheme();
          }}
          sx={{
            color: isDarkMode ? "#E9D8FD" : "#6B46C1",
            "&:hover": {
              background: isDarkMode
                ? "rgba(233, 216, 253, 0.1)"
                : "rgba(107, 70, 193, 0.1)",
            },
          }}
        >
          <ListItemIcon>
            {isDarkMode ? (
              <LightModeIcon
                sx={{ color: isDarkMode ? "#E9D8FD" : "#6B46C1" }}
              />
            ) : (
              <DarkModeIcon
                sx={{ color: isDarkMode ? "#E9D8FD" : "#6B46C1" }}
              />
            )}
          </ListItemIcon>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout;
