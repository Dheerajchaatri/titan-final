"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import {
  Sparkles,
  Gamepad2,
  Calendar,
  CheckCircle,
  Video,
  ChevronRight,
  BookOpen,
  Award,
  Clock,
  ThumbsUp,
  AlertTriangle
} from "lucide-react";

interface InterviewQuestion {
  id: string;
  category: "technical" | "hr" | "behavioral";
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
}

export default function InterviewPrepPage() {
  const [selectedCategory, setSelectedCategory] = useState<"technical" | "hr" | "behavioral">("technical");
  const [activeQuestion, setActiveQuestion] = useState<InterviewQuestion | null>({
    id: "q-1",
    category: "technical",
    question: "Explain the difference between useEffect cleanup and standard unmounting.",
    difficulty: "Medium",
    points: 80,
  });

  const [answerInput, setAnswerInput] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    feedback: string[];
    modelAnswer: string;
  } | null>(null);

  const [practiceHistory, setPracticeHistory] = useState([
    { id: "h-1", question: "How do React Hooks handle closures?", date: "Yesterday", score: 88 },
    { id: "h-2", question: "Tell me about a time you handled a conflict in your dev team.", date: "3 days ago", score: 92 },
  ]);

  const questions: InterviewQuestion[] = [
    {
      id: "q-1",
      category: "technical",
      question: "Explain the difference between useEffect cleanup and standard unmounting in React.",
      difficulty: "Medium",
      points: 80,
    },
    {
      id: "q-2",
      category: "technical",
      question: "What is TypeScript union type narrowing and how do you implement it?",
      difficulty: "Medium",
      points: 85,
    },
    {
      id: "q-3",
      category: "technical",
      question: "Describe Next.js server components and how they differ from client components.",
      difficulty: "Hard",
      points: 95,
    },
    {
      id: "q-4",
      category: "hr",
      question: "Tell me about yourself and your professional journey.",
      difficulty: "Easy",
      points: 60,
    },
    {
      id: "q-5",
      category: "hr",
      question: "Where do you see yourself in five years?",
      difficulty: "Easy",
      points: 65,
    },
    {
      id: "q-6",
      category: "behavioral",
      question: "Describe a complex technical bug you solved and how you debugged it.",
      difficulty: "Hard",
      points: 90,
    },
  ];

  const filteredQuestions = questions.filter(q => q.category === selectedCategory);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim()) {
      toast.error("Please type your response first.");
      return;
    }

    setIsEvaluating(true);
    setTimeout(() => {
      // Mock evaluation response
      setEvaluationResult({
        score: 88,
        feedback: [
          "Good mention of garbage collection references.",
          "Clear explanation of why closures retain previous states.",
          "Consider elaborating on React fiber component reconciliations."
        ],
        modelAnswer: "In React, useEffect returns a cleanup function that runs before the effect runs again and during component unmount. This ensures subscription memory links and timers are cleaned up, preventing memory leaks."
      });

      // Add to practice history
      if (activeQuestion) {
        setPracticeHistory(prev => [
          {
            id: `h-${Date.now()}`,
            question: activeQuestion.question,
            date: "Just now",
            score: 88
          },
          ...prev
        ]);
      }

      setIsEvaluating(false);
      toast.success("AI Mock Interview Evaluation completed!");
    }, 1500);
  };

  const handleQuestionSelect = (q: InterviewQuestion) => {
    setActiveQuestion(q);
    setAnswerInput("");
    setEvaluationResult(null);
  };

  const interviewTips = [
    { title: "Quantify Impact", desc: "Use metrics when describing project contributions (e.g. 'boosted speeds by 20%')." },
    { title: "STAR Method", desc: "Structure behavioral responses using Situation, Task, Action, and Result formats." },
    { title: "Explain Thinking", desc: "Always voice your logical thought processes during live coding mock boards." }
  ];

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-start">
          <Gamepad2 className="h-3.5 w-3.5 text-gold" />
          <span>Interactive Simulator</span>
        </span>
        <h1 className="text-2xl font-black text-primary-navy mt-2">AI Interview Preparation</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Select questions, draft answers in the console, and get assessed by the mock evaluator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Categories and Console */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Practice Console card */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">AI Mock Simulator</h3>
              
              {/* Category tabs */}
              <div className="flex gap-1.5">
                {(["technical", "hr", "behavioral"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-2.5 py-1 text-[9px] uppercase tracking-wider font-extrabold rounded border transition-all cursor-pointer",
                      selectedCategory === cat
                        ? "bg-primary-navy border-primary-navy text-white"
                        : "bg-slate-50 border-slate-200 text-text-secondary hover:bg-slate-100"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions selectors list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[140px] overflow-y-auto pr-1">
              {filteredQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionSelect(q)}
                  className={cn(
                    "p-3 rounded-xl border text-left flex flex-col gap-2 hover:bg-slate-50/50 transition-colors focus:outline-none cursor-pointer",
                    activeQuestion?.id === q.id
                      ? "border-primary-navy bg-ice-blue/40"
                      : "border-border-color bg-white"
                  )}
                >
                  <p className="text-[10px] font-bold text-primary-navy leading-snug line-clamp-2">{q.question}</p>
                  <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-wider">
                    <span className="text-text-muted">{q.difficulty}</span>
                    <span className="text-gold-dark">{q.points} Pts</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Live Typing Answer Form */}
            {activeQuestion && (
              <form onSubmit={handleEvaluate} className="flex flex-col gap-4 border-t border-slate-50 pt-4 mt-1">
                <div className="flex flex-col gap-1.5 bg-slate-50 border border-slate-100 p-3.5 rounded-xl">
                  <span className="text-[8px] font-extrabold text-gold uppercase tracking-widest leading-none">Selected Prompt</span>
                  <p className="text-xs font-bold text-primary-navy mt-1 leading-snug">{activeQuestion.question}</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-text-primary uppercase tracking-wider">Your Response</label>
                  <textarea
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    rows={5}
                    placeholder="Draft your model answer response here to trigger audit..."
                    className="w-full p-4 rounded-xl border bg-white border-border-color text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-navy-light/20 focus:border-primary-navy transition-all"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="py-3 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
                  isLoading={isEvaluating}
                >
                  <Sparkles className="h-4.5 w-4.5 text-gold animate-pulse-slow" />
                  <span>Evaluate Response</span>
                </Button>
              </form>
            )}

          </div>

          {/* AI evaluation findings card */}
          {evaluationResult && !isEvaluating && (
            <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-5 animate-float">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy flex items-center gap-1.5">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
                  <span>AI Assessment Result</span>
                </h3>
                <span className="px-3 py-1 rounded bg-emerald-50 border border-emerald-100 text-xs font-black text-emerald-600">
                  Mock Grade: {evaluationResult.score}/100
                </span>
              </div>

              {/* Feedbacks bullet list */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Analysis Findings</h4>
                <ul className="flex flex-col gap-2 text-xs font-semibold text-text-secondary">
                  {evaluationResult.feedback.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {f.includes("Consider") ? (
                        <AlertTriangle className="h-4 w-4.5 text-amber-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <ThumbsUp className="h-4 w-4.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample model answer */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Model Answer Reference</h4>
                <p className="text-xs text-text-secondary font-semibold bg-slate-50 p-4 border border-slate-100 rounded-xl leading-relaxed italic">
                  "{evaluationResult.modelAnswer}"
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Tips, History, Resources */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Recommended Resources */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2 flex items-center gap-1.5">
              <BookOpen className="h-4.5 w-4.5 text-gold" />
              <span>Recommended Materials</span>
            </h3>

            <div className="flex flex-col gap-3.5">
              <a href="#" className="p-3 border border-border-color hover:border-primary-navy rounded-xl bg-white flex justify-between items-center group">
                <div className="flex gap-3 items-center">
                  <span className="text-xl">📚</span>
                  <div>
                    <h5 className="text-[10px] font-extrabold text-primary-navy leading-tight group-hover:text-primary-navy-light transition-colors">React Hooks Design</h5>
                    <span className="text-[8px] text-text-muted uppercase tracking-widest mt-0.5 block">Official Documentation</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-text-muted" />
              </a>

              <a href="#" className="p-3 border border-border-color hover:border-primary-navy rounded-xl bg-white flex justify-between items-center group">
                <div className="flex gap-3 items-center">
                  <span className="text-xl">🎥</span>
                  <div>
                    <h5 className="text-[10px] font-extrabold text-primary-navy leading-tight group-hover:text-primary-navy-light transition-colors">System Design Guide</h5>
                    <span className="text-[8px] text-text-muted uppercase tracking-widest mt-0.5 block">Video Lecture series</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-text-muted" />
              </a>
            </div>
          </div>

          {/* Practice History */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2 flex items-center gap-1.5">
              <Clock className="h-4.5 w-4.5 text-gold" />
              <span>Practice Logs</span>
            </h3>

            <div className="flex flex-col gap-3">
              {practiceHistory.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs font-bold text-text-secondary">
                  <div className="min-w-0 pr-2">
                    <p className="text-[10px] text-primary-navy leading-tight truncate">{item.question}</p>
                    <span className="text-[8px] text-text-muted mt-1 inline-block font-semibold leading-none">{item.date}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-[9px] font-black text-emerald-600 border border-emerald-100 flex-shrink-0">
                    {item.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips card */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2">
              Simulator Guidelines
            </h3>
            <div className="flex flex-col gap-3 text-xs font-semibold text-text-secondary leading-relaxed">
              {interviewTips.map((tip, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <span className="h-4.5 w-4.5 rounded-lg bg-ice-blue border border-ice-blue-dark text-primary-navy font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h5 className="text-[10px] font-bold text-primary-navy leading-none">{tip.title}</h5>
                    <p className="text-[9px] text-text-muted mt-1 leading-snug">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
