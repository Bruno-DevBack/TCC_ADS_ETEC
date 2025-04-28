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
  { name: 'Login', href: '/auth/login', current: false },
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
          // Atualiza estado externo quando o Disclosure abre ou fecha
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
                        className="text-black-800 hover:text-black-200 font-extrabold text-lg"
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
              <button className="bg-[#028264] text-white px-8 py-3 rounded">
                <span className="font-extrabold text-lg">INVESTIR</span>
              </button>
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
          <div className="w-full md:w-1/2">
            <img
              src="/equipe.png"
              alt="Renix Banner"
              className="object-contain w-full max-w-[620px] md:max-w-[720px] lg:max-w-[820px] xl:max-w-[920px] mt-10 md:mt-0 lg:mt-0"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
            <h2 className="text-2xl font-bold text-center">Nosso Time</h2>
            <p className="mt-4 text-base leading-relaxed text-justify">
              Nossa equipe é composta por profissionais qualificados e comprometidos em oferecer as melhores soluções
              para nossos clientes. Trabalhamos de forma colaborativa para proporcionar inovação e excelência em cada
              projeto que realizamos.
            </p>
          </div>
        </div>
      </section>


      <footer className="bg-white shadow-sm bg-[#028264] shadow">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

    </>
  )
}
