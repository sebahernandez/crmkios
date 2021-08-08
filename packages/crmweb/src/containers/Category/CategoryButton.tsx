import React from 'react';
import Button from 'components/Button/Button';
import { useDrawerDispatch } from 'context/DrawerContext';

type CategoryCardProps = {
  id: number;
  clientid: string;
  imageURL: string;
  name?: string;
  value?: string; 
  data: any;
};

const CategoryButton: React.FC<CategoryCardProps> = ({
  id,
  clientid,
  imageURL,
  name,
  value, 
  data,
  ...props
}) => {
  const dispatch = useDrawerDispatch();

  const openDrawer = React.useCallback(
    () =>
      dispatch({
        type: 'OPEN_DRAWER',
        drawerComponent: 'CATEGORY_UPDATE_FORM',
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

export default CategoryButton;
