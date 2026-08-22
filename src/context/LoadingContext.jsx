// "use client";

// import { createContext, useContext, useState, useCallback } from "react";
// import SpinnerTestButton from "@/components/SpinnerTestButton";

// const LoadingContext = createContext(null);

// export function LoadingProvider({ children }) {
//   const [count, setCount] = useState(0);

//   const showLoader = useCallback(() => setCount((c) => c + 1), []);
//   const hideLoader = useCallback(() => setCount((c) => Math.max(0, c - 1)), []);

//   const withLoader = useCallback(
//     async (promise) => {
//       showLoader();
//       try {
//         return await promise;
//       } finally {
//         hideLoader();
//       }
//     },
//     [showLoader, hideLoader],
//   );

//   const isLoading = count > 0;

//   return (
//     <LoadingContext.Provider
//       value={{ isLoading, showLoader, hideLoader, withLoader }}
//     >
//       {children}

//       {isLoading && (
//         <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm">
//           <SpinnerTestButton
//             size={48}
//             className="border-white/30 border-t-white"
//           />
//         </div>
//       )}
//     </LoadingContext.Provider>
//   );
// }

// export function useLoading() {
//   const ctx = useContext(LoadingContext);
//   if (!ctx) {
//     throw new Error("useLoading must be used inside <LoadingProvider>");
//   }
//   return ctx;
// }
