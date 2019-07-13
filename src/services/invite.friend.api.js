import { apiRequest } from './base-api';

export const apiInviteFriends = (token, body) => {
    return apiRequest('POST', '/users/invite_friend/', body, {Authorization: `Bearer ${token}`})
        .then((res) => res.data)
        .catch((err) => ({err}));
};