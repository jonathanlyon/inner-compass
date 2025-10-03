'use client';

import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, ArrowLeft, Home } from 'lucide-react';

const InnerCompassApp = () => {
  const [stage, setStage] = useState('welcome'); // welcome, questions, generating, results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [reflection, setReflection] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample questions - in production, these would be AI-generated and adaptive
  const questions = [
    {
      text: "When do you feel most at peace?",
      prompt: "Describe a moment, place, or activity where you feel completely at ease."
    },
    {
      text: "What does your inner voice tell you when you're alone?",
      prompt: "The thoughts that arise in quiet moments—are they kind, critical, curious?"
    },
    {
      text: "If your younger self could see you now, what would surprise them?",
      prompt: "Consider both the ways you've grown and the ways you've stayed the same."
    },
    {
      text: "What truth are you carrying that you haven't spoken aloud?",
      prompt: "Something you know about yourself but rarely acknowledge."
    },
    {
      text: "What would you do if you trusted yourself completely?",
      prompt: "Imagine a version of you without self-doubt—what changes?"
    }
  ];

  const handleStartJourney = () => {
    setStage('questions');
    setResponses([]);
    setCurrentQuestionIndex(0);
    setCurrentAnswer('');
  };

  const handleNextQuestion = () => {
    if (currentAnswer.trim()) {
      const newResponses = [...responses, {
        question: questions[currentQuestionIndex].text,
        answer: currentAnswer
      }];
      setResponses(newResponses);
      setCurrentAnswer('');

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        generateReflection(newResponses);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentAnswer(responses[currentQuestionIndex - 1]?.answer || '');
      setResponses(responses.slice(0, -1));
    }
  };

  const generateReflection = async (allResponses) => {
    setStage('generating');
    setIsGenerating(true);

    // Simulated AI generation - replace with actual API call
    setTimeout(() => {
      const mockReflection = `Your Inner Landscape

There's a quiet strength in the way you seek peace—not as an escape, but as a return to yourself. ${allResponses[0]?.answer.toLowerCase().includes('nature') ? 'The natural world seems to be your anchor' : 'You find stillness in the everyday'}—a reminder that sanctuary isn't somewhere you go, it's something you carry.

Your inner voice speaks with both wisdom and wounds. ${allResponses[1]?.answer.length > 100 ? 'The depth of your self-reflection suggests someone who has learned to listen, even when the listening is hard' : 'You\'re learning to distinguish between thoughts that serve you and thoughts that simply repeat'}. This awareness itself is a form of compassion.

The younger version of you would see someone who has weathered storms they once feared. You've grown in ways that surprised even you—${allResponses[2]?.answer.toLowerCase().includes('strong') || allResponses[2]?.answer.toLowerCase().includes('resilient') ? 'strength forged through challenge' : 'subtle shifts that accumulated into transformation'}. Yet there's continuity too: that essential spark hasn't dimmed.

You're holding a truth close: ${allResponses[3]?.answer.substring(0, 50)}... This unspoken knowing weighs on you not because it's wrong, but because it demands something—perhaps courage, perhaps change, perhaps simply acknowledgment. The act of naming it here is the first step toward integration.

If you trusted yourself completely? The answer lives in the gap between who you are and who you're afraid to become. ${allResponses[4]?.answer.toLowerCase().includes('would') ? 'You already know what would shift' : 'The hesitation itself reveals the magnitude of what you sense is possible'}. Trust isn't the absence of fear—it's taking your own hand and stepping forward anyway.

You are both the seeker and the sanctuary. The journey and the destination. The question and, increasingly, the answer.`;

      setReflection(mockReflection);
      setIsGenerating(false);
      setStage('results');
    }, 3000);
  };

  const handleReset = () => {
    setStage('welcome');
    setCurrentQuestionIndex(0);
    setResponses([]);
    setCurrentAnswer('');
    setReflection('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        
        {/* Welcome Stage */}
        {stage === 'welcome' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <div className="relative">
              <Compass className="w-24 h-24 text-amber-700 animate-pulse" />
              <Sparkles className="w-8 h-8 text-orange-500 absolute -top-2 -right-2" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-serif text-amber-900">Inner Compass</h1>
              <p className="text-xl text-amber-700 max-w-md mx-auto leading-relaxed">
                A journey through questions that listen, reflections that see, and insights that resonate.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur p-8 rounded-2xl shadow-lg max-w-lg space-y-4">
              <p className="text-amber-800 leading-relaxed">
                You'll be guided through five deep questions. Take your time. Be honest. 
                There are no right answers—only your truth.
              </p>
              <p className="text-sm text-amber-600">
                Time needed: 10-15 minutes
              </p>
            </div>

            <button
              onClick={handleStartJourney}
              className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              Begin Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Questions Stage */}
        {stage === 'questions' && (
          <div className="flex flex-col min-h-[80vh] justify-center space-y-8 py-12">
            <div className="text-center space-y-2">
              <div className="flex justify-center gap-2 mb-8">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx < currentQuestionIndex
                        ? 'w-8 bg-amber-600'
                        : idx === currentQuestionIndex
                        ? 'w-12 bg-amber-700'
                        : 'w-8 bg-amber-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-amber-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur rounded-3xl shadow-xl p-10 space-y-6">
              <h2 className="text-3xl font-serif text-amber-900 leading-relaxed">
                {questions[currentQuestionIndex].text}
              </h2>
              <p className="text-amber-700 text-lg">
                {questions[currentQuestionIndex].prompt}
              </p>

              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Take your time... there's no rush."
                className="w-full h-48 p-6 bg-white/80 border-2 border-amber-200 rounded-2xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none resize-none text-amber-900 text-lg leading-relaxed"
                autoFocus
              />

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                    currentQuestionIndex === 0
                      ? 'text-amber-300 cursor-not-allowed'
                      : 'text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={!currentAnswer.trim() || currentAnswer.trim().length < 10}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all ${
                    currentAnswer.trim() && currentAnswer.trim().length >= 10
                      ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-lg transform hover:scale-105'
                      : 'bg-amber-200 text-amber-400 cursor-not-allowed'
                  }`}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Complete Journey' : 'Continue'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Generating Stage */}
        {stage === 'generating' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <div className="relative">
              <Compass className="w-24 h-24 text-amber-700 animate-spin" style={{ animationDuration: '3s' }} />
              <Sparkles className="w-8 h-8 text-orange-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-serif text-amber-900">Reflecting on your journey...</h2>
              <p className="text-amber-700 max-w-md mx-auto">
                Weaving your words into insight. This takes a moment.
              </p>
            </div>
          </div>
        )}

        {/* Results Stage */}
        {stage === 'results' && (
          <div className="py-12 space-y-8">
            <div className="text-center space-y-4">
              <Sparkles className="w-12 h-12 text-amber-700 mx-auto" />
              <h2 className="text-4xl font-serif text-amber-900">Your Reflection</h2>
              <p className="text-amber-600">A mirror of your inner landscape</p>
            </div>

            <div className="bg-white/70 backdrop-blur rounded-3xl shadow-xl p-12 space-y-6">
              <div className="prose prose-lg max-w-none">
                {reflection.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-amber-900 leading-relaxed mb-6 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-8">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-8 py-4 bg-white/80 hover:bg-white text-amber-700 rounded-full font-medium transition-all shadow-lg"
              >
                <Home className="w-5 h-5" />
                Return Home
              </button>
            </div>

            <div className="text-center text-sm text-amber-600 pt-8">
              <p>In a future version, you'll be able to save this reflection and see how your inner compass evolves over time.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InnerCompassApp;