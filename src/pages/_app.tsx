import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Layout from "../components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "../theme";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
