"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon, MessageSquare, Settings, ExternalLink } from "lucide-react";
import type { Chat } from "@/lib/types";

interface SidebarProps {
  chats: Chat[];
  activeChat: string;
  setActiveChat: (chatId: string) => void;
  createNewChat: () => void;
}

export default function Sidebar({
  chats,
  activeChat,
  setActiveChat,
  createNewChat
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-zinc-800 w-64">
      <div className="p-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 bg-transparent border-zinc-700 hover:bg-zinc-800"
          onClick={createNewChat}
        >
          <PlusIcon className="h-4 w-4" />
          New chat
        </Button>
      </div>

      {chats.length > 0 && (
        <div className="flex-1 overflow-y-auto px-3 py-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`sidebar-item flex items-center gap-2 ${
                activeChat === chat.id ? "active" : ""
              }`}
              onClick={() => setActiveChat(chat.id)}
            >
              <MessageSquare className="h-4 w-4 text-zinc-400" />
              <span className="text-sm truncate">{chat.title}</span>
            </div>
          ))}
        </div>
      )}

      <div className="p-3 mt-auto">
        <Separator className="my-2 bg-zinc-800" />
        <div className="sidebar-item flex items-center gap-2">
          <Settings className="h-4 w-4 text-zinc-400" />
          <span className="text-sm">Settings</span>
        </div>
        <div className="sidebar-item flex items-center gap-2">
          <ExternalLink className="h-4 w-4 text-zinc-400" />
          <span className="text-sm">Updates & FAQ</span>
        </div>
      </div>
    </div>
  );
}
