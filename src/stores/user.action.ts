import type { LoginParams } from '../interface/user/login';
import type { Dispatch } from '@reduxjs/toolkit';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';

import { setUserItem } from './user.store';
import { createAsyncAction } from './utils';

export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async dispatch => {
    // const { result, status } = await apiLogin(payload);

    const { data } = await customAxiosInstance.post('/Home/login', {
      userName: payload.username,
      password: payload.password,
    });

    if (data?.user.userID) {
      localStorage.setItem('t', JSON.stringify(data.user.userID));
      localStorage.setItem('username', JSON.stringify(data.user.userName));
      dispatch(
        setUserItem({
          logged: true,
          username: data?.user.userName,
        }),
      );

      return true;
    }

    return false;
  };
});

export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    // const { status } = await apiLogout({ token: localStorage.getItem('t')! });
    const { data } = await customAxiosInstance.post('/Home/logout', {});

    if (data?.message) {
      localStorage.clear();
      dispatch(
        setUserItem({
          logged: false,
        }),
      );

      return true;
    }

    return false;
  };
};
