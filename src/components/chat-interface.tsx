"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import ChatArea from "./chat-area";
import type { Message, Chat } from "@/lib/types";

export default function ChatInterface() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Recipe with what's in my kitchen",
      messages: [],
      createdAt: new Date(),
    },
  ]);

  const [activeChat, setActiveChat] = useState<string>("1");

  // Initial suggested messages
  const suggestedMessages = [
    { icon: "💡", text: "Recipe with what's in my kitchen" },
    { icon: "🎓", text: "Quiz me on ancient civilizations" },
    { icon: "✏️", text: "Superhero shark story" },
    { icon: "👕", text: "Pick outfit to look good on camera" },
  ];

  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (content: string, role: "user" | "assistant") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // If it's a user message, simulate an AI response
    if (role === "user") {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse(content),
          role: "assistant",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat.id);
    setMessages([]);
  };

  // Mock AI response generation
  const getAIResponse = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes("recipe") || lowerPrompt.includes("kitchen")) {
      return "Based on common kitchen ingredients, here's a simple pasta recipe:\n\n**Quick Pantry Pasta**\n\n*Ingredients:*\n- 8 oz pasta (any shape you have)\n- 2 tbsp olive oil\n- 3 cloves garlic, minced\n- 1/4 tsp red pepper flakes (optional)\n- 1 can (14.5 oz) diced tomatoes\n- 1/2 tsp dried basil or 1 tbsp fresh\n- Salt and pepper to taste\n- Grated parmesan cheese (if available)\n\n*Instructions:*\n1. Cook pasta according to package directions until al dente.\n2. While pasta cooks, heat olive oil in a large skillet over medium heat.\n3. Add garlic and red pepper flakes, sauté for 30 seconds until fragrant.\n4. Add diced tomatoes with their juice, simmer for 5-7 minutes.\n5. Season with basil, salt, and pepper.\n6. Drain pasta and add to the sauce, tossing to coat.\n7. Serve with grated parmesan if available.\n\nThis recipe is flexible - you can add any vegetables, proteins, or herbs you have on hand!";
    }

    if (lowerPrompt.includes("quiz") || lowerPrompt.includes("ancient civilizations")) {
      return "Here's a quick quiz on ancient civilizations:\n\n1. Which ancient civilization built the Great Pyramid of Giza?\n   a) Romans\n   b) Greeks\n   c) Egyptians\n   d) Persians\n\n2. The Code of Hammurabi was created in which civilization?\n   a) Mesopotamia\n   b) Indus Valley\n   c) China\n   d) Maya\n\n3. Which ancient civilization developed the concept of zero?\n   a) Romans\n   b) Greeks\n   c) Maya\n   d) Egyptians\n\n4. The Parthenon was built to honor which deity?\n   a) Zeus\n   b) Athena\n   c) Apollo\n   d) Poseidon\n\n5. Which civilization created the first known system of writing called cuneiform?\n   a) Sumerians\n   b) Egyptians\n   c) Chinese\n   d) Indus Valley\n\nLet me know when you're ready for the answers!";
    }

    if (lowerPrompt.includes("superhero") || lowerPrompt.includes("shark")) {
      return "# The Adventures of Finn the Shark\n\nIn the depths of the Azure Ocean lived Finn, no ordinary shark. Unlike his predatory cousins, Finn possessed extraordinary abilities: he could breathe outside water, possessed incredible strength, and had skin tougher than titanium.\n\nThe ocean folk called him **Aqua-Jaw**, the protector of the seven seas.\n\nFinn discovered his powers when a toxic waste spillage threatened his home reef. While other marine life fled, something extraordinary happened to Finn – the chemicals interacted with his unique shark DNA, transforming him.\n\nHis first mission came when pirates began dropping dynamite to stun fish for illegal fishing. Finn, with his super-speed, collected each explosive and jumped high above the water, tossing them safely away where they detonated harmlessly in the air.\n\n\"Who... what was THAT?\" a pirate stammered, witnessing a shark leaping thirty feet into the air.\n\nThe legend of Aqua-Jaw was born.\n\nFinn became the guardian of the ocean ecosystem, fighting pollution, illegal fishing, and even partnering with marine biologists who were astonished to discover a shark that could communicate through simple gestures and understanding human speech.\n\nHis greatest challenge arrived when an underwater drilling operation threatened to destroy an entire coral ecosystem. With determination in his beady eyes, Finn dove to incredible depths, using his powerful jaws to bend and seal the ruptured pipeline.\n\nNews outlets worldwide reported on the miraculous shark that saved the ocean.\n\nFinn continues his patrols today, a silent guardian, a watchful protector. A hero with fins, proving that sometimes, the most unlikely creatures can become the greatest champions of justice.";
    }

    if (lowerPrompt.includes("outfit") || lowerPrompt.includes("camera")) {
      return "Here are some outfit suggestions to look good on camera:\n\n1. **Solid Colors**: Wear solid, medium-toned colors like navy blue, teal, burgundy, or forest green. These look fantastic on camera and complement most skin tones.\n\n2. **Avoid Patterns**: Small patterns can create a moiré effect (a distracting visual vibration). If you love patterns, choose larger, simpler ones.\n\n3. **Layer for Dimension**: A blazer or cardigan over a solid shirt adds visual interest without being distracting.\n\n4. **Neckline Considerations**:\n   - V-necks are universally flattering\n   - Crew necks work well for those with longer necks\n   - Avoid turtlenecks as they can make your face look fuller on camera\n\n5. **Accessories**: Simple, non-reflective jewelry works best. Avoid anything that might clink or make noise.\n\n6. **For Formal Appearances**:\n   - Men: A well-fitted button-up shirt in a solid color with a blazer\n   - Women: A blouse with a structured blazer or a simple dress with clean lines\n\n7. **For Casual Settings**:\n   - A solid polo or henley shirt\n   - A simple blouse or sweater in a flattering color\n\n8. **What to Avoid**:\n   - Pure white (too bright) or black (too dark/harsh)\n   - Shiny fabrics that reflect light\n   - Logos or text that might be distracting\n   - Noisy jewelry or accessories\n\nRemember, confidence is your best accessory! Wear something that makes you feel good, as your comfort will show through on camera.";
    }

    return "I'm an AI assistant designed to help answer questions and provide information on a wide range of topics. I can assist with writing, creative content, problem-solving, education, and more. Just let me know what you'd like help with!";
  };

  return (
    <div className="chat-container">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        createNewChat={createNewChat}
      />
      <ChatArea
        messages={messages}
        addMessage={addMessage}
        suggestedMessages={suggestedMessages}
        isEmpty={messages.length === 0}
      />
    </div>
  );
}
