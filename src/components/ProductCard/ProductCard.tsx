import React from 'react';
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  SaleTag,
  DiscountPercent,
  Image,
  ProductTitle,
  ProductWeight,
  ProductMeta,
  OrderID,
  ProductPriceWrapper,
  ProductPrice,
  DiscountedPrice,
} from './ProductCard.style';
import { useDrawerDispatch } from 'context/DrawerContext';

type ProductCardProps = {
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

const ProductCard: React.FC<ProductCardProps> = ({
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
        drawerComponent: 'PRODUCT_UPDATE_FORM',
        data: data,
      }),
    [dispatch, data]
  );
  return (
    <ProductCardWrapper
      {...props}
      className="product-card"
      onClick={openDrawer}
    >
      <ProductImageWrapper>
  
        <Image url={image} className="product-image" />
        {discountInPercent && discountInPercent !== 0 ? (
          <>
            <SaleTag>En Venta</SaleTag>
            <DiscountPercent>{discountInPercent}% Descuento</DiscountPercent>
          </>
        ) : null}
      </ProductImageWrapper>
      <ProductInfo>
        <ProductTitle>{title}</ProductTitle>
        <ProductTitle>{descripcion}</ProductTitle>
        <ProductWeight>{category}</ProductWeight>
        <ProductMeta>
          <ProductPriceWrapper>
            <ProductPrice>
              {currency}
              {salePrice && salePrice !== 0 ? salePrice : price}
            </ProductPrice>

            {discountInPercent && discountInPercent !== 0 ? (
              <DiscountedPrice>
                {currency}
                {price}
              </DiscountedPrice>
            ) : null}
          </ProductPriceWrapper>

          <OrderID>SKU: {sku}</OrderID>
        </ProductMeta>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
