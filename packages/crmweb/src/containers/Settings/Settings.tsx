import  { useCallback } from 'react';
import SettingsCard from 'components/SettingsCard/SettingsCard';
import { useDrawerDispatch } from 'context/DrawerContext';
import { SITE_SETTINGS } from 'settings/constants';
import { withStyle } from 'baseui';
import { SiteSettings } from 'assets/icons/SiteSettings';
import { Members } from 'assets/icons/Members';  
import { Grid, Row, Col as Column } from 'components/FlexBox/FlexBox';
import { useHistory } from 'react-router-dom';
import Cookies  from 'universal-cookie';

const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));
 

export default function Settings() {
  const cookie = new Cookies() 
  const clientid = cookie.get('suscriptor').clientid
  let history = useHistory();
 


  const dispatch = useDrawerDispatch();

  const openStaffForm = useCallback(
    () =>
      dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'STAFF_MEMBER_FORM' }),
    [dispatch]
  );
 

  return (
    <Grid fluid={true}>
      <Row>
      <Col md={6}>
          <SettingsCard
            icon={<SiteSettings />}
            title="Configuración"
            subtitle="Ver y actualizar la configuración del CRM / Tienda"
            onClick={() => history.push(SITE_SETTINGS)}
          />
        </Col>
        <Col md={6}>
          <SettingsCard
            icon={<Members />}
            title="Añadir Miembros"
            subtitle="Añade tus miembros del equipo aquí"
            onClick={openStaffForm}
          />
        </Col>
      </Row>

    </Grid>
  );
}
