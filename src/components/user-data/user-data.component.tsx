import { FC, useState } from 'react';
import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


import { API } from '../../api'
import { ACCOUNT_TYPES, FORM_ELEMENTS } from './misc/settings';

import * as S from './user-data.style'

import { GetUser, IUserData, User } from './user.data.types';

export const UserData: FC<IUserData> = ({ accountType = ACCOUNT_TYPES.RETAIL }) => {
  const [notification, setNotification] = useState(null);

  const schema = yup.object({
    [FORM_ELEMENTS.NAME]: yup.string().required('Field full name is required'),
    [FORM_ELEMENTS.PHONE]: yup
      .string()
      .required('Field phone is required')
  }
);
 
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const clearNotification = () => {
    setNotification(null)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    clearNotification();

    try {
      const {message} = await API.put<FieldValues, GetUser>('https://my.api/front/api/v1/user/personal', data);
      if(message) {
        setNotification(message);
      }

    } catch { 
      setNotification('Data save error');
    }
  };

  const getData = async () => {
    try {
    const {phone, name, username} = await API.get<User>('https://my.api/front/api/v1/user/me');
    reset({phone, name, username})
    } catch{
      setNotification('Error getting data');
    }
  }

  const renderErrors = () => {
    const errArr = Object.values(errors).map((error) => error.message);
    return errArr.map((error, index) => <div key={index}>{error}</div>);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <S.Wrapper>
    <div>
      <S.Notification data-test-id="notification">{notification || renderErrors()}</S.Notification>
      <S.From method="POST" onSubmit={handleSubmit(onSubmit)}>
        <S.Header data-test-id="header">Your {accountType === ACCOUNT_TYPES.BUSINESS ? 'business' : 'user'} data</S.Header>
        <S.Label>
          <S.Input {...register(FORM_ELEMENTS.USERNAME)} type="text" placeholder="Username" />
        </S.Label>
        <S.Label>
          <S.Input {...register(FORM_ELEMENTS.NAME)} type="text" placeholder="Full name" />
        </S.Label>
        <S.Label>
          <S.Input {...register(FORM_ELEMENTS.PHONE)} type="text" placeholder="Phone" />
        </S.Label>
        <S.Button type="submit">Save</S.Button>
      </S.From>
    </div>
    </S.Wrapper>
  )
}