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

export default function Notification({
  data = [],
  onClear,
  feedBtnClick
}: any) {
  return (
    <div>
      <Header>
        <Heading>Notificaciones</Heading>
        <ClearAll onClick={onClear}>Limpiar todo</ClearAll>
      </Header>
      <Body>
        {data.map((item, index) => (
          <NotificationCard key={index} {...item} />
        ))}
      </Body>
      <Footer>
        <FeedsButton onClick={feedBtnClick}>Ver Más</FeedsButton>
      </Footer>
    </div>
  );
}
