'use client'

import { useState } from "react";
import Header from "@/components/Header";

const calcResponse = (15/20)*100;

export default function  LessonIdPage() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    alert(answer);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-text font-sans transition-colors duration-300">
      <Header />
      
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
                  Pergunta 1 de 10
                </span>
                <span className="px-3 py-1 bg-primary/ text-secodary font-semibold rounded-full text-sm">
                  Livro de Mórmon
                </span>
              </div>
            </div>
          </div>
          
          {/* Corpo do Card */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold text-text mb-6 leading-relaxed">
              Qual foi o primeiro profeta do livro de mormon? Qual foi o primeiro profeta do livro de mormon? Qual foi o primeiro profeta do livro de mormon?
            </h2>
            
            {/* Opções de Resposta */}
            <div className="space-y-3">
              {['Lei', 'Jaco', 'Joseph', 'Adão'].map((option, index) => {
                const letter = String.fromCharCode(65 + index); // A, B, C, D
                const isSelected = selectedAnswer === letter;
                
                return (
                  <div
                    key={letter}
                    onClick={() => handleAnswerClick(letter)}
                    className={`
                      flex items-center p-4 rounded-xl cursor-pointer border-2 transition-all duration-200
                      ${isSelected 
                        ? 'border-accent bg-accent/5 shadow-sm' 
                        : 'border-slate-100 hover:border-secondary/50 hover:bg-slate-50'}
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg mr-4 shrink-0
                      ${isSelected 
                        ? 'bg-accent text-white' 
                        : 'bg-slate-100 text-text/70'}
                    `}>
                      {letter}
                    </div>
                    <span className={`font-medium text-base ${isSelected ? 'text-accent' : 'text-text/80'}`}>
                      {option}
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
                className="
                  flex-1 py-3.5 rounded-xl font-bold text-lg shadow-lg 
                  bg-slate-200 text-text/60 hover:bg-slate-300 
                  transition-all duration-300 transform hover:scale-[1.02] active:scale-95
                "
              >
                Desistir
              </button>
              
              <button 
                disabled={!selectedAnswer}
                className={`
                  flex-1 py-3.5 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform
                  ${selectedAnswer 
                    ? 'bg-primary text-text hover:brightness-105 active:scale-95 hover:shadow-primary/40' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                `}
              >
                Próximo
              </button>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}