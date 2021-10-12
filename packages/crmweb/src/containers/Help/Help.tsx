 import SettingsCard from 'components/SettingsCard/SettingsCard';
import { withStyle } from 'baseui'; 
import { HelpIcon } from 'assets/icons/HelpIcon'; 
import { Grid, Row, Col as Column } from 'components/FlexBox/FlexBox';
import Cookies  from 'universal-cookie';

const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

export default function help() {
  const cookie = new Cookies() 
  const clientid = cookie.get('suscriptor').clientid
 
  return (
    <Grid fluid={true}>
      <Row>
        <Col md={6}>
          <SettingsCard
            icon={<HelpIcon />}
            title="Subir productos a tu cuenta"
            subtitle="Escribe tu texto aquí"
            onClick=""
          />
        </Col>
        <Col md={6}>
          <SettingsCard
            icon={<HelpIcon/>}
            title="Crear un nuevo usuario"
            subtitle="Escribe tu texto aquí"
            onClick=""
          />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <SettingsCard
            icon={<HelpIcon />}
            title="Crear cupones de descuento"
            subtitle="Escribe tu texto aquí"
            onClick=""
          />
        </Col>

        <Col md={6}>
          <SettingsCard
            icon={<HelpIcon />}
            title="Seguimiento de pedidos"
            subtitle="Escribe tu texto aquí"
            onClick=""
          />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <SettingsCard
            icon={<HelpIcon />}
            title="Clientes y Delivery"
            subtitle="Escribe tu texto aquí"
            onClick=""
          />
        </Col>
        <Col md={6}>
          <SettingsCard
            icon={<HelpIcon/>}
            title="Recuperar una contraseña"
            subtitle="Escribe tu texto aquí"
            onClick=""
          />
        </Col>
      </Row>
    </Grid>
  );
}
