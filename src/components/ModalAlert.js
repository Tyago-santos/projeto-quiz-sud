export default function ModalAlert({ message, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
        {/* <h3 className="text-xl font-bold text-text mb-3">choro</h3> */}
        <p className="text-sm text-text/70 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
