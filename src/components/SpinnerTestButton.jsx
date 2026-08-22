// "use client";

// import { useLoading } from "@/context/LoadingContext";

// export default function SpinnerTestButton() {
//   const { withLoader } = useLoading();

//   function fakeDelay(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

//   return (
//     <button
//       onClick={() => withLoader(fakeDelay(3000))}
//       className="fixed bottom-6 right-6 z-[300] rounded-full bg-[#1E5A96] px-6 py-3 text-sm font-semibold text-white shadow-lg"
//     >
//       Test Spinner (3s)
//     </button>
//   );
// }
