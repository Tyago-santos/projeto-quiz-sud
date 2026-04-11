import { useState, useEffect } from "react";
import { getTopScores } from "@/libs/firebase/firebase.db";

const CATEGORIES = [
  "Livro de Mórmon",
  "D&C",
  "Pérola de Grande Valor",
  "Velho Testamento",
  "Novo Testamento",
  "Outros",
];

export default function Ranking() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = CATEGORIES;

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);
        const scores = await getTopScores(selectedCategory, 10);
        setRanking(scores);
      } catch (error) {
        console.error("Erro ao buscar ranking:", error);
        setRanking([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [selectedCategory]);

  const maxPoints = ranking.length > 0 ? ranking[0].score : 0;

  return (
    <div className="w-full">
      <div className="bg-white border-2 border-secondary/50 rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-secondary/50 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text/70">
            Ranking por escrituras
          </p>
          <h2 className="md:text-2xl  text-xl font-bold text-text">
            Top jogadores por categoria
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Categorias */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    group inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200
                    ${
                      isSelected
                        ? "bg-primary text-text border-primary/60 shadow-sm shadow-primary/30"
                        : "bg-white text-text/80 border-slate-200 hover:border-secondary/60 hover:text-text"
                    }
                  `}
                >
                  <span>{category}</span>
                  <span
                    className={`
                      w-2.5 h-2.5 rounded-full border
                      ${
                        isSelected
                          ? "border-white bg-text/30"
                          : "border-slate-300 group-hover:border-secondary"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>

          {/* Ranking Cards */}
          <div className="grid grid-cols-1 gap-3">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
                <p className="text-text/60 mt-2">Carregando ranking...</p>
              </div>
            ) : ranking.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text/60">
                  Nenhum jogador ainda nesta categoria
                </p>
              </div>
            ) : (
              ranking.map((item, index) => {
                const percentage =
                  maxPoints > 0 ? (item.score / maxPoints) * 100 : 0;
                const medal = ["🥇", "🥈", "🥉"][index];

                return (
                  <div
                    key={index}
                    className="bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:border-secondary/50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">
                          {medal || `#${index + 1}`}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-lg text-text">
                            {item.userName}
                          </span>
                          <span className="text-xs uppercase tracking-[0.12em] text-text/60">
                            {selectedCategory}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-accent/10 text-accent border border-accent/30">
                        {item.score} pts
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-slate-100">
                      <div
                        className="h-full bg-gradient-to-r from-accent via-secondary to-primary transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
