import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/data/courseData";

interface QuizSectionProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export function QuizSection({ questions, onComplete }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    if (!showResult) {
      setShowResult(true);
      if (isCorrect) {
        setScore(score + 1);
      }
    } else {
      if (isLastQuestion) {
        setQuizCompleted(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
          percentage >= 70 ? 'bg-success/20' : 'bg-warning/20'
        }`}>
          {percentage >= 70 ? (
            <CheckCircle className="w-12 h-12 text-success" />
          ) : (
            <XCircle className="w-12 h-12 text-warning" />
          )}
        </div>
        
        <h3 className="text-2xl font-serif font-bold mb-2">
          {percentage >= 70 ? 'Excellent travail !' : 'Continuez vos efforts !'}
        </h3>
        
        <p className="text-muted-foreground mb-6">
          Vous avez obtenu {score} sur {questions.length} ({percentage}%)
        </p>
        
        <Button onClick={onComplete} className="gap-2">
          Continuer <ChevronRight className="w-4 h-4" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Question header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} / {questions.length}
        </span>
        <span className="text-sm font-medium text-primary">
          Score: {score}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-semibold mb-8">
        {currentQuestion.question}
      </h3>

      {/* Options */}
      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctIndex;
            
            let optionClass = "quiz-option";
            if (showResult) {
              if (isCorrectOption) {
                optionClass += " correct";
              } else if (isSelected && !isCorrectOption) {
                optionClass += " incorrect";
              }
            } else if (isSelected) {
              optionClass += " selected";
            }

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelectAnswer(index)}
                className={`${optionClass} w-full flex items-center gap-4`}
                disabled={showResult}
              >
                <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 text-left">{option}</span>
                {showResult && isCorrectOption && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
                {showResult && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-lg mb-6 ${
              isCorrect ? 'bg-success/10 border border-success/30' : 'bg-destructive/10 border border-destructive/30'
            }`}
          >
            <p className="font-medium mb-2">
              {isCorrect ? '✓ Bonne réponse !' : '✗ Réponse incorrecte'}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentQuestion.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <Button
        onClick={handleSubmit}
        disabled={selectedAnswer === null}
        className="w-full"
        size="lg"
      >
        {!showResult ? 'Valider' : isLastQuestion ? 'Voir le résultat' : 'Question suivante'}
      </Button>
    </motion.div>
  );
}
