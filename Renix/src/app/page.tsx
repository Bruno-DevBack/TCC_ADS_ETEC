'use client'

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

export default function Page() {
  return (
    <>
      {/* Navbar */}
      <Disclosure as="nav" className="bg-white shadow h-20 fixed top-0 left-0 w-full z-50">
        {({ open }) => (
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
                <div className="hidden sm:flex space-x-6 md:mt-6 ml-auto">
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

                {/* MOBILE MENU ICON */}
                <div className="sm:hidden">
                  <DisclosureButton className="text-gray-800 hover:text-gray-600 focus:outline-none mt-5">
                    {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            {/* MOBILE MENU LINKS */}
            <DisclosurePanel className="sm:hidden px-4 pt-2 pb-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-black font-bold py-1"
                >
                  {item.name}
                </a>
              ))}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
      {/* Conteúdo principal */}
      <main className="pt-28 px-4 sm:px-6 lg:px-16 container mx-auto">
        <div className="mt-10 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-24 ml-2 md:mt-[120px] lg:mr-1">
            {/* Texto e botão */}
            <div className="flex flex-col items-start gap-4">
              <h1 className="text-black font-extrabold text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl">
                Faça seu investimento <br /> com a Renix
              </h1>

              <button className="bg-[#028264] text-white px-8 py-3 sm:px-6 sm:py-2 rounded">
                <span className="text-white font-extrabold text-lg sm:text-sm md:text-base lg:text-lg">
                  INVESTIR
                </span>
              </button>
            </div>

            {/* Imagem ao lado */}
            <div className="w-full flex justify-center md:justify-end">
              <img
                src="/woman.jpeg"
                alt="Renix Banner"
                className="w-full max-w-xl object-contain"
              />
            </div>
          </div>
        </div>
      </main>

    </>
  )
}