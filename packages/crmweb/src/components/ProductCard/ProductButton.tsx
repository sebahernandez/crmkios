import React from 'react';
import Button from 'components/Button/Button';
import { useDrawerDispatch } from 'context/DrawerContext';

type ProductCardProps = {
  title: string;
  image: any;
  gallery: any;
  weight?: string;
  currency?: string;
  descripcion?: string;
  price: number;
  category: string;
  salePrice?: number;
  orderId?: number;
  discountInPercent?: number;
  clientid: string; 
  data: any;
};

const ProductButton: React.FC<ProductCardProps> = ({
  title,
  descripcion,
  image,
  gallery,
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
    <Button
      {...props} 
      onClick={openDrawer}
    >Editar</Button>
  );
};

export default ProductButton;
