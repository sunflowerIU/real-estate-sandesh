"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const ENTRY_KEY = "gharjagga-entry-door-seen-v4";

type DoorPhase = "closed" | "opening" | "revealing";

export function EntryDoor() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<DoorPhase>("closed");
  const previousOverflow = useRef("");

  useLayoutEffect(() => {
    const alreadySeen = window.sessionStorage.getItem(ENTRY_KEY) === "true";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadySeen || reduceMotion) {
      document.documentElement.classList.add("entry-door-seen");
      window.queueMicrotask(() => setVisible(false));
      return;
    }

    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const openingTimer = window.setTimeout(() => setPhase("opening"), 800);
    const safetyTimer = window.setTimeout(() => setPhase("revealing"), 6500);

    return () => {
      window.clearTimeout(openingTimer);
      window.clearTimeout(safetyTimer);
      document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  useEffect(() => {
    if (phase !== "revealing") return;

    const revealTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(ENTRY_KEY, "true");
      document.documentElement.classList.add("entry-door-seen");
      document.body.style.overflow = previousOverflow.current;
      setVisible(false);
    }, 850);

    return () => window.clearTimeout(revealTimer);
  }, [phase]);

  if (!visible) return null;

  return (
    <div className={`entry-door${phase !== "closed" ? " opening" : ""}${phase === "revealing" ? " revealing" : ""}`} aria-hidden="true">
      <div className="door-light" />
      <div className="door-panel door-panel-left">
        <div className="door-frame">
          <span className="door-arch" />
          <span className="door-rosette" />
          <span className="door-carving door-carving-top" />
          <span className="door-carving door-carving-middle" />
          <span className="door-carving door-carving-bottom" />
          <span className="door-carved-band" />
        </div>
        <span className="door-handle" />
      </div>
      <div
        className="door-panel door-panel-right"
        onTransitionEnd={(event) => {
          if (phase === "opening" && event.propertyName === "transform") setPhase("revealing");
        }}
      >
        <div className="door-frame">
          <span className="door-arch" />
          <span className="door-rosette" />
          <span className="door-carving door-carving-top" />
          <span className="door-carving door-carving-middle" />
          <span className="door-carving door-carving-bottom" />
          <span className="door-carved-band" />
        </div>
        <span className="door-handle" />
      </div>
      <div className="door-welcome">
        <span className="door-emblem">घ</span>
        <strong>घरजग्गा</strong>
        <small>घरबाट जग्गासम्म</small>
      </div>
    </div>
  );
}
