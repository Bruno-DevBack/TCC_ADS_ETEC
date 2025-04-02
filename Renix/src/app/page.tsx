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
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            <div className="flex items-center mt-15">
              <div className="flex shrink-0 items-center">
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
                        item.current ? 'bg-gray-900 text-black' : 'text-black-300 hover:bg-gray-700 hover:text-white',
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
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <main className="mt-50 sm:px-20 md:px-12 lg:px-20 xl:px-32 2xl:px-90">
        <div className="mt-50 px-25 sm:px-20 md:px-12 lg:px-20 xl:px-32 2xl:px-7">
          <h1 className="text-black font-extrabold sm:text-xs 2xl:text-4xl">
            Invista
          </h1>
          <button className="bg-[#028264] text-white mt-10 px-10 py-2 rounded">
            <h1 className="text-white font-extrabold">
              INVESTIR
            </h1>
          </button>
        </div>
      </main>
    </>
  )
}
