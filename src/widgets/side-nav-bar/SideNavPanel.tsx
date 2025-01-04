'use client';

import {
  Button,
  CreateActiveIcon,
  CreateIcon,
  FavoritesActiveIcon,
  FavoritesIcon,
  HomeActiveIcon,
  HomeIcon,
  LogOutActiveIcon,
  LogOutIcon,
  MessengerActiveIcon,
  MessengerIcon,
  Modal,
  MyProfileActiveIcon,
  MyProfileIcon,
  SearchActiveIcon,
  SearchIcon,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarItem,
  SidebarLink,
  StatisticsActiveIcon,
  StatisticsIcon,
  Typography
} from '@internshipsamyrai44-ui-kit/components-lib';
import { PATH } from '@/shared/const/PATH';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogoutMutation, useMeQuery } from '@/features/auth/api/authApi';
import s from './SideNavPanel.module.scss';

type SideNavBar = {
  className?: string;
};

const options = [
  { icon: HomeIcon, iconActive: HomeActiveIcon, title: 'Home', url: PATH.MAIN },
  { icon: CreateIcon, iconActive: CreateActiveIcon, title: 'Create', url: '#' },
  { icon: MyProfileIcon, iconActive: MyProfileActiveIcon, title: 'My Profile', url: PATH.PROFILE },
  { icon: MessengerIcon, iconActive: MessengerActiveIcon, title: 'Messenger', url: '#' },
  { icon: SearchIcon, iconActive: SearchActiveIcon, title: 'Search', url: '#' },
  { icon: StatisticsIcon, iconActive: StatisticsActiveIcon, title: 'Statistics', url: '#' },
  { icon: FavoritesIcon, iconActive: FavoritesActiveIcon, title: 'Favorites', url: '#' },
  { icon: LogOutIcon, iconActive: LogOutActiveIcon, title: 'Log Out', url: PATH.LOGIN }
];

export const SideNavPanel = ({ className }: SideNavBar) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalActive, setIsModalActive] = useState(false);

  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLinkClick = async (index: number, url: string) => {
    if (index === 7) {
      setIsModalActive(true);
    } else {
      setActiveIndex(index);
      router.push(url);
    }
  };

  return (
    <>
      <Sidebar className={`${className} sidebar-height`}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              {options.slice(0, 5).map((item, index) => (
                <SidebarLink href={item.url} key={item.title} onClick={() => handleLinkClick(index, item.url)}>
                  <SidebarItem
                    icon={item.icon}
                    title={item.title}
                    iconActive={item.iconActive}
                    isActive={activeIndex === index}
                  />
                </SidebarLink>
              ))}
            </SidebarGroupContent>
            <SidebarGroupContent style={{ gap: '24px' }}>
              {options.slice(5, 7).map((item, index) => (
                <SidebarLink href={item.url} key={item.title} onClick={() => handleLinkClick(index + 5, item.url)}>
                  <SidebarItem
                    icon={item.icon}
                    title={item.title}
                    iconActive={item.iconActive}
                    isActive={activeIndex === index + 5}
                  />
                </SidebarLink>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
          {options.slice(-1).map((item, index) => (
            <div
              className={s.logout}
              key={item.title}
              onClick={() => handleLinkClick(index + options.length - 1, item.url)}
            >
              <SidebarItem
                icon={item.icon}
                title={item.title}
                iconActive={item.iconActive}
                isActive={activeIndex === index + options.length - 1}
              />
            </div>
          ))}
        </SidebarContent>
      </Sidebar>
      {isModalActive && (
        <Modal title={'Log out'} className={s.modal} onClose={() => setIsModalActive(false)}>
          <Typography variant={'regular-text-16'} className={s.text}>
            Are you really want to log out of your account{' '}
            <Typography as={'span'} variant={'bold-text-16'}>
              “Epam@epam.com”
            </Typography>
            ?
          </Typography>
          <div className={s['buttons-block']}>
            <Button
              className={s['modal-button']}
              variant={'outlined'}
              onClick={() => {
                logout()
                  .unwrap()
                  .then(() => {
                    setIsModalActive(false);
                    router.push(PATH.LOGIN);
                  })
                  .catch((error) => {
                    console.error('Logout failed: ', error);
                  });
              }}
            >
              Yes
            </Button>
            <Button className={s['modal-button']} variant={'primary'} onClick={() => setIsModalActive(false)}>
              No
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
