'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, X, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: '¡Hola! Soy el asistente de Pneuma Studio. ¿Eres cliente nuestro o te interesa conocer nuestros servicios?',
};

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  if (pathname?.startsWith('/admin')) return null;

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message ?? 'Error al obtener respuesta.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Hubo un error de conexión. Escríbenos al +52 1 81 1633 3559.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="chat-widget-panel">
          <div className="chat-widget-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={18} color="var(--primary)" />
              <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.875rem' }}>
                Pneuma Studio
              </span>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'inline-block',
                  marginLeft: 2,
                }}
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A9BB5', lineHeight: 1 }}
              aria-label="Cerrar chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="chat-widget-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble-assistant" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Loader2 size={14} color="var(--primary)" className="animate-spin" />
                <span style={{ color: '#8A9BB5', fontSize: '0.8rem' }}>Escribiendo…</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-widget-input-row">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe aquí…"
              disabled={isLoading}
              className="chat-widget-input"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="chat-widget-send"
              aria-label="Enviar mensaje"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="chat-widget-btn"
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente'}
      >
        {isOpen ? <X size={22} /> : <Bot size={22} />}
      </button>
    </>
  );
}
