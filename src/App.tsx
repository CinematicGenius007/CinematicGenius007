import { Suspense, useEffect, useState } from "react";
import { useMode } from "./engine/useMode";
import { registry, preloadPersona } from "./engine/registry";
import { themes } from "./modes/themes";
import { viewIndex } from "./engine/transitions";
import { MotionPreferenceProvider } from "./engine/useMotionPreference";
import ThemeProvider from "./components/ThemeProvider";
import TransitionLayer from "./components/TransitionLayer";
import Dial from "./sections/Dial";
import type { ModeId } from "./modes/types";

function Marker({ mode }: { mode: ModeId }) {
  return (
    <div className="marker" aria-hidden="true">
      <span className="marker__name">AYUSH SAINI</span>
      <span className="marker__view">
        view {viewIndex(mode)}/11 · {registry[mode].label.toLowerCase()}
      </span>
    </div>
  );
}

function App() {
  const target = useMode();
  const [displayed, setDisplayed] = useState(target);
  const [tx, setTx] = useState<{ from: ModeId; to: ModeId } | null>(null);
  const [pdfDark, setPdfDark] = useState(false);

  // Queue a transition whenever the URL-driven target drifts from the page on
  // screen; chained switches resolve one cut at a time.
  useEffect(() => {
    if (target !== displayed && !tx) {
      preloadPersona(target);
      setTx({ from: displayed, to: target });
    }
  }, [target, displayed, tx]);

  const { theme: personaTheme, Page } = registry[displayed];
  const theme = displayed === "pdf" ? (pdfDark ? themes.pdfDark : themes.pdf) : personaTheme;

  return (
    <MotionPreferenceProvider tier={theme.motion}>
      <ThemeProvider theme={theme}>
        <div className={`page-shell page-shell--${displayed}`}>
          <Suspense fallback={null}>
            {displayed === "pdf" ? (
              <Page dark={pdfDark} onToggleTheme={() => setPdfDark((v) => !v)} />
            ) : (
              <Page mode={displayed} />
            )}
          </Suspense>
          {displayed !== "pdf" ? <Marker mode={displayed} /> : null}
          <Dial currentMode={displayed} />
        </div>
        <TransitionLayer
          from={tx?.from ?? displayed}
          to={tx?.to ?? null}
          onMidpoint={() => {
            if (tx) setDisplayed(tx.to);
          }}
          onDone={() => setTx(null)}
        />
      </ThemeProvider>
    </MotionPreferenceProvider>
  );
}

export default App;
