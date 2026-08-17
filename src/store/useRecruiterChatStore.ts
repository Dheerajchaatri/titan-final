import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  isAi: boolean;
}

interface RecruiterChatState {
  messages: ChatMessage[];
  sendMessage: (text: string, recipientId: string, recipientName: string, companyName: string) => void;
}

const defaultRecruiterMessages: ChatMessage[] = [
  {
    id: "m-1",
    senderId: "emp-1",
    senderName: "Sarah Khan",
    text: "Hi Ahmad, we loved your profile! Are you available for a quick interview call this Friday at 10:00 AM?",
    timestamp: "10:32 AM",
    isRead: false,
    isAi: false,
  },
  {
    id: "m-2",
    senderId: "cand-1",
    senderName: "Ahmad Raza",
    text: "Hello Sarah! Thank you so much. Yes, Friday at 10:00 AM works perfectly for me.",
    timestamp: "11:15 AM",
    isRead: true,
    isAi: false,
    recipientId: "emp-1"
  } as any,
  {
    id: "m-3",
    senderId: "emp-1",
    senderName: "Sarah Khan",
    text: "Great! I have scheduled the interview. You will receive an invitation link shortly.",
    timestamp: "11:20 AM",
    isRead: false,
    isAi: false,
  },
  {
    id: "m-4",
    senderId: "ns-recruiter",
    senderName: "Imran Ahmed (NetSol)",
    text: "Dear Ahmad, thanks for showing interest in NetSol. Could you please share your updated portfolio link?",
    timestamp: "Yesterday",
    isRead: false,
    isAi: false,
  },
];

export const useRecruiterChatStore = create<RecruiterChatState>()(
  persist(
    (set, get) => ({
      messages: defaultRecruiterMessages,

      sendMessage: (text, recipientId, recipientName, companyName) => {
        const newMessage: ChatMessage = {
          id: `rec-msg-${Date.now()}`,
          senderId: "cand-1",
          senderName: "Ahmad Raza",
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: true,
          isAi: false,
        };
        (newMessage as any).recipientId = recipientId;

        set((state) => ({
          messages: [...state.messages, newMessage],
        }));

        // Mock recruiter reply simulation
        setTimeout(() => {
          const replyMessage: ChatMessage = {
            id: `rec-msg-${Date.now() + 1}`,
            senderId: recipientId,
            senderName: recipientName,
            text: `Thanks for writing back, Ahmad! I have received your message: "${text.substring(0, 20)}..." and will review it with the hiring team at ${companyName}. Speak soon!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: false,
            isAi: false,
          };

          set((state) => ({
            messages: [...state.messages, replyMessage],
          }));

          // Notify alerts center without blending histories
          try {
            const { useChatStore } = require("./useChatStore");
            useChatStore.getState().addNotification({
              title: `Reply from ${recipientName}`,
              description: `New message: "Thanks for writing back..."`,
              category: "message",
              link: "/candidate/messages",
            });
          } catch (e) {
            console.error(e);
          }
        }, 1500);
      },
    }),
    {
      name: "titan-recruiter-chat",
    }
  )
);
