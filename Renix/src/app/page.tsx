'use client'

import { useEffect, useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Sobre', href: '#', current: false },
  { name: 'Serviços', href: '#', current: false },
  { name: 'Contato', href: '#', current: false }
]

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)

  // Fecha o menu se redimensionar para largura >= 640px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Navbar */}
      <Disclosure
        as="nav"
        className="bg-white shadow h-20 fixed top-0 left-0 w-full z-50"
      >
        {({ open }) => {
          //Disclosure para Mobile
          if (open !== isOpen) setIsOpen(open)

          return (
            <>
              <div className="mx-auto max-w-7xl px-6 sm:px-6 md:px-12 lg:px-16">
                <div className="flex h-full items-center justify-between">
                  {/* LOGO */}
                  <div className="flex items-center flex-shrink-0 mt-2">
                    <img
                      src="/1.png"
                      alt="Renix Logo"
                      className="h-16 w-auto object-contain"
                    />
                  </div>

                  {/* MENU LINKS */}
                  <div className="hidden sm:flex space-x-6 md:mt-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-black-800 hover:text-black-200 font-bold text-lg"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>

                  {/* Ícone mobile (≡) */}
                  {!open && (
                    <div className="sm:hidden">
                      <DisclosureButton className="text-gray-800 hover:text-gray-600 focus:outline-none mt-5">
                        <Bars3Icon className="h-6 w-6" />
                      </DisclosureButton>
                    </div>
                  )}
                </div>
              </div>

              {/* Overlay escuro */}
              {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 sm:hidden" />
              )}

              {/* Menu mobile */}
              <DisclosurePanel className="sm:hidden bg-white px-4 pt-4 pb-4 mt-2 w-full max-w-xs rounded-r-lg fixed top-0 right-0 h-full z-50 shadow-lg">
                {/* Botão de fechar */}
                <div className="flex justify-end">
                  <DisclosureButton className="p-2 text-gray-700 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </DisclosureButton>
                </div>

                {/* Links com ícones */}
                <div className="flex flex-col space-y-2 mt-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 text-black font-bold py-2 border-b-2 border-gray-400 w-full"
                    >
                      {item.name === 'Sobre' && (
                        <InformationCircleIcon className="h-5 w-5 text-gray-700" />
                      )}
                      {item.name === 'Serviços' && (
                        <Cog6ToothIcon className="h-5 w-5 text-gray-700" />
                      )}
                      {item.name === 'Contato' && (
                        <PhoneIcon className="h-5 w-5 text-gray-700" />
                      )}
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>
              </DisclosurePanel>
            </>
          )
        }}
      </Disclosure>

      {/* Conteúdo principal */}
      <main className="pt-28 px-4 sm:px-6 lg:px-16 xl:px-20 2xl:px-32">
        <div className="mt-10 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-24 ml-2 md:mt-[120px]">
            {/* Texto e botão */}
            <div className="flex flex-col items-start gap-6 max-w-xl">
              <h1 className="text-black font-extrabold text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl">
                Faça seu investimento <br /> com a Renix
              </h1>
              <a href="/login" className="bg-[#028264] text-white px-8 py-3 rounded inline-block">
                <span className="font-extrabold text-lg">INVESTIR</span>
              </a>

            </div>

            {/* Imagem */}
            <div className="w-full flex justify-center md:justify-end">
              <img
                src="/woman.jpeg"
                alt="Renix Banner"
                className="object-contain w-full max-w-[520px] md:max-w-[480px] lg:max-w-[560px] xl:max-w-[640px]"
              />
            </div>
          </div>
        </div>
      </main>
      {/* Seção verde fora do container */}
      <section className="w-full bg-[#028264] mt-36 py-12 px-4">
        <div className="mx-auto text-white text-center">
          <h2 className="text-3xl font-bold">O que oferecemos?</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-x-12 lg:gap-x-[200px] mt-16 gap-y-12"> {/* Adicionado gap-y-12 para maior espaço entre as colunas no mobile */}
            <div className="flex flex-col items-center w-full max-w-xs text-center">
              <h2 className="text-xl font-semibold">Investimento de Qualidade</h2>
              <p className="mt-4 text-base leading-relaxed text-justify">
                Oferecemos uma ferramenta prática e confiável para que você possa simular investimentos com qualidade e segurança.
                Com base em bancos digitais confiáveis, nosso sistema permite que você visualize de forma clara o desempenho
                potencial do seu dinheiro, ajudando você a tomar decisões mais conscientes e estratégicas.
              </p>
            </div>

            <div className="flex flex-col items-center w-full max-w-xs text-center">
              <h2 className="text-xl font-semibold">Prévia de Valores</h2>
              <p className="mt-4 text-base leading-relaxed text-justify">
                Tenha acesso a uma estimativa detalhada dos seus rendimentos antes mesmo de investir.
                Basta informar o valor que deseja aplicar, o prazo e o banco escolhido, e o sistema calculará uma previsão
                dos lucros, considerando fatores como taxas, impostos e tempo de aplicação.
              </p>
            </div>

            <div className="flex flex-col items-center w-full max-w-xs text-center">
              <h2 className="text-xl font-semibold">Análise de Investimentos</h2>
              <p className="mt-4 text-base leading-relaxed text-justify">
                Compare diferentes opções de investimento de maneira clara e eficiente.
                A ferramenta analisa aspectos como rendimento, tempo de retorno, imposto de renda e outros fatores importantes,
                ajudando você a identificar a melhor escolha com base no seu perfil e objetivo financeiro.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Seção Branca fora do container */}
      <section className="w-full bg-white">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          {/* Imagem */}
          <div className="w-full md:w-1/2">
            <img
              src="/equipe.png"
              alt="Renix Banner"
              className="object-contain w-full max-w-[620px] md:max-w-[720px] lg:max-w-[820px] xl:max-w-[920px] mt-10 md:mt-0 lg:mt-0"
            />
          </div>

          {/* Texto */}
          <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0 ">
            <h2 className="text-2xl font-bold text-center flex justify-center md:text-left">Nosso Time</h2>
            <p className="w-[90%] mt-4 text-base leading-relaxed text-justify mx-auto md:mx-0">
              Somos uma equipe formada por cinco alunos dedicados da ETEC de Guarulhos, unidos pelo propósito de desenvolver um projeto relevante e aplicável como Trabalho de Conclusão de Curso (TCC). Ao longo do nosso percurso acadêmico, compartilhamos aprendizados, desafios e conquistas, e este projeto representa o ápice dessa jornada.

              Nosso TCC tem como foco o gerenciamento e a análise de investimentos, uma área cada vez mais essencial no cenário financeiro atual. Com ele, buscamos oferecer uma ferramenta e um conteúdo que ajude pessoas e empresas a tomarem decisões mais conscientes e estratégicas sobre onde e como investir.

              Nosso compromisso com a qualidade, a clareza e a utilidade do trabalho reflete não apenas nossa formação técnica, mas também nossa paixão pelo conhecimento e pela inovação.
            </p>
          </div>
        </div>
      </section>


      <footer className="bg-white mt-12 shadow-sm">
        <div className="max-w-screen-lg mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <span>© 2025 <a href="/" className="hover:underline">Renix™</a>. Todos os direitos reservados.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="/" className="hover:underline">Sobre</a>
            <a href="/" className="hover:underline">Contato</a>
          </div>
        </div>
      </footer>

    </>
  )
}
