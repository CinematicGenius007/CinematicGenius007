import { useEffect } from "react";
import { MotionPreferenceProvider } from "./engine/useMotionPreference";
import ThemeProvider, { filmTheme } from "./components/ThemeProvider";
import ChatWidget from "./components/ChatWidget";
import ContactWidget from "./components/ContactWidget";
import FilmPage from "./pages/FilmPage";

function App() {
  // The persona era is over — old ?as= links all land on the one film now.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has("as")) {
      url.searchParams.delete("as");
      window.history.replaceState({}, "", url);
    }
  }, []);

  return (
    <MotionPreferenceProvider tier="kinetic">
      <ThemeProvider theme={filmTheme}>
        <div className="page-shell page-shell--film">
          <FilmPage />
          <ChatWidget />
          <ContactWidget />
        </div>
      </ThemeProvider>
    </MotionPreferenceProvider>
  );
}

export default App;
