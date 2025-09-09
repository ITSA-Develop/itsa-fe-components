// import { useEffect, useRef, useState } from "react";

// type Size = { width: number; height: number };

// export function useViewportSize(debounceMs = 150): Size {
//   const isClient = typeof window !== "undefined";
//   const [size, setSize] = useState<Size>(() => ({
//     width: isClient ? window.innerWidth : 0,
//     height: isClient ? window.innerHeight : 0,
//   }));
//   const tRef = useRef<number | null>(null);

//   useEffect(() => {
//     if (!isClient) return;

//     const update = () => {
//       const next = { width: window.innerWidth, height: window.innerHeight };
//       setSize((prev) =>
//         prev.width !== next.width || prev.height !== next.height ? next : prev
//       );
//     };

//     const onResize = () => {
//       if (tRef.current != null) window.clearTimeout(tRef.current);
//       tRef.current = window.setTimeout(update, debounceMs);
//     };

//     update();

//     window.addEventListener("resize", onResize, { passive: true });
//     window.addEventListener("orientationchange", onResize, { passive: true });
//     const vv = (window as Window & typeof globalThis).visualViewport as VisualViewport | undefined;
//     vv?.addEventListener("resize", onResize, { passive: true });

//     return () => {
//       if (tRef.current != null) window.clearTimeout(tRef.current);
//       window.removeEventListener("resize", onResize);
//       window.removeEventListener("orientationchange", onResize);
//       vv?.removeEventListener("resize", onResize);
//     };
//   }, [debounceMs, isClient]);

//   return size;
// }
