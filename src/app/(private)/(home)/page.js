'use client'
// importação de hooks nativos do next ks
import { useState } from "react";
import { useContext } from "react";

// importaçõe externas do next js 
import Header from "@/components/Header";
import {ProviderContext} from '@/app/layout';



const CATEGORIES = [
  'Livro de Mórmon', 
  'D&C', 
  'Pérola de Grande Valor', 
  'Velho Testamento', 
  'Novo Testamento', 
  'Outros'
];

export default function Home() {
  const [state, dispatch] = useContext(ProviderContext);

  const [selecionados, setSelecionados] = useState([]);

  const handleCheckbox = (category) => {
    if (state.questions.categorySelect.includes(category)) {
      dispatch({
        type: 'REMOVE_QUESTION',
        payload:category
      });

      
    } else {
        dispatch({
        type: 'ADD_QUESTION',
        payload: category
      });
    }



  };

  return (

    <div className="flex flex-col h-screen bg-background text-text font-sans transition-colors duration-300 overflow-hidden">
      <Header/>

      <main className="flex-1 w-full flex items-center justify-center p-4">            
        
        {/* Card Principal */}
        <div className="w-full max-w-2xl bg-white border-2 border-secondary/50 rounded-3xl shadow-xl flex flex-col max-h-[85vh] mb-48 overflow-hidden">
          
          <div className="bg-secondary/50 p-5 shrink-0">
            <h3 className="text-2xl font-bold text-center text-text">
              Escolha as Categorias 
            </h3>
          </div>
          
          <div className="p-5 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((category) => {
                const isSelected = state.questions.categorySelect.includes(category);
                return (
                  <div 
                    key={category}
                    onClick={() => handleCheckbox(category)}
                    className={`
                      flex items-center justify-between p-3 rounded-xl cursor-pointer border-2 transition-all duration-200
                      ${isSelected 
                        ? 'border-accent bg-accent/5 shadow-sm' 
                        : 'border-slate-100 hover:border-secondary/50 hover:bg-slate-50'}
                    `}
                  >
                    <span className={`font-semibold text-base ${isSelected ? 'text-accent' : 'text-text/80'}`}>
                      {category}
                    </span>
                    
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ml-2
                      ${isSelected ? 'bg-accent border-accent' : 'border-slate-300'}
                    `}>
                      {isSelected && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-5 pt-3 bg-slate-50 border-t border-slate-100 shrink-0">
            <button 
              disabled={selecionados.length === 0}
              className={`
                w-full py-3.5 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform
                ${selecionados.length > 0 
                  ? 'bg-primary text-text hover:brightness-105 active:scale-95 hover:shadow-primary/40' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
              `}
            >
              {selecionados.length > 0 ? 'INICIAR QUIZ' : 'Selecione uma categoria'}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
