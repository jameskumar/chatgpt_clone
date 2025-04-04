export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export interface SuggestedMessage {
  icon: string;
  text: string;
}
