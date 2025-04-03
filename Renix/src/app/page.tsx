import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

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
      <Disclosure as="nav" className="bg-whitesmoke-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md ml-80 text-black-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            <div className="flex mt-15 ml-15 sm:ml-10">
              <div className="flex shrink-0">
                <img
                  alt="Your Company"
                  src="/1.png"
                  className="h-58 w-auto"
                />
              </div>
              <div className="hidden sm:mr-8 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-black' : 'text-black-300 hover:bg-gray-700 hover:text-black',
                        'rounded-md px-3 py-2 text-lg font-extrabold',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-1 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-black' : 'text-black-300 hover:bg-black-700 hover:text-black',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <main className="mt-12 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
  <div className="mt-12 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
    <h1 className="text-black font-extrabold mt-30  text-xl sm:text-1xl md:text-3xl lg:text-4xl xl:text-5xl transition-all duration-300 ease-in-out">
      Faça seu investimento com a <br></br>Renix
    </h1>
    <div className="flex justify-center items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
      <button className="bg-[#028264] text-white px-8 py-3 sm:px-6 sm:py-2 rounded transition-all duration-300 ease-in-out">
        <h1 className="text-white font-extrabold text-lg sm:text-sm md:text-base lg:text-lg">
          INVESTIR
        </h1>
      </button>
    </div>
  </div>
</main>


    </>
  )
}
