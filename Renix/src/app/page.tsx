import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Sobre', href: '#', current: false },
  { name: 'Serviços', href: '#', current: false },
  { name: 'Contato', href: '#', current: false },
]

function classNames(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <Disclosure as="nav" className="bg-white h-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-4 md:px-15 lg:px-8">
          <div className="flex h-full items-center justify-between">

            {/* Logo (Centralizada no mobile, esquerda no desktop) */}
            <div className="flex-1 flex justify-center mt-4 sm:justify-start mr-40 sm:mr-25 ">
              <img src="/1.png" 
              alt="Renix Investment" 
              className="h-16 w-auto" />
            </div>

            {/* Links Desktop */}
            <div className="hidden sm:flex space-x-8 mt-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-black-800 hover:text-black-600 text-lg font-bold"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Botão Mobile (Ficando sempre na direita) */}
            <div className="sm:hidden flex-1 flex justify-end">
              <DisclosureButton className="relative inline-flex items-center justify-end rounded-md p-2 text-gray-600 hover:bg-gray-200 focus:outline-none">
                <Bars3Icon className="h-6 w-6 block group-data-open:hidden" aria-hidden="true" />
                <XMarkIcon className="h-6 w-6 hidden group-data-open:block" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <DisclosurePanel className="sm:hidden justify-end flex md:ml-115">
          <div className="space-y-1 px-4 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="bg-gray-200 block text-black-800 hover:bg-gray-200 px-3 py-2 rounded-md text-lg font-semibold flex justify-end w-28"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

       {/* Conteúdo principal */}
       <main className="mt-12 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
        <div className="mt-10 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
        <h1 className="text-black font-extrabold text-2xl mt-20 ml-2 sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl transition-all duration-300 ease-in-out">
  Faça seu investimento <br></br>com a Renix
        </h1>

          <div className="flex justify-center items-center mt-6 mr-45 sm:mt-8 md:mt-10 lg:mt-12">
            <button className="bg-[#028264] text-white px-8 py-3 ml-3 sm:px-6 sm:py-2 rounded transition-all duration-300 ease-in-out">
              <span className="text-white font-extrabold text-lg sm:text-sm md:text-base lg:text-lg">
                INVESTIR
              </span>
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
