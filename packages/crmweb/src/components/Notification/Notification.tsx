import React from "react";
import NotificationCard from "./NotificationCard";
import {
  Body,
  Header,
  Heading,
  ClearAll,
  Footer,
  FeedsButton
} from "./Notification.style";

import { useMutation } from '@apollo/client';
import { DROP_NOTIFY_ALL } from 'utils/graphql/mutation/notification';

export default function Notification({
  data = [],
  onClear,
  feedBtnClick
}: any) {

  const [delete_notify] = useMutation(DROP_NOTIFY_ALL );


  const clearNotify = () => {
    delete_notify();       
  };
    

  return (
    <div>
      <Header>
        <Heading>Notificaciones</Heading>
        <ClearAll onClick={clearNotify}>Limpiar Todo</ClearAll>
      </Header>
      <Body>
        {data.map((item, index) => (
          <NotificationCard key={index} {...item} />
        ))}
      </Body>
      <Footer>
        <FeedsButton onClick={feedBtnClick}>Ingresar Notificaciones</FeedsButton>
      </Footer>
    </div>
  );
}
