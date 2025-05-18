export type UserItem = {
  id: 0;
  userName: string;
  firstName: string;
  lastName: string;
  avatars: [
    {
      url: string;
      width: number;
      height: number;
      fileSize: number;
      createdAt: string;
    }
  ];
  createdAt: string;
  user?: UserItem;
};

export type SearchUserResponse = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  prevCursor: number;
  nextCursor: number;
  items: UserItem[];
};

export type GetUserByUsernameParams = {
  userName: string;
  pageSize?: number;
  pageNumber?: number;
  cursor?: number;
};

export type FollowRequest = {
  selectedUserId: number;
};
