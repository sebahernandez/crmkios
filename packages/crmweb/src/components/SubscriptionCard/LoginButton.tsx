import React from 'react';
import Button from 'components/Button/Button';
import { useDrawerDispatch } from 'context/DrawerContext';

type SubscriptionCardProps = {
    data: any;
};
 
const SubscriptionButton: React.FC<SubscriptionCardProps> = ({
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
    <Button
      {...props} 
      onClick={openDrawer}
    >Editar</Button>
  );
};

export default SubscriptionButton;
