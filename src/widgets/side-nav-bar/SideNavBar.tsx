'use client';

import {
  Sidebar,
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
  StatisticsActiveIcon,
  StatisticsIcon,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarItem,
  SidebarLink
} from '@internshipsamyrai44-ui-kit/components-lib';

export const SideNavBar = () => {
  const options = [
    { icon: HomeIcon, iconActive: HomeActiveIcon, title: 'Home', url: '#' },
    { icon: CreateIcon, iconActive: CreateActiveIcon, title: 'Create', url: '#' },
    { icon: MyProfileIcon, iconActive: MyProfileActiveIcon, title: 'My Profile', url: '#' },
    { icon: MessengerIcon, iconActive: MessengerActiveIcon, title: 'Messenger', url: '#' },
    { icon: SearchIcon, iconActive: SearchActiveIcon, title: 'Search', url: '#' },
    { icon: StatisticsIcon, iconActive: StatisticsActiveIcon, title: 'Statistics', url: '#' },
    { icon: FavoritesIcon, iconActive: FavoritesActiveIcon, title: 'Favorites', url: '#' },
    { icon: LogOutIcon, iconActive: LogOutActiveIcon, title: 'Log Out', url: '#' }
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {options.slice(0, 5).map((item, index) => (
              <SidebarLink href={item.url} isActive={index === 0} key={item.title}>
                <SidebarItem
                  icon={item.icon}
                  iconActive={item.iconActive}
                  isActive={index === 0}
                  isDisabled={index === 1}
                  title={item.title}
                />
              </SidebarLink>
            ))}
          </SidebarGroupContent>
          <SidebarGroupContent className={'gap-6'}>
            {options.slice(5, 7).map((item) => (
              <SidebarLink href={item.url} key={item.title}>
                <SidebarItem icon={item.icon} title={item.title} />
              </SidebarLink>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
        {options.slice(-1).map((item) => (
          <SidebarLink href={item.url} key={item.title}>
            <SidebarItem icon={item.icon} title={item.title} />
          </SidebarLink>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
