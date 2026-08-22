// components/ChatbotWidget.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* FAQ data — edit this to match your real content                     */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    id: "what-is-accelia",
    keywords: [
      "what is accelia",
      "about accelia",
      "who are you",
      "company",
      "what do you do",
    ],
    question: "What is Accelia Clinical Solutions?",
    answer:
      "Accelia is a Site Management Organization (SMO) connecting Sponsors and CROs with high-performing, GCP-trained research sites across India — helping trials start faster and run more smoothly.",
  },
  {
    id: "smo-vs-cro",
    keywords: [
      "smo",
      "cro",
      "difference",
      "what does smo mean",
      "what's an smo",
    ],
    question: "What's the difference between an SMO and a CRO?",
    answer:
      "A CRO (Contract Research Organization) manages a trial's overall operations for a sponsor. An SMO (Site Management Organization) — like Accelia — manages and supports the actual research sites, helping them run trials efficiently and connect with sponsors/CROs looking for qualified sites.",
  },
  {
    id: "services",
    keywords: [
      "services",
      "what do you offer",
      "help with",
      "solutions",
      "what can you help",
    ],
    question: "What services does Accelia offer?",
    answer:
      "We help research sites with study start-up, site selection support for sponsors, GCP-compliant site partnerships, and reducing administrative burden so sites can focus on patient care and trial delivery.",
  },
  {
    id: "join-network",
    keywords: [
      "join",
      "partner",
      "become a site",
      "onboard",
      "network",
      "how do i join",
    ],
    question: "How can my site join Accelia's network?",
    answer:
      "Great! To join our network, we'll typically ask about your GCP training status, current patient volume, and prior trial experience. Head over to our Contact page and mention you'd like to join as a site partner — our team will follow up with next steps.",
  },
  {
    id: "regions",
    keywords: [
      "region",
      "location",
      "where",
      "india",
      "cities",
      "which cities",
    ],
    question: "What regions does Accelia operate in?",
    answer:
      "We currently focus on research sites across India, with plans to expand our network further. Reach out via Contact for details specific to your region.",
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "reach",
      "talk to someone",
      "email",
      "phone",
      "speak to a human",
    ],
    question: "How do I get in touch with your team?",
    answer:
      "You can reach us through our Contact page — just click below and someone from our team will follow up.",
  },
];

const GREETING_WORDS = [
  "hi",
  "hello",
  "hey",
  "yo",
  "hola",
  "good morning",
  "good afternoon",
  "good evening",
];
const THANKS_WORDS = ["thanks", "thank you", "thx", "ty", "appreciate"];

const GREETING_REPLY =
  "Hey there! 👋 I can help answer questions about Accelia — what we do, how to join our network, or how to get in touch. What would you like to know?";
const THANKS_REPLY =
  "You're welcome! Let me know if there's anything else I can help with.";
const FALLBACK_ANSWER =
  "I don't have an exact answer for that yet, but I can connect you with our team directly — they'll get back to you quickly.";

function normalize(text) {
  return text.toLowerCase().trim();
}

function findAnswer(input) {
  const text = normalize(input);

  if (
    GREETING_WORDS.some(
      (w) => text === w || text.startsWith(w + " ") || text.startsWith(w + "!"),
    )
  ) {
    return { answer: GREETING_REPLY };
  }
  if (THANKS_WORDS.some((w) => text.includes(w))) {
    return { answer: THANKS_REPLY };
  }

  const match = FAQS.find((faq) =>
    faq.keywords.some((kw) => text.includes(kw)),
  );
  return match ? { answer: match.answer } : null;
}

/* ------------------------------------------------------------------ */
/* Small sub-components                                                */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Avatar — swap AVATAR_SRC for your own logo/photo                    */
/* ------------------------------------------------------------------ */

const AVATAR_SRC = "/assets/chat.png"; // change to your own image path

function BotAvatar({ size = 32 }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#1E5A96] to-[#0B2E5C] shadow-sm"
      style={{ width: size, height: size }}
    >
      <img
        src={AVATAR_SRC}
        alt="Accelia"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 rounded-2xl bg-gray-100 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-gray-400"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Widget                                                               */
/* ------------------------------------------------------------------ */

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      from: "bot",
      text: "Hi! I'm here to help with quick questions about Accelia. Tap a question below, or type your own.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping, open]);

  function pushMessage(msg) {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, ...msg },
    ]);
  }

  function respondTo(userText) {
    pushMessage({ from: "user", text: userText });
    setIsTyping(true);

    const result = findAnswer(userText);

    setTimeout(
      () => {
        setIsTyping(false);
        if (result) {
          pushMessage({ from: "bot", text: result.answer });
        } else {
          pushMessage({
            from: "bot",
            text: FALLBACK_ANSWER,
            showContactCta: true,
          });
        }
      },
      550 + Math.random() * 350,
    ); // slight variance feels less robotic
  }

  function handleQuickReply(faq) {
    if (isTyping) return;
    respondTo(faq.question);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;
    respondTo(trimmed);
    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-[150] flex flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex h-[min(600px,calc(100vh-7rem))] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_60px_-15px_rgba(11,46,92,0.35)]"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 bg-gradient-to-r from-[#0B2E5C] to-[#1E5A96] px-5 py-4 text-white">
              <BotAvatar size={40} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  Accelia Assistant
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#F8FAFC] px-4 py-4"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={`flex items-end gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.from === "bot" && <BotAvatar size={28} />}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                        msg.from === "user"
                          ? "rounded-br-md bg-[#1E5A96] text-white"
                          : "rounded-bl-md border border-black/5 bg-white text-gray-700"
                      }`}
                    >
                      {msg.text}
                      {msg.showContactCta && (
                        <Link
                          href="/contact"
                          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#0B2E5C] px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
                        >
                          Contact our team
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              d="M5 12h14M13 6l6 6-6 6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2"
                  >
                    <BotAvatar size={28} />
                    <TypingDots />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Persistent suggestion chips — always available, not just on first load */}
            <div className="border-t border-black/5 bg-white px-3 pt-3">
              <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Suggested questions
              </p>
              <div className="flex gap-2 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {FAQS.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleQuickReply(faq)}
                    disabled={isTyping}
                    className="shrink-0 whitespace-nowrap rounded-full border border-[#1E5A96]/25 px-3.5 py-1.5 text-xs font-medium text-[#1E5A96] transition-colors hover:bg-[#1E5A96]/8 disabled:opacity-40"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-black/5 bg-white p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a question..."
                className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#1E5A96] focus:bg-white"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1E5A96] text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#1E5A96] to-[#0B2E5C] text-white shadow-[0_8px_30px_rgba(11,46,92,0.4)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
