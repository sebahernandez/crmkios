import Button from 'components/Button/Button';
import { Link } from 'components/Widgets/StickerCard/StickerCard.style';
import React from 'react';
import {
  Title,
  Message,
  Time,
  TitleWrapper,
  Dot,
  Details,
} from './Notification.style';

export default function NotificationCard({ title, time, message }) {
  return (
    <Message>
      <TitleWrapper>
        <Title>{title}</Title>
        <Dot />
        <Time>{time}</Time>
        
      </TitleWrapper>

      <Details>{message}</Details>
      <Button className="sm-1">Eliminar</Button>
    </Message>
  );
}
