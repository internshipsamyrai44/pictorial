export type NotifsSoketResponse = {
  id: number;
  clientId: string;
  message: string;
  isRead: boolean;
  notifyAt: string;
};

export type updateNotifMark = {
  ids: number[];
};

export type updateNotifResponse = {
  statusCode: number;
  messages: [
    {
      message: string;
      field: string;
    }
  ];
  error: string;
};

export type getNotifByProfileResponse = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: [
    {
      id: number;
      message: string;
      isRead: boolean;
      createdAt: string;
    }
  ];
};
