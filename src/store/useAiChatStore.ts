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

interface AiChatState {
  messages: ChatMessage[];
  messagesBySession: Record<string, ChatMessage[]>;
  isAiTyping: boolean;
  initSession: (userId: string, role: string, userName: string) => void;
  sendMessage: (text: string, userId: string, role: string, userName: string) => void;
  triggerAiResponse: (userMessage: string, userId: string, role: string, userName: string) => Promise<void>;
  clearHistory: (userId: string, role: string) => void;
}

const getDefaultMessages = (role: string, userName: string): ChatMessage[] => {
  return [];
};

export const useAiChatStore = create<AiChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      messagesBySession: {},
      isAiTyping: false,

      initSession: (userId, role, userName) => {
        if (!userId) {
          set({ messages: [] });
          return;
        }
        const sessionKey = `${userId}-${role}`;
        const history = get().messagesBySession[sessionKey];
        if (history && history.length > 0) {
          // Clean legacy demo messages if any exist
          const cleanHistory = history.filter(
            (m) =>
              m.id !== "ai-m-1" &&
              !m.text.includes("How can I help you navigate your career path today") &&
              !m.text.includes("recommend jobs") &&
              !m.text.includes("Systems Limited")
          );
          set({ messages: cleanHistory });
        } else {
          set((state) => ({
            messages: [],
            messagesBySession: {
              ...state.messagesBySession,
              [sessionKey]: [],
            },
          }));
        }
      },

      sendMessage: (text, userId, role, userName) => {
        if (!userId) return;
        const sessionKey = `${userId}-${role}`;
        const newMessage: ChatMessage = {
          id: `ai-msg-${Date.now()}`,
          senderId: userId,
          senderName: userName,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: true,
          isAi: false,
        };

        set((state) => {
          const currentHistory = state.messagesBySession[sessionKey] || [];
          const updatedHistory = [...currentHistory, newMessage];
          return {
            messages: updatedHistory,
            messagesBySession: {
              ...state.messagesBySession,
              [sessionKey]: updatedHistory,
            },
          };
        });

        get().triggerAiResponse(text, userId, role, userName);
      },

      triggerAiResponse: async (userMessage, userId, role, userName) => {
        if (!userId) return;
        const sessionKey = `${userId}-${role}`;
        set({ isAiTyping: true });
        await new Promise((resolve) => setTimeout(resolve, 1500));

        let response = "";
        const lower = userMessage.toLowerCase();
        const cleanName = userName.replace(/\s*\(Recruiter\)\s*/i, "");

        if (role === "employer") {
          if (lower.includes("candidate") || lower.includes("find") || lower.includes("source")) {
            response = "I can help you filter candidate resumes. Would you like to run a query comparing skills matching 'React' or set up a screen threshold?";
          } else if (lower.includes("job description") || lower.includes("jd") || lower.includes("write")) {
            response = "I can draft a structured Job Description. What role is this for? E.g., Senior Fullstack Engineer, UI Designer.";
          } else if (lower.includes("match") || lower.includes("suitability")) {
            response = "Our semantic algorithms map resume skill vectors with requirements to generate a normalized AI Suitability Score (0-100%).";
          } else if (lower.includes("interview") || lower.includes("questions")) {
            response = "I can generate customized screening questions for this technical role. What level of experience are you targetting?";
          } else {
            response = `Hello ${cleanName}! I am your TITAN AI Hiring Assistant. I can help write job descriptions, source talent, plan interviews, or screen candidate portfolios. What can I do for you today?`;
          }
        } else {
          if (lower.includes("resume") || lower.includes("cv")) {
            response = "To optimize your resume for ATS systems, ensure you include keywords like 'React.js', 'Next.js', and 'TypeScript' prominently. I can run an audit if you upload your document or paste the text.";
          } else if (lower.includes("salary") || lower.includes("pkr")) {
            response = "Based on current market trends, Frontend Developers with 3+ years of experience in Lahore earn between PKR 150k and PKR 250k. Your preferred salary of PKR 150k - 200k matches this bracket perfectly.";
          } else if (lower.includes("interview") || lower.includes("prepare")) {
            response = "I can help you practice! Would you like to practice mock questions for: 1. React hooks, 2. CSS/Tailwind responsiveness, or 3. System design?";
          } else if (lower.includes("job") || lower.includes("recommend")) {
            response = "I recommend checking out the 'Senior Frontend Developer' role at Systems Limited (95% Match) and the 'UI/UX Designer' role at 10Pearls (91% Match). Both match your skills perfectly!";
          } else {
            response = `Hello ${cleanName}! I am the TITAN AI Career Assistant. I can analyze your resume, help you prepare for upcoming interviews, provide salary insights, or write a custom cover letter. What can I do for you today?`;
          }
        }

        const replyMessage: ChatMessage = {
          id: `ai-msg-${Date.now() + 1}`,
          senderId: "ai-assistant",
          senderName: role === "employer" ? "TITAN AI Hiring Assistant" : "TITAN AI Assistant",
          text: response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: true,
          isAi: true,
        };

        set((state) => {
          const currentHistory = state.messagesBySession[sessionKey] || [];
          const updatedHistory = [...currentHistory, replyMessage];
          return {
            messages: updatedHistory,
            messagesBySession: {
              ...state.messagesBySession,
              [sessionKey]: updatedHistory,
            },
            isAiTyping: false,
          };
        });
      },

      clearHistory: (userId, role) => {
        if (!userId) return;
        const sessionKey = `${userId}-${role}`;
        set((state) => {
          const updatedSessions = { ...state.messagesBySession };
          delete updatedSessions[sessionKey];
          return {
            messages: [],
            messagesBySession: updatedSessions,
          };
        });
      }
    }),
    {
      name: "titan-ai-chat-clean-v1",
    }
  )
);
