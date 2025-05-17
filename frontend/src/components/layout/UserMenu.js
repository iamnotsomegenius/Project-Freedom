import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const UserMenu = () => {
  const { user, logout } = useAuth();
  
  if (!user) return null;
  
  // Define dashboard link based on user type
  const getDashboardLink = () => {
    switch (user.user_type) {
      case 'SELLER':
        return '/dashboard/seller';
      case 'BUYER':
        return '/dashboard/buyer';
      case 'INVESTOR':
        return '/dashboard/investor';
      default:
        return '/dashboard';
    }
  };
  
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-1 text-foreground hover:text-secondary">
        <UserCircleIcon className="h-6 w-6" />
        <span className="hidden sm:block max-w-[100px] truncate">
          {user.display_name || user.email.split('@')[0]}
        </span>
        <ChevronDownIcon className="h-4 w-4" />
      </Menu.Button>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-800 rounded-md bg-primary shadow-lg ring-1 ring-gray-800 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={getDashboardLink()}
                  className={`${
                    active ? 'bg-gray-800' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`${
                    active ? 'bg-gray-800' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Profile Settings
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? 'bg-gray-800' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
