import { useEffect, useRef, useState } from 'react';
import { aiExampleConversation, aiQuickPrompts, aiAssistantCapabilities, languages } from '../data/mockData';
import { Button, Loader, Toast } from '../components/ui';

const MOCK_REPLIES = [
  "That's a great question. Based on current district weather data and crop conditions, I'd recommend checking soil moisture before taking action — I'll have a fully data-backed answer here once the AI backend is connected.",
  'Thanks for sharing that detail. Once connected to live weather and crop datasets, I can give a precise, district-specific recommendation for this.',
  "I'm currently running on mock responses for this demo. In the full version, I'll combine weather data, district records, and agricultural best practices to answer this accurately.",
];

let messageIdCounter = 1000;
const nextId = () => `msg-${messageIdCounter++}`;

export default function AIAssistant() {
  const [messages, setMessages] = useState(aiExampleConversation);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null);
  const [toast, setToast] = useState(null);
  const [language, setLanguage] = useState('en');
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const showToast = (message, type = 'info') => setToast({ message, type });

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed && !attachedImage) return;

    const userMessage = {
      id: nextId(),
      role: 'user',
      text: trimmed || 'Sent an image for analysis',
      image: attachedImage,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setDraft('');
    setAttachedImage(null);
    setIsTyping(true);

    // Mock assistant response — no API integration yet.
    setTimeout(() => {
      const reply = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(draft);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachedImage({ name: file.name, url: URL.createObjectURL(file) });
    showToast('Image attached — analysis will be available once the AI backend is connected.', 'info');
  };

  const handleVoiceClick = () => {
    setIsRecording((prev) => !prev);
    if (!isRecording) {
      showToast('Voice assistant is coming soon! This is a placeholder control.', 'info');
      setTimeout(() => setIsRecording(false), 2000);
    }
  };

  return (
    <main className="bg-surface min-h-screen">
      {/* Page Header */}
      <div className="bg-white dark:bg-card border-b border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary flex items-center gap-2">
                <span>🤖</span> AI Farm Assistant
              </h1>
              <p className="text-text-muted text-sm mt-1">
                Ask farming questions in Hindi or English — answers grounded in weather &amp; crop data.
              </p>
            </div>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    language === lang.code
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface dark:bg-surface-dark text-text-secondary border-gray-200 dark:border-white/10'
                  }`}
                >
                  {lang.nativeLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar — Capabilities & Quick Prompts */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10 p-5">
              <h2 className="text-sm font-bold text-text-primary mb-4">Assistant Capabilities</h2>
              <ul className="space-y-3">
                {aiAssistantCapabilities.map((cap) => (
                  <li key={cap.label} className="flex items-start gap-3">
                    <span className="text-lg">{cap.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{cap.label}</p>
                      <p className="text-xs text-text-muted">{cap.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10 p-5">
              <h2 className="text-sm font-bold text-text-primary mb-4">Try Asking</h2>
              <div className="space-y-2">
                {aiQuickPrompts.map((prompt) => (
                  <button
                    key={prompt.text}
                    onClick={() => sendMessage(prompt.text)}
                    className="w-full text-left flex items-start gap-2.5 p-3 rounded-xl bg-surface dark:bg-surface-dark hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-200"
                  >
                    <span>{prompt.icon}</span>
                    <span className="text-xs text-text-secondary leading-relaxed">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Chat Panel */}
          <section className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col h-[70vh] lg:h-[75vh] overflow-hidden" id="ai-chat-panel">
            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 pl-1">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm shrink-0">🤖</div>
                  <div className="bg-surface dark:bg-surface-dark rounded-2xl px-4 py-3">
                    <Loader size="sm" />
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Quick Prompts */}
            <div className="lg:hidden flex gap-2 overflow-x-auto px-4 py-3 border-t border-gray-100 dark:border-white/10 [scrollbar-width:none]">
              {aiQuickPrompts.map((prompt) => (
                <button
                  key={prompt.text}
                  onClick={() => sendMessage(prompt.text)}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface dark:bg-surface-dark text-xs text-text-secondary border border-gray-100 dark:border-white/10 whitespace-nowrap"
                >
                  <span>{prompt.icon}</span>
                  {prompt.text.length > 32 ? `${prompt.text.slice(0, 32)}...` : prompt.text}
                </button>
              ))}
            </div>

            {/* Attached Image Preview */}
            {attachedImage && (
              <div className="flex items-center gap-3 px-4 sm:px-6 py-2.5 border-t border-gray-100 dark:border-white/10 bg-surface dark:bg-surface-dark">
                <img src={attachedImage.url} alt="Attached crop" className="w-10 h-10 rounded-lg object-cover" />
                <span className="text-xs text-text-secondary flex-1 truncate">{attachedImage.name}</span>
                <button
                  onClick={() => setAttachedImage(null)}
                  className="text-text-muted hover:text-danger transition-colors"
                  aria-label="Remove attached image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 sm:px-6 py-4 border-t border-gray-100 dark:border-white/10" id="ai-chat-input-bar">
              {/* Image Upload Placeholder */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="ai-image-upload-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload crop image"
                className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-surface dark:bg-surface-dark text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 7.5 7.5 12M12 7.5V16.5"
                  />
                </svg>
              </button>

              {/* Voice Button Placeholder */}
              <button
                type="button"
                onClick={handleVoiceClick}
                aria-label="Voice input"
                className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-xl transition-all duration-200 ${
                  isRecording
                    ? 'bg-danger/10 text-danger animate-pulse-slow'
                    : 'bg-surface dark:bg-surface-dark text-text-secondary hover:text-primary hover:bg-primary/10'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                  />
                </svg>
              </button>

              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about crops, weather, pests, or fertilizers..."
                className="flex-1 min-w-0 px-4 py-2.5 bg-surface dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-xl text-sm text-text-primary placeholder-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
                id="ai-chat-text-input"
              />

              <Button type="submit" text="Send" size="md" disabled={!draft.trim() && !attachedImage} className="shrink-0" />
            </form>
          </section>
        </div>
      </div>

      <Toast
        message={toast?.message}
        type={toast?.type}
        isVisible={!!toast}
        onClose={() => setToast(null)}
      />
    </main>
  );
}

/* ── Sub-components ─────────────────────────────────────────────── */

function ChatBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
          isUser ? 'bg-accent/10' : 'bg-primary/10'
        }`}
      >
        {isUser ? '🧑‍🌾' : '🤖'}
      </div>
      <div className={`max-w-[80%] sm:max-w-[70%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-gradient-to-r from-primary to-primary-dark text-white rounded-tr-sm'
              : 'bg-surface dark:bg-surface-dark text-text-primary rounded-tl-sm'
          }`}
        >
          {message.image && (
            <img src={message.image.url} alt="Uploaded crop" className="rounded-lg mb-2 max-h-40 object-cover" />
          )}
          {message.text}
        </div>
        <span className="text-[11px] text-text-muted mt-1 px-1">{message.timestamp}</span>
      </div>
    </div>
  );
}
