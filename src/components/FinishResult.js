"use client";
import { ProviderContext } from "@/app/layout";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { saveUserScore } from "@/libs/firebase/firebase.db";

export default function FinishResult() {
  const router = useRouter();

  const [state, dispatch] = useContext(ProviderContext);

  const wrongAnswers = state.questions.countError;
  const totalQuestions = state?.questions?.lesson.length || 0;
  const userName = state.user.name;
  const userId = state.user.userId;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const correctAnswersByCategory =
    state &&
    state.questions &&
    typeof state.questions.countCorrect === "object" &&
    state.questions.countCorrect !== null
      ? state.questions.countCorrect
      : {};

  const correctAnswers = Object.values(correctAnswersByCategory).reduce(
    (a, b) => a + b,
    0,
  );

  const percentCorrect =
    totalQuestions > 0
      ? ((correctAnswers / totalQuestions) * 100).toFixed(0)
      : 0;

  useEffect(() => {
    const saveScores = async () => {
      console.log("Salvando scores:", {
        correctAnswers,
        correctAnswersByCategory,
        userId,
        userName,
      });
      const hasScores =
        correctAnswersByCategory &&
        Object.keys(correctAnswersByCategory).length > 0;

      if (hasScores && userId && userName) {
        try {
          // Salvar pontuação para cada categoria com score
          for (const [tema, score] of Object.entries(correctAnswersByCategory)) {
            if (!tema) {
              console.warn("Tema vazio ignorado ao salvar score");
              continue;
            }
            console.log("Salvando para tema:", tema, "score:", score);
            await saveUserScore(userId, userName, tema, score);
          }
        } catch (error) {
          console.error("Erro ao salvar pontuação:", error);
        }
      }
    };

    saveScores();
  }, [correctAnswersByCategory, userId, userName, correctAnswers]);

  const handleRestart = () => {
    dispatch({
      type: "ADD_LESSON",
      payload: [],
    });

    dispatch({
      type: "ADD_QUESTION_SELECT",
      payload: [],
    });

    dispatch({
      type: "ADD_COUNT_RESERT",
    });
    router.push("/");
  };

  return (
    <div className="flex flex-col h-screen bg-background text-text font-sans transition-colors duration-300">
      <section className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white border-2 border-secondary/50 rounded-3xl shadow-xl flex flex-col max-h-[85vh] overflow-hidden">
          {/* Header */}
          <div className="bg-secondary/50 p-5 text-center">
            <h2 className="text-2xl font-bold">Resultado Final 🎉</h2>
            <p className="text-sm text-text/70">Veja seu desempenho no quiz</p>
          </div>

          {/* Conteúdo */}
          <div className="p-6 flex flex-col justify-center items-center gap-6 flex-1">
            {/* Resumo */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Acertos */}
              <div
                className="
            p-6 rounded-2xl border-2 border-green-200 
            bg-green-50 flex flex-col items-center
          "
              >
                <span className="text-4xl font-bold text-green-600">
                  {correctAnswers}
                </span>
                <span className="text-sm text-green-700 font-medium">
                  Acertos ✅
                </span>
              </div>

              {/* Erros */}
              <div
                className="
            p-6 rounded-2xl border-2 border-red-200 
            bg-red-50 flex flex-col items-center
          "
              >
                <span className="text-4xl font-bold text-red-600">
                  {wrongAnswers}
                </span>
                <span className="text-sm text-red-700 font-medium">
                  Erros ❌
                </span>
              </div>
            </div>

            {/* Barra de desempenho */}
            <div className="w-full">
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-accent h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${percentCorrect}%`,
                  }}
                />
              </div>

              <p className="text-center mt-3 text-lg font-semibold text-text/80">
                {percentCorrect}% de aproveitamento
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 bg-slate-50 border-t border-slate-100 flex gap-3">
            <button
              onClick={handleRestart}
              className="
            flex-1 py-3.5 rounded-xl font-bold text-lg shadow-lg
            bg-primary text-text hover:brightness-105 
            transition-all duration-300 transform hover:scale-[1.02] active:scale-95
          "
            >
              Volta a home 🏠
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
