import React from 'react';
import {
  SubscriptionCardWrapper,
  SubscriptionImageWrapper,
  SubscriptionInfo,
  SaleTag,
  DiscountPercent,
  Image,
  SubscriptionTitle,
  SubscriptionWeight,
  SubscriptionMeta,
  OrderID,
  SubscriptionPriceWrapper,
  SubscriptionPrice,
  DiscountedPrice,
} from './SubscriptionCard.style';
import { useDrawerDispatch } from 'context/DrawerContext';

type SubscriptionCardProps = {
  title: string;
  sku: string;
  descripcion: string;
  image: any;
  weight?: string;
  currency?: string;
  description?: string;
  price: number;
  category: string;
  salePrice?: number;
  orderId?: number;
  discountInPercent?: number;
  clientid: string; 
  data: any;
};

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  sku,
  descripcion,
  image,
  weight,
  price,
  category,
  salePrice,
  discountInPercent,
  currency,
  orderId,
  clientid, 
  data,
  ...props
}) => {
  const dispatch = useDrawerDispatch();

  const openDrawer = React.useCallback(
    () =>
      dispatch({
        type: 'OPEN_DRAWER',
        drawerComponent: 'SUBSCRIPTION_UPDATE_FORM',
        data: data,
      }),
    [dispatch, data]
  );
  return (
    <SubscriptionCardWrapper
      {...props}
      className="Subscription-card"
      onClick={openDrawer}
    >
      <SubscriptionImageWrapper>
  
        <Image url={image} className="Subscription-image" />
        {discountInPercent && discountInPercent !== 0 ? (
          <>
            <SaleTag>En Venta</SaleTag>
            <DiscountPercent>{discountInPercent}% Descuento</DiscountPercent>
          </>
        ) : null}
      </SubscriptionImageWrapper>
      <SubscriptionInfo>
        <SubscriptionTitle>{title}</SubscriptionTitle>
        <SubscriptionTitle>{descripcion}</SubscriptionTitle>
        <SubscriptionWeight>{category}</SubscriptionWeight>
        <SubscriptionMeta>
          <SubscriptionPriceWrapper>
            <SubscriptionPrice>
              {currency}
              {salePrice && salePrice !== 0 ? salePrice : price}
            </SubscriptionPrice>

            {discountInPercent && discountInPercent !== 0 ? (
              <DiscountedPrice>
                {currency}
                {price}
              </DiscountedPrice>
            ) : null}
          </SubscriptionPriceWrapper>

          <OrderID>SKU: {sku}</OrderID>
        </SubscriptionMeta>
      </SubscriptionInfo>
    </SubscriptionCardWrapper>
  );
};

export default SubscriptionCard;
