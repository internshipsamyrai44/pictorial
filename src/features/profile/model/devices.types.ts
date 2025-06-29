export type Device = {
  deviceId: number;
  ip: string;
  lastActive: string;
  deviceType: string;
  browserName: string;
  browserVersion: string;
  deviceName: string;
  osName: string;
  osVersion: string;
};

export type DevicesResponse = {
  current: Device;
  others: Device[];
};
