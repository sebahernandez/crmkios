import React from 'react';
import Button from 'components/Button/Button'; 
import { useDrawerDispatch } from 'context/DrawerContext';

type CuponCardProps = {
  id: number;
  clientid: string;
  titulo: string;
  code: string;
  cupones_usados: number;
  numero_cupon: number;
  image: string;
  discount: number;
  data: any;
};


const CuponButton: React.FC<CuponCardProps> = ({
  id,
  clientid,
  titulo,
  code,
  cupones_usados,
  numero_cupon,
  image,
  discount,
  data,
  ...props
}) => {
  const dispatch = useDrawerDispatch();

  const openDrawer = React.useCallback(
    () =>
      dispatch({
        type: 'OPEN_DRAWER',
        drawerComponent: 'CUPON_UPDATE_FORM',
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

export default CuponButton;
