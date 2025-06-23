export type UpdateTokenResponse = {
  data: { accessToken: string };
};

export type getMessagesResponse<T> = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: T[];
};

export type LastMessages = {
  id: number;
  ownerId: number;
  receiverId: number;
  messageText: string;
  createdAt: string;
  updatedAt: string;
  messageType: 'TEXT';
  status: MessageStatus;
  userName: string;
  avatars: Avatar[];
};

export type Messages = {
  id: number;
  ownerId: number;
  receiverId: number;
  messageText: string;
  createdAt: string;
  updatedAt: string;
  messageType: 'TEXT';
  status: MessageStatus;
};

export type updateMessageRequest = {
  id: number;
};

type Avatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
};

export enum MessageStatus {
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  READ = 'READ'
}
