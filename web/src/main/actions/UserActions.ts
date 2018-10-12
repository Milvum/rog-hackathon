import { ActionsUnion } from './ActionsUnion';
import { CreateAction } from './Actions';

export const USER_JOIN = '[user] JOIN';
export const USER_PART = '[user] PART';

export const UserActions = {
    userJoin: (user: string) => CreateAction(USER_JOIN, user),
    userPart: (user: string) => CreateAction(USER_PART, user),
};

export type UserActionsUnion = ActionsUnion<typeof UserActions>;
