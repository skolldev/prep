import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";
import classnames from "classnames";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

import { A } from ".";

import type { WithChildren } from "src/interfaces/common-props";

type IRoute = {
  name: string;
  href: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
};
const userNavigation = [{ name: "Sign out", action: () => signOut() }];

type LayoutProps = WithChildren & {
  actions?: React.ReactNode[];
  pageTitle: string;
};

export function Layout(props: LayoutProps): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session] = useSession();
  const router = useRouter();

  const isCurrentRoute = (route: IRoute): boolean => {
    return router.asPath === route.href;
  };

  const sidebarNavigation: IRoute[] = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Foods", href: "/foods", icon: UserGroupIcon },
    { name: "Settings", href: "/settings", icon: CogIcon },
  ];

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Narrow sidebar */}
      <div className="hidden w-28 bg-indigo-700 overflow-y-auto md:block">
        <div className="w-full py-6 flex flex-col items-center">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
              alt="Workflow"
            />
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
            {sidebarNavigation.map((item) => (
              <A
                key={item.name}
                href={item.href}
                className={classnames(
                  isCurrentRoute(item)
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-100 hover:bg-indigo-800 hover:text-white",
                  "group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                )}
                aria-current={isCurrentRoute(item) ? "page" : undefined}>
                <item.icon
                  className={classnames(
                    isCurrentRoute(item)
                      ? "text-white"
                      : "text-indigo-300 group-hover:text-white",
                    "h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <span className="mt-2">{item.name}</span>
              </A>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="md:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <div className="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 px-4 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                  <nav className="h-full flex flex-col">
                    <div className="space-y-1">
                      {sidebarNavigation.map((item) => (
                        <A
                          key={item.name}
                          href={item.href}
                          className={classnames(
                            isCurrentRoute(item)
                              ? "bg-indigo-800 text-white"
                              : "text-indigo-100 hover:bg-indigo-800 hover:text-white",
                            "group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                          )}
                          aria-current={
                            isCurrentRoute(item) ? "page" : undefined
                          }>
                          <item.icon
                            className={classnames(
                              isCurrentRoute(item)
                                ? "text-white"
                                : "text-indigo-300 group-hover:text-white",
                              "mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span>{item.name}</span>
                        </A>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true" />
          </div>
        </Dialog>
      </Transition.Root>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="w-full">
          <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => {
                setMobileMenuOpen(true);
              }}>
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6">
              <div className="flex-1 flex">{/** toolbar */}</div>
              <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                <Menu as="div" className="relative flex-shrink-0">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span className="sr-only">Open user menu</span>
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                            <span className="text-sm font-medium leading-none text-white">
                              {session?.user?.email?.[0].toUpperCase()}
                            </span>
                          </span>
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <button
                                  type="button"
                                  onClick={() => item.action()}
                                  className={classnames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                  )}>
                                  {item.name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>
        </header>
        <header className="bg-white shadow mb-[2px]">
          <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  {props.pageTitle}
                </h2>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                {props.actions?.map((action) => action)}
              </div>
            </div>
          </div>
        </header>
        <main className="overflow-y-auto flex-1">
          <div className="mx-auto py-6 sm:px-6 lg:px-8">{props.children}</div>
        </main>
      </div>
    </div>
  );
}
