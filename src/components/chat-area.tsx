"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { SendIcon } from "lucide-react";
import type { Message, SuggestedMessage } from "@/lib/types";
import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface ChatAreaProps {
  messages: Message[];
  addMessage: (content: string, role: "user" | "assistant") => void;
  suggestedMessages: SuggestedMessage[];
  isEmpty: boolean;
}

export default function ChatArea({
  messages,
  addMessage,
  suggestedMessages,
  isEmpty
}: ChatAreaProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      addMessage(input.trim(), "user");
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-scroll to bottom when messages change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea when input changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="flex flex-col h-full bg-zinc-900 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4">
        {isEmpty ? (
          <div className="flex flex-col h-full items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-zinc-800 mb-6 flex items-center justify-center">
              <img
                src="https://ext.same-assets.com/2711132269/3783633550.svg"
                alt="ChatGPT"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-3xl font-semibold mb-8 text-center">How can I help you today?</h2>
            <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
              {suggestedMessages.map((suggestion) => (
                <Button
                  key={`suggestion-${suggestion.text}`}
                  variant="outline"
                  className="h-24 flex flex-col items-start justify-start p-4 bg-zinc-800 hover:bg-zinc-700 border-0"
                  onClick={() => {
                    addMessage(suggestion.text, "user");
                  }}
                >
                  <span className="text-xl mb-2">{suggestion.icon}</span>
                  <span className="text-left text-sm">{suggestion.text}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`py-5 ${
                  message.role === "user" ? "user-message" : "assistant-message"
                }`}
              >
                <div className="message-content flex">
                  <div className="mr-4 pt-0.5">
                    <Avatar className="h-7 w-7 bg-zinc-800">
                      {message.role === "user" ? (
                        <div className="bg-zinc-700 h-full w-full flex items-center justify-center">
                          <span className="text-xs">You</span>
                        </div>
                      ) : (
                        <div className="bg-emerald-600 h-full w-full flex items-center justify-center">
                          <img
                            src="https://ext.same-assets.com/2711132269/3783633550.svg"
                            alt="ChatGPT"
                            width={16}
                            height={16}
                          />
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <div className="relative flex items-center">
            <Textarea
              ref={textareaRef}
              placeholder="Send a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-12 pr-14 bg-zinc-800 border-zinc-700 resize-none rounded-xl"
              rows={1}
            />
            <Button
              className="absolute right-1.5 bottom-1.5 h-8 w-8 p-0"
              onClick={handleSend}
              disabled={input.trim() === ""}
              aria-label="Send message"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-center text-zinc-500 mt-2">
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}
