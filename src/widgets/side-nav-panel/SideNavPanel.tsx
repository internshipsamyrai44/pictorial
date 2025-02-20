'use client';

import { useLogoutMutation, useMeQuery } from '@/features/auth/api/authApi';
import { PATH } from '@/shared/const/PATH';
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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import s from './SideNavPanel.module.scss';
import { CreatePost } from '@/widgets/create-post/CreatePost';

type SideNavBar = {
  className?: string;
};

export const SideNavPanel = ({ className }: SideNavBar) => {
  const [logout] = useLogoutMutation();
  const { data: me } = useMeQuery();
  const router = useRouter();
  const [activeIcon, setActiveIcon] = useState<string>('');
  const [isModalActive, setIsModalActive] = useState(false);
  const [isCreatePostActive, setCreatePostActive] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string>('');

  useEffect(() => {
    if (me) {
      setProfileUrl(`profile/${me.userId}`);
    }
  }, [me]);

  const options = [
    { icon: HomeIcon, iconActive: HomeActiveIcon, title: 'Home', url: PATH.MAIN, value: 'home' },
    { icon: CreateIcon, iconActive: CreateActiveIcon, title: 'Create', url: '#', value: 'create' },
    {
      icon: MyProfileIcon,
      iconActive: MyProfileActiveIcon,
      title: 'My Profile',
      url: profileUrl,
      value: 'profile'
    },
    { icon: MessengerIcon, iconActive: MessengerActiveIcon, title: 'Messenger', url: '#', value: 'message' },
    { icon: SearchIcon, iconActive: SearchActiveIcon, title: 'Search', url: '#', value: 'search' },
    { icon: StatisticsIcon, iconActive: StatisticsActiveIcon, title: 'Statistics', url: '#', value: 'statistics' },
    { icon: FavoritesIcon, iconActive: FavoritesActiveIcon, title: 'Favorites', url: '#', value: 'favorites' },
    { icon: LogOutIcon, iconActive: LogOutActiveIcon, title: 'Log Out', url: PATH.AUTH.LOGIN, value: 'logout' }
  ];

  const handleLinkClick = async (value: string, url: string) => {
    if (value === 'create') {
      setCreatePostActive(true);
    }

    if (value === 'logout') {
      setActiveIcon(value);
      setIsModalActive(true);
    } else {
      setActiveIcon(value);
      router.push(url);
    }
  };

  return (
    <>
      <Sidebar className={`${className} sidebar-height`}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              {options.slice(0, 5).map((item) => (
                <SidebarLink href={item.url} key={item.value} onClick={() => handleLinkClick(item.value, item.url)}>
                  <SidebarItem
                    icon={item.icon}
                    title={item.title}
                    iconActive={item.iconActive}
                    isActive={activeIcon === item.value}
                  />
                </SidebarLink>
              ))}
            </SidebarGroupContent>
            <SidebarGroupContent style={{ gap: '24px' }}>
              {options.slice(5, 7).map((item) => (
                <SidebarLink href={item.url} key={item.value} onClick={() => handleLinkClick(item.value, item.url)}>
                  <SidebarItem
                    icon={item.icon}
                    title={item.title}
                    iconActive={item.iconActive}
                    isActive={activeIcon === item.value}
                  />
                </SidebarLink>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
          {options.slice(-1).map((item) => (
            <div className={s.logout} key={item.value} onClick={() => handleLinkClick(item.value, item.url)}>
              <SidebarItem
                icon={item.icon}
                title={item.title}
                iconActive={item.iconActive}
                isActive={activeIcon === item.value}
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
            ?`
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
                    router.push(PATH.MAIN);
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

      {isCreatePostActive && <CreatePost setCreatePostActive={setCreatePostActive} />}
    </>
  );
};
