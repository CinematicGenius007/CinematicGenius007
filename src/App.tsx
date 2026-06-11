import { useState } from "react";
import { useMode } from "./engine/useMode";
import { personas } from "./modes/personas";
import { themes } from "./modes/themes";
import ThemeProvider from "./components/ThemeProvider";
import ModeSwitcher from "./sections/ModeSwitcher";
import AnimePage from "./pages/AnimePage";
import DataPage from "./pages/DataPage";
import DesignerPage from "./pages/DesignerPage";
import EngineerPage from "./pages/EngineerPage";
import EverydayPage from "./pages/EverydayPage";
import PmPage from "./pages/PmPage";
import RetroPage from "./pages/RetroPage";
import PdfPage from "./pages/PdfPage";
import SignalPage from "./pages/SignalPage";
import DirectorPage from "./pages/DirectorPage";
import CodebasePage from "./pages/CodebasePage";

import type { ModeId } from "./modes/types";

const pageMap = {
  engineer: EngineerPage,
  pm: PmPage,
  designer: DesignerPage,
  data: DataPage,
  everyday: EverydayPage,
  anime: AnimePage,
  retro: RetroPage,
  signal: SignalPage,
  director: DirectorPage,
  codebase: CodebasePage,
} as const;

function App() {
  const mode = useMode();
  const [pdfDark, setPdfDark] = useState(false);
  const persona = personas[mode as ModeId];

  const theme = mode === "pdf"
    ? (pdfDark ? themes.pdfDark : themes.pdf)
    : persona.theme;

  if (mode === "pdf") {
    return (
      <ThemeProvider theme={theme}>
        <div className="page-shell">
          <PdfPage dark={pdfDark} onToggleTheme={() => setPdfDark((v) => !v)} />
          <ModeSwitcher currentMode={mode} />
        </div>
      </ThemeProvider>
    );
  }

  const Page = pageMap[mode as keyof typeof pageMap];

  return (
    <ThemeProvider theme={theme}>
      <div className={`page-shell page-shell--${mode}`}>
        <Page mode={mode} />
        <ModeSwitcher currentMode={mode} />
      </div>
    </ThemeProvider>
  );
}

export default App;
