'use client';

import {
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
  StatisticsIcon
} from '@internshipsamyrai44-ui-kit/components-lib';
import { PATH } from '@/shared/const/PATH';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/features/auth/api/authApi';

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

  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLinkClick = async (index: number, url: string) => {
    setActiveIndex(index);
    router.push(url);
  };

  return (
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
          <SidebarLink
            href={item.url}
            key={item.title}
            onClick={() => {
              logout()
                .unwrap()
                .then(() => {
                  router.push(PATH.LOGIN);
                });
            }}
          >
            <SidebarItem
              icon={item.icon}
              title={item.title}
              iconActive={item.iconActive}
              isActive={activeIndex === index + options.length - 1}
            />
          </SidebarLink>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
