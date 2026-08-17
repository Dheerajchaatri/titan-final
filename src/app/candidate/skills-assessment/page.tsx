"use client";

import React, { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import {
  Award,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  ArrowRight
} from "lucide-react";

interface AssessmentTest {
  id: string;
  name: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  questionsCount: number;
  completed: boolean;
  score?: number;
}

interface QuizQuestion {
  id: number;
  q: string;
  options: string[];
  correctIdx: number;
}

export default function SkillAssessmentPage() {
  const { user, updateCandidateProfile } = useUserStore();
  const profile = user?.candidateProfile;

  // Local state for tests list
  const [tests, setTests] = useState<AssessmentTest[]>([
    { id: "test-1", name: "React.js Advanced Concepts", category: "Libraries", difficulty: "Advanced", duration: "10 mins", questionsCount: 3, completed: false },
    { id: "test-2", name: "TypeScript Type Narrowing", category: "Languages", difficulty: "Intermediate", duration: "10 mins", questionsCount: 3, completed: false },
    { id: "test-3", name: "Tailwind CSS Utility Design", category: "Styling", difficulty: "Beginner", duration: "10 mins", questionsCount: 3, completed: false },
  ]);

  // Quiz Modal State
  const [activeTest, setActiveTest] = useState<AssessmentTest | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Mock quiz questions
  const reactQuestions: QuizQuestion[] = [
    { id: 1, q: "Which hook should be used to memoize a computed function execution reference?", options: ["useCallback", "useMemo", "useRef", "useEffect"], correctIdx: 1 },
    { id: 2, q: "What React 19 API compiles components automatically to eliminate manual memoization?", options: ["React Compiler", "useEvent", "React Server Actions", "Suspense Server"], correctIdx: 0 },
    { id: 3, q: "How do Server Actions deliver form submissions back to server components?", options: ["Via REST controllers", "Through standard HTTP POST actions", "Via WebSocket connections", "Using manual fetch triggers"], correctIdx: 1 }
  ];

  const handleStartTest = (test: AssessmentTest) => {
    setActiveTest(test);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setQuizFinished(false);
  };

  const handleAnswerSelect = (optIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optIdx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < reactQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate score
      let correct = 0;
      reactQuestions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIdx) {
          correct++;
        }
      });

      const scorePct = Math.round((correct / reactQuestions.length) * 100);
      setQuizScore(scorePct);
      setQuizFinished(true);

      // Update tests list completion
      setTests(prev => prev.map(t => t.id === activeTest?.id ? { ...t, completed: true, score: scorePct } : t));

      // Dynamic integration with candidate profile skills!
      if (activeTest && scorePct >= 66) {
        toast.success(`You passed the ${activeTest.name} assessment with ${scorePct}% score!`);
        
        // Update user profile skills in store!
        if (profile) {
          const updatedSkills = profile.skills.map(s => {
            if (activeTest.id === "test-1" && s.name.includes("React")) {
              return { ...s, rating: 98 }; // Boost rating
            }
            if (activeTest.id === "test-2" && s.name.includes("TypeScript")) {
              return { ...s, rating: 95 }; // Boost rating
            }
            return s;
          });
          
          updateCandidateProfile({
            skills: updatedSkills,
            aiEmployabilityScore: Math.min(profile.aiEmployabilityScore + 2, 98)
          });
        }
      } else {
        toast.error(`Assessment completed. Score: ${scorePct}%. Try again to pass.`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-start">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          <span>Skills Verifier</span>
        </span>
        <h1 className="text-2xl font-black text-primary-navy mt-2">Skill Assessments</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Take standard multiple-choice tests to audit your technical levels and earn verified badges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Available Tests Grid */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2">
              Available Tests
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className="p-5 border border-border-color rounded-xl bg-white flex flex-col gap-4 justify-between hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{test.category}</span>
                    <h4 className="text-xs font-bold text-primary-navy leading-snug">{test.name}</h4>
                    
                    <div className="flex items-center gap-3.5 text-[9px] font-bold text-text-muted uppercase tracking-wider mt-2">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {test.duration}</span>
                      <span>⏱️ {test.questionsCount} MCQs</span>
                      <span className="text-primary-navy font-extrabold">{test.difficulty}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-50 pt-3 flex items-center justify-between">
                    {test.completed ? (
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[9px] font-extrabold border uppercase tracking-wider flex items-center gap-0.5",
                        (test.score || 0) >= 66
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-rose-50 text-rose-600 border-rose-100"
                      )}>
                        {test.score}% {(test.score || 0) >= 66 ? "Passed" : "Failed"}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-text-muted">Not Started</span>
                    )}

                    <Button
                      variant={test.completed ? "outline" : "primary"}
                      size="sm"
                      className="text-[9px] font-black uppercase tracking-wider py-1.5 px-3"
                      onClick={() => handleStartTest(test)}
                    >
                      {test.completed ? "Re-take" : "Start Test"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Column: Performance Analytics */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Skill verified badges */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2 flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-gold" />
              <span>Verified Badges</span>
            </h3>

            <div className="flex flex-col gap-3">
              {profile?.skills.slice(0, 3).map((skill) => (
                <div key={skill.name} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-xs font-semibold text-text-secondary">
                  <div className="flex gap-2 items-center">
                    <ShieldCheck className="h-4.5 w-4.5 text-primary-navy" />
                    <span className="font-extrabold text-primary-navy">{skill.name}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-[9px] font-black text-emerald-600 border border-emerald-100">
                    Verified {skill.rating}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Test suggestions recommendations */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2 flex items-center gap-1.5">
              <BrainCircuit className="h-4.5 w-4.5 text-gold" />
              <span>Recommendations</span>
            </h3>

            <div className="flex flex-col gap-3 text-xs font-semibold text-text-secondary leading-relaxed">
              <div className="flex gap-2.5 items-start">
                <span className="h-4.5 w-4.5 rounded-full bg-slate-100 text-[10px] font-black text-primary-navy flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <h5 className="text-[10px] font-bold text-primary-navy leading-none">Complete React test</h5>
                  <p className="text-[9px] text-text-muted mt-1 leading-snug">Boosts profile match rating to 98% instantly.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <span className="h-4.5 w-4.5 rounded-full bg-slate-100 text-[10px] font-black text-primary-navy flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <h5 className="text-[10px] font-bold text-primary-navy leading-none">Add Tailwind badge</h5>
                  <p className="text-[9px] text-text-muted mt-1 leading-snug">Makes your profile highly visible to design teams.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Quiz MCQ Dialog Sandbox */}
      <Dialog
        isOpen={!!activeTest && !quizFinished}
        onClose={() => setActiveTest(null)}
        title={activeTest?.name}
        size="md"
      >
        {activeTest && (
          <div className="flex flex-col gap-5">
            
            {/* Progress bar */}
            <div className="flex justify-between items-center text-[10px] font-bold text-text-muted uppercase tracking-wider">
              <span>Question {currentQuestionIdx + 1} of {reactQuestions.length}</span>
              <span className="text-primary-navy">Time Limit: 10 mins</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-navy transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / reactQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-xs font-bold text-primary-navy leading-relaxed">
                {reactQuestions[currentQuestionIdx].q}
              </p>
            </div>

            {/* Options list */}
            <div className="flex flex-col gap-2.5">
              {reactQuestions[currentQuestionIdx].options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQuestionIdx] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={cn(
                      "w-full p-4 rounded-xl border text-left text-xs font-semibold hover:bg-slate-50 transition-all focus:outline-none cursor-pointer flex justify-between items-center",
                      isSelected ? "border-primary-navy bg-ice-blue/40 text-primary-navy font-bold" : "border-border-color bg-white text-text-secondary"
                    )}
                  >
                    <span>{opt}</span>
                    <span className={cn(
                      "h-4 w-4 rounded-full border flex items-center justify-center text-[9px] font-bold",
                      isSelected ? "border-primary-navy bg-primary-navy text-white" : "border-slate-300 bg-white"
                    )}>
                      {isSelected ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Next footer actions */}
            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="font-bold uppercase tracking-wider text-xs"
                onClick={() => setActiveTest(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="font-bold uppercase tracking-wider text-xs flex items-center gap-1.5"
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIdx] === undefined}
              >
                <span>{currentQuestionIdx === reactQuestions.length - 1 ? "Submit Test" : "Next"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>

          </div>
        )}
      </Dialog>

      {/* Quiz Results Dialog */}
      <Dialog
        isOpen={quizFinished}
        onClose={() => {
          setQuizFinished(false);
          setActiveTest(null);
        }}
        title="Assessment Complete"
        size="md"
      >
        <div className="flex flex-col items-center text-center gap-5 py-4">
          <div className={cn(
            "h-16 w-16 rounded-full flex items-center justify-center text-2xl animate-bounce shadow-md",
            quizScore >= 66 ? "bg-emerald-50 text-emerald-500 border border-emerald-100" : "bg-rose-50 text-rose-500 border border-rose-100"
          )}>
            {quizScore >= 66 ? "🏆" : "❌"}
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-black text-primary-navy">
              {quizScore >= 66 ? "Congratulations! You Passed!" : "Assessment Failed"}
            </h3>
            <p className="text-xs text-text-muted max-w-xs leading-relaxed">
              {quizScore >= 66
                ? "Your profile has been updated and a verified badge is now displayed to hiring teams!"
                : "You need at least 66% score to pass this test. Review recommended materials and try again."}
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl w-full flex justify-around mt-2">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider leading-none">Your Score</span>
              <span className="text-lg font-black text-primary-navy mt-1.5">{quizScore}%</span>
            </div>
            <div className="w-px bg-slate-200" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider leading-none">Status</span>
              <span className={cn("text-xs font-black mt-2 leading-none uppercase tracking-wider", quizScore >= 66 ? "text-emerald-600" : "text-rose-500")}>
                {quizScore >= 66 ? "Verified" : "Fail"}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full py-3 font-bold uppercase tracking-wider text-xs"
            onClick={() => {
              setQuizFinished(false);
              setActiveTest(null);
            }}
          >
            Return to Assessment Dashboard
          </Button>
        </div>
      </Dialog>

    </div>
  );
}
