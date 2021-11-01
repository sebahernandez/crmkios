import Cookies  from 'universal-cookie';


function config() {
  const cookie = new Cookies() 
  let cid = 'Sin suscripcion'
  if ( cookie.get('suscriptor') && cookie.get('suscriptor').clientid ) {
    cid = cookie.get('suscriptor').clientid 
  }
  const param = {
       SUBSCRIPTION_ID: cid,
    };
  return param;
}
export default config;
