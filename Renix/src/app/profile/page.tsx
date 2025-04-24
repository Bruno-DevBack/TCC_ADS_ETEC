export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0e7a63] flex items-center justify-center">
      <div className="bg-[#d9d9d9] w-[300px] p-6 rounded flex flex-col items-center shadow-lg">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2 overflow-hidden">
          <img
            src="/avatar-placeholder.png"
            alt="Avatar"
            className="w-16 h-16 object-cover"
          />
        </div>

        {/* Nome */}
        <h2 className="text-black font-semibold mb-4 border-t border-gray-400 w-full text-center pt-2">
          João S.
        </h2>

        {/* Formulário */}
        <form className="w-full text-left space-y-4">
          <div>
            <label
              htmlFor="nome"
              className="text-xs font-bold text-black block mb-1"
            >
              NOME COMPLETO:
            </label>
            <input
              id="nome"
              type="text"
              className="w-full h-6 px-2 border border-gray-400 rounded text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="telefone"
              className="text-xs font-bold text-black block mb-1"
            >
              TELEFONE:
            </label>
            <input
              id="telefone"
              type="tel"
              className="w-full h-6 px-2 border border-gray-400 rounded text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="text-xs font-bold text-black block mb-1"
            >
              SENHA:
            </label>
            <input
              id="senha"
              type="password"
              className="w-full h-6 px-2 border border-gray-400 rounded text-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
