import { Suspense, useState } from "react";
import { useMode } from "./engine/useMode";
import { registry } from "./engine/registry";
import { themes } from "./modes/themes";
import ThemeProvider from "./components/ThemeProvider";
import ModeSwitcher from "./sections/ModeSwitcher";

function App() {
  const mode = useMode();
  const [pdfDark, setPdfDark] = useState(false);
  const { theme: personaTheme, Page } = registry[mode];

  const theme = mode === "pdf"
    ? (pdfDark ? themes.pdfDark : themes.pdf)
    : personaTheme;

  if (mode === "pdf") {
    return (
      <ThemeProvider theme={theme}>
        <div className="page-shell">
          <Suspense fallback={null}>
            <Page dark={pdfDark} onToggleTheme={() => setPdfDark((v) => !v)} />
          </Suspense>
          <ModeSwitcher currentMode={mode} />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={`page-shell page-shell--${mode}`}>
        <Suspense fallback={null}>
          <Page mode={mode} />
        </Suspense>
        <ModeSwitcher currentMode={mode} />
      </div>
    </ThemeProvider>
  );
}

export default App;
