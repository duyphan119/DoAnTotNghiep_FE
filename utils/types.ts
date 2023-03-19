type Timestamp = {
  createdAt: string;
  updatedAt: string;
} & Partial<{ deletedAt: string | null }>;
export type SettingWebsite = {
  id: number;
  key: string;
  value: string;
};

export type Notification = {
  id: number;
  message: string;
  userId: number;
  type: string;
  readAt: string;
  readBy: number;
} & Timestamp;

export type ResponseItems<T> = {
  items: T[];
  count: number;
};
