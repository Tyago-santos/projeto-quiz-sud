// Em qualquer componente/página
export default function TesteTailwind() {
  return (
    <div className=" bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-white mb-4">
        Tailwind está funcionando! 🎉
      </h1>
      <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
        Botão de teste
      </button>
    </div>
  )
}