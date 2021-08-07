import React from 'react';
import {
  UserDetailsWrapper,
  InfoCard,
  InfoCardDetails,
  InfoCardTitle,
  InfoCardTag,
} from './UserDetails.style';

export type UserDetailsProps = {};

export const UserDetails: React.FC<UserDetailsProps> = () => {
  return (
    <UserDetailsWrapper className="user-details">
      <InfoCard className="info-card">
        <InfoCardTitle>Cuenta Creada :</InfoCardTitle>
        <InfoCardDetails>9/10/2019</InfoCardDetails>
      </InfoCard>
      <InfoCard className="info-card">
        <InfoCardTitle>Dirección :</InfoCardTitle>
        <InfoCardDetails>
          Santiago, 234, vitacura <InfoCardTag>Principal</InfoCardTag>
        </InfoCardDetails>
        <InfoCardDetails>223, Raw Street, Rd-22, Newyork</InfoCardDetails>
      </InfoCard>
      <InfoCard className="info-card">
        <InfoCardTitle>Contacto :</InfoCardTitle>
        <InfoCardDetails>
          +566930216998 <InfoCardTag>Principal</InfoCardTag>
        </InfoCardDetails>
        <InfoCardDetails>+566930216998</InfoCardDetails>
      </InfoCard>
    </UserDetailsWrapper>
  );
};

export default UserDetails;
