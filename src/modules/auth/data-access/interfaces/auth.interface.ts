import { EUserRole } from '@constants/api.constants';

export interface IJwtPayload {
  userId: string;
  role: EUserRole;
  privacyUpdatedTimes: number;
}
