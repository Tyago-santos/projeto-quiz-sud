"use client";
import { ProviderContext } from "@/app/layout";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import FinishResult from "./FinishResult";
import { mockQuestions } from "@/libs/mockData";

export default function Lessons({ findIndex, setFindIndex }) {
  const router = useRouter();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuitModal, setShowQuitModal] = useState(false);

  const [state, dispatch] = useContext(ProviderContext);

  const lessons = state?.questions?.lesson ?? [];
  const currentQuestion = lessons[findIndex];
  const totalQuestions = lessons.length;

  useEffect(() => {
    if (lessons.length === 0) {
      dispatch({
        type: "ADD_LESSON",
        payload: state.questions.lesson.length,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessons.length, dispatch]);

  const handleAnswerClick = (answer, options) => {
    if (selectedAnswer === answer) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(answer);
    }
  };

  const calcResponse =
    totalQuestions > 0 ? (findIndex / totalQuestions) * 100 : 0;

  const handleCheckResponse = () => {
    console.log(currentQuestion);
    const answerIndex = selectedAnswer ? selectedAnswer.charCodeAt(0) - 65 : -1; // A=0, B=1, etc.
    if (currentQuestion && currentQuestion.response[answerIndex]?.isCorrect) {
      dispatch({
        type: "ADD_COUNT_CORRECT",
        payload: currentQuestion.tema,
      });
    } else {
      dispatch({
        type: "ADD_COUNT_ERROR",
        payload: state.questions.countError,
      });
    }
    setSelectedAnswer(null);
    setFindIndex((prev) => prev + 1);
  };

  const handleQuitResponse = () => {
    setShowQuitModal(true);
  };

  const handleConfirmQuit = () => {
    setShowQuitModal(false);
    dispatch({
      type: "ADD_LESSON",
      payload: [],
    });

    dispatch({
      type: "ADD_COUNT_RESERT",
    });

    dispatch({
      type: "ADD_QUESTION_SELECT",
      payload: [],
    });
    router.push("/");
  };

  const handleCancelQuit = () => {
    setShowQuitModal(false);
  };

  // Evita renderizar enquanto não há perguntas carregadas

  if (!currentQuestion) {
    return (
      <>
        <FinishResult />;
      </>
    );
  }
  return (
    <section className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white border-2 border-secondary/50 rounded-3xl shadow-xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Cabeçalho do Card */}
        <div className="bg-secondary/50 p-5 shrink-0">
          <div className="space-y-3">
            {/* Barra de Progresso */}
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div
                className="bg-accent h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${calcResponse}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-text/70">
                {findIndex + 1} de {totalQuestions}
              </span>
              <span className="px-3 py-1 bg-primary/ text-secodary font-semibold rounded-full text-sm">
                {currentQuestion.tema}
              </span>
            </div>
          </div>
        </div>

        {/* Corpo do Card */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <h2 className="md:text-2xl text-sm font-bold text-text mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Opções de Resposta */}
          <div className="space-y-3  ">
            {currentQuestion.response.map((item, index) => {
              const letter = String.fromCharCode(65 + index); // A, B, C, D
              const isSelected = selectedAnswer === letter;

              return (
                <div
                  key={letter}
                  onClick={() => handleAnswerClick(letter, item)}
                  className={`
                      flex items-center p-4 rounded-xl cursor-pointer border-2 transition-all duration-200
                      ${
                        isSelected
                          ? "border-accent bg-accent/5 shadow-sm"
                          : "border-slate-100 hover:border-secondary/50 hover:bg-slate-50"
                      }
                    `}
                >
                  <div
                    className={`
                      w-10 h-10 rounded-xl flex items-center justify-center font-bold md:text-lg text-[10px] shrink-0
                      ${
                        isSelected
                          ? "bg-accent text-white"
                          : "bg-slate-100 text-text/70"
                      }
                    `}
                  >
                    {letter}
                  </div>
                  <span
                    className={`font-medium text-base ${isSelected ? "text-accent" : "text-text/80"}`}
                  >
                    {item.options}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rodapé do Card */}
        <div className="p-5 pt-3 bg-slate-50 border-t border-slate-100 shrink-0">
          <div className="flex gap-3">
            <button
              onClick={handleQuitResponse}
              className="
                  flex-1 py-3.5 rounded-xl font-bold md:text-lg text-sm shadow-lg
                  bg-slate-200 text-text/60 hover:bg-slate-300
                  transition-all duration-300 transform hover:scale-[1.02] active:scale-95
                "
            >
              Desistir
            </button>

            <button
              onClick={handleCheckResponse}
              disabled={!selectedAnswer}
              className={`
                  flex-1 py-3.5 rounded-xl font-bold md:text-lg text-sm shadow-lg transition-all duration-300 transform
                  ${
                    selectedAnswer
                      ? "bg-primary text-text hover:brightness-105 active:scale-95 hover:shadow-primary/40"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }
                `}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>

      {showQuitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
            <h3 className="md:text-lg text-[10px] font-bold text-text mb-3">
              Deseja desistir?
            </h3>
            <p className="text-sm text-text/70 mb-6">
              Sua sessão será encerrada e você voltará para a página inicial.
              Tem certeza que deseja sair?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelQuit}
                className="flex-1 py-3 rounded-xl border border-slate-200 bg-white text-text font-semibold hover:bg-slate-50 transition md:text-lg text-[10px]"
              >
                Continuar jogando
              </button>
              <button
                onClick={handleConfirmQuit}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition md:text-lg text-[10px]"
              >
                Ir para home
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
