import { useEffect, useState } from 'react';
import { withStyle, useStyletron } from 'baseui';
import { Grid, Row, Col as Column } from 'components/FlexBox/FlexBox';
import RadialBarChart from 'components/Widgets/RadialBarChart/RadialBarChart';
import LineChart from 'components/Widgets/LineChart/LineChart';
import ColumnChart from 'components/Widgets/ColumnChart/ColumnChart';
import DonutChart from 'components/Widgets/DonutChart/DonutChart';
import GraphChart from 'components/Widgets/GraphChart/GraphChart';
import StickerCard from 'components/Widgets/StickerCard/StickerCard';
import { gql,ApolloClient, InMemoryCache  } from '@apollo/client';
import { Revenue } from 'assets/icons/Revenue';
import { Refund } from 'assets/icons/Refund';
import { CoinIcon } from 'assets/icons/CoinIcon';
import { CartIconBig } from 'assets/icons/CartIconBig';
import { UserIcon } from 'assets/icons/UserIcon';
import { DeliveryIcon } from 'assets/icons/DeliveryIcon'; 


var Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 574px)': {
    marginBottom: '30px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

var client = new ApolloClient({
  uri: 'https://cuddly-hog-22.hasura.app/v1/graphql',
  headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': `kxUJ2vmT0kihpyf9x7MDVAj1OoURuQzMXhN9O8JuLvMhVk05aSIKL4IdQZ4WXNDN`},
  cache: new InMemoryCache()
});

// 0
var GET_MESES= gql`
query dashboard_titulo_anual($cid: String!) { 
  dashboard_titulo_anual(where: {clientid: {_eq: $cid}}) {
    meses
  }
}
`;





// 1
var GET_VISITAS_MES= gql`
query dashboard_visitas_view_cid($cid: String!) { 
  dashboard_visitas_view_cid(where: {clientid: {_eq: $cid}}) {
    data
  }
}
`;

// 2
var GET_OBJETIVOS= gql`
    query pedidos_objetivo_view($cid: String!) { 
      pedidos_objetivo_view(where: {clientid: {_eq: $cid}}) {
        total
        objetivo
      }
    }
`;
// 3
var GET_TOTAL_INGRESOS_ANTERIOR= gql`
query  function_total_ordenes_anterior($cid: String!) { 
  function_total_ordenes_anterior_aggregate(args: {cid: $cid}) {
  aggregate {
    sum {
      total
    }
   }
  }
}
`;

var GET_TOTAL_INGRESOS= gql`
query  function_total_ordenes($cid: String!) { 
  function_total_ordenes_aggregate(args: {cid: $cid}) {
  aggregate {
    sum {
      total
    }
   }
  }
}
`;

// 4

var GET_TOTAL_ORDENES_ANTERIOR= gql`
query  function_total_ordenes_anterior($cid: String!) { 
  function_total_ordenes_anterior_aggregate(args: {cid: $cid}) {
  aggregate {
    count(columns: id)
  }
 }
}
`;

var GET_TOTAL_ORDENES= gql`
query  function_total_ordenes($cid: String!) { 
  function_total_ordenes_aggregate(args: {cid: $cid}) {
  aggregate {
    count(columns: id)
  }
 }
}
`;
// 5
var GET_CLIENTES_NUEVOS_ANTERIOR= gql`
   query  function_cliente_nuevo_anterior($cid: String!) { 
    function_cliente_nuevo_anterior_aggregate(args: {cid: $cid}) {
    aggregate {
      count(columns: id)
    }
  }
}
`;
var GET_CLIENTES_NUEVOS= gql`
   query  function_cliente_nuevo($cid: String!) { 
    function_cliente_nuevo_aggregate(args: {cid: $cid}) {
    aggregate {
      count(columns: id)
    }
  }
}
`;
// 6 ok implementado

var GET_ENTREGA_TOTAL_ANTERIOR= gql`
  query function_ventas_anterior($clientid: String!) {
    function_ventas_anterior_aggregate(args: {cid: $clientid}) {
      aggregate {
        sum {
          total
      }
    }
  }
  }
`;
var GET_ENTREGA_TOTAL= gql`
  query function_ventas($clientid: String!) {
    function_ventas_aggregate(args: {cid: $clientid}) {
      aggregate {
        sum {
          total
      }
    }
  }
  }
`;

var GET_REEMBOLSOS= gql`
query dashboard_reembolsos_view_cid($clientid: String!) {
  dashboard_reembolsos_view_cid(where: {clientid: {_eq: $clientid}}) {
    sum
    estado
  }
}
`;
// 8
var GET_TOTAL_ANUAL= gql`
query  dashboard_total_anual($clientid: String! ) {
  dashboard_total_anual(where: {clientid: {_eq: $clientid}}) {
      total
    }
  }`;

// 9
var GET_DEVOLUCION_MES= gql`
query  dashboard_devoluciones_mes($clientid: String! ) {
  dashboard_devoluciones_mes(where: {clientid: {_eq: $clientid}}) {
    dia
    total
  }
 }`;
 


function Dashboard({clientid}) {
  
  var [ts, setTs] = useState(0);
  var [tm, setTm] = useState(0);
  var [categoriesMeses, setCategoriesMeses] = useState([]);
  var [serieVisitas, setSerieVisitas] = useState([]);
  var [serieDia, setSerieDia] = useState([null]);
  var [serieDiaTotal, setSerieDiaTotal] = useState([null]);
  var [serieTotalAnual, setSerieTotalAnual] = useState([null]);
  var [totalIngresosAnterior, setTotalIngresosAnterior] = useState(0);
  var [totalIngresos, setTotalIngresos] = useState(0);
  var [flagTotalIngresos, setFlagTotalIngresos] = useState('down');
  var [totalOrdenesAnterior, setTotalOrdenesAnterior] = useState(0);
  var [totalOrdenes, setTotalOrdenes] = useState(0);
  var [flagTotalOrdenes, setFlagTotalOrdenes] = useState('down');
  var [clienteNuevoAnterior, setClienteNuevoAnterior] = useState(0);
  var [clienteNuevo, setClienteNuevo] = useState(0);
  var [flagClienteNuevo, setFlagClienteNuevo] = useState('down');
  var [totalEntregaAnterior, setTotalEntregaAnterior] = useState(0);
  var [totalEntrega, setTotalEntrega] = useState(0);
  var [totalReembolsos, setTotalReembolsos] = useState(0);
  var [totalIngresoReembolsos, setTotalIngresoReembolsos] = useState(0);
  var [flagTotalEntrega, setFlagTotalEntrega] = useState('down');
  
 

  useEffect(() => {
    
       // cargaObjetivos();
       if(ts>0){
          cargaMeses();
          cargaVisitas();
          cargaTotalIngresosAnterior();
          cargaTotalIngresos();
          cargaTotalOrdenesAnterior();
          cargaTotalOrdenes();
          cargaClienteNuevoAnterior();
          cargaClienteNuevo();
          cargaTotalEntregaAnterior(); 
          cargaTotalEntrega(); 
          cargaReembolsos();
          cargaDevoluciones();
          cargaTotalAnual();   
      }
    
  }, [])

  if(sessionStorage.getItem('clientid')===null){
    window.location.href = '/login';
    window.open('/login');
  }
 

  async function cargaObjetivos() {
    
    await client.query({
          query: GET_OBJETIVOS,
          variables: {cid: clientid}
      })
      .then(result => { 
        if(result  && result.data  && result.data.pedidos_objetivo_view  && result.data?.pedidos_objetivo_view?.length>1)
        setTs(result.data.pedidos_objetivo_view[1].total)
       else return 0
    })
    .catch(err => {
      console.log(err);
    }); 
    
    await client.query({
      query: GET_OBJETIVOS,
      variables: {cid: clientid}
    })
    .then(result => { 
     if(result  && result.data && result.data.pedidos_objetivo_view && result.data.pedidos_objetivo_view.length>1)
     setTm(result.data.pedidos_objetivo_view[0].total)
      else return 0
    })
    .catch(err => {
      console.log(err);
    });  
 

}
async function cargaMeses() {

  var titulos = await client.query({
    query: GET_MESES,
    variables: {cid: clientid}
  })
  .then(result => { 
    if(result && result.data  && result.data.dashboard_titulo_anual  && result.data.dashboard_titulo_anual.length>0)
        return result.data.dashboard_titulo_anual[0].meses;
     else return [];   
    
  })
  .catch(err => {
    console.log(err);
  });
   
  setCategoriesMeses(titulos)  
} 

async function cargaVisitas() {
 
  var visitas = await client.query({
    query: GET_VISITAS_MES,
    variables: {cid: clientid}
  })
  .then(result => { 
    if(result !== null && result.data !== null && result.data.dashboard_visitas_view_cid !== null && result.data.dashboard_visitas_view_cid.length>0)
       return result.data.dashboard_visitas_view_cid[0].data
    else return 0;
    
  }).catch(err => {
    console.log(err);
  });
  if(visitas!==undefined && visitas!==0)
  setSerieVisitas(visitas); 
}

async function cargaTotalIngresosAnterior() {

  var cn = await client.query({
    query: GET_TOTAL_INGRESOS_ANTERIOR,
    variables: {cid: clientid}
  })
  .then(result => { 
    if(result !== null && result.data !== null && result.data.function_total_ordenes_anterior_aggregate !== null &&  result.data.function_total_ordenes_anterior_aggregate.aggregate.sum!==null)
    return result.data.function_total_ordenes_anterior_aggregate.aggregate.sum.total;
    else return 0
  }).catch(err => {
    console.log(err);
  });

  setTotalIngresosAnterior(cn); 
}

async function cargaTotalIngresos() {
 
  var cn = await client.query({
    query: GET_TOTAL_INGRESOS,
    variables: {cid: clientid}
  })
  .then(result => { 
    if(result !== null && result.data !== null && result.data.function_total_ordenes_aggregate !== null && result.data.function_total_ordenes_aggregate.aggregate.sum!==null)
    return result.data.function_total_ordenes_aggregate.aggregate.sum.total;
    else return 0

  }).catch(err => {
    console.log(err);
  });

  if(cn!==undefined) 
  setTotalIngresos(cn); 
  if(totalIngresosAnterior <= totalIngresos){
    setFlagTotalIngresos("up")
  }else{
    setFlagTotalIngresos("down");
  }
}

async function cargaTotalOrdenesAnterior() {
 
  var cn = await client.query({
    query: GET_TOTAL_ORDENES_ANTERIOR,
    variables: {cid: clientid}
  })
  .then(result => { 
    if(result !== null && result.data !== null && result.data.function_total_ordenes_anterior_aggregate !== null && result.data.function_total_ordenes_anterior_aggregate.aggregate!=null)
    return result.data.function_total_ordenes_anterior_aggregate.aggregate.count;
    return 0

  }).catch(err => {
    console.log(err);
  });

  setTotalOrdenesAnterior(cn); 
}

async function cargaTotalOrdenes() {
 
  var cn = await client.query({
    query: GET_TOTAL_ORDENES,
    variables: {cid: clientid}
  })
  .then(result => { 
    if(result !== null && result.data !== null && result.data.function_total_ordenes_aggregate !== null && result.data.function_total_ordenes_aggregate.aggregate!=null)
     return result.data.function_total_ordenes_aggregate.aggregate.count;
    else return 0 
  }).catch(err => {
    console.log(err);
  });

  setTotalOrdenes(cn); 
  if(totalOrdenesAnterior <= totalOrdenes){
    setFlagTotalOrdenes("up")
  }else{
    setFlagTotalOrdenes("down");
  }
}

async function cargaClienteNuevoAnterior() {
 
  var cn = await client.query({
    query: GET_CLIENTES_NUEVOS_ANTERIOR,
    variables: {cid: clientid}
  })
  .then(result => { 
    if(result !== null && result.data !== null && result.data.function_cliente_nuevo_anterior_aggregate !== null)
    return result.data.function_cliente_nuevo_anterior_aggregate.count;
    else return 0
  }).catch(err => {
    console.log(err);
  });

  setClienteNuevoAnterior(cn); 
}

async function cargaClienteNuevo() {
 
  var cn = await client.query({
    query: GET_CLIENTES_NUEVOS,
    variables: {cid: clientid}
  })
  .then(result => { 
    if(result !== null && result.data !== null && result.data.function_cliente_nuevo_aggregate !== null )
    return result.data.function_cliente_nuevo_aggregate.count;
    else return 0
  }).catch(err => {
    console.log(err);
  });
  
  setClienteNuevo(cn); 
  if(clienteNuevoAnterior <= clienteNuevo){    
    setFlagClienteNuevo("up");
  }else{
    setFlagClienteNuevo("down");
  }
  
}

async function cargaTotalEntregaAnterior() {
 
  var carga_total = await client.query({
    query: GET_ENTREGA_TOTAL_ANTERIOR,
    variables: {clientid: clientid}
  })
  .then(result => { 
    if(result.data.function_ventas_anterior_aggregate.aggregate.sum!==null)
    return result.data.function_ventas_anterior_aggregate.aggregate.sum.total;
    else return 0
  }).catch(err => {
    console.log(err);
  });

  if(carga_total!==undefined)
  setTotalEntregaAnterior(carga_total); 
}
// Total Entrega
async function cargaTotalEntrega() {
 
  var carga_total = await client.query({
    query: GET_ENTREGA_TOTAL,
    variables: {clientid: clientid}
  })
  .then(result => { 
    console.log('total-entrega >>>' + result.data.function_ventas_aggregate.aggregate.sum.total)
    if(result.data.function_ventas_aggregate.aggregate.sum!==null)
    return result.data.function_ventas_aggregate.aggregate.sum.total;
    else return 0

  }).catch(err => {
    console.log(err);
  });

  if(carga_total!==undefined)
  setTotalEntrega(carga_total); 
  if(totalEntregaAnterior <= totalEntrega){
    setFlagTotalEntrega("up")
  }else{
    setFlagTotalEntrega("down");
  }
 
}

async function cargaReembolsos(){

  var reembolsos = await client.query({
    query: GET_REEMBOLSOS, 
    variables: { clientid: clientid }}
  )
  .then(result => { 
    if(result.data.dashboard_reembolsos_view_cid.length>0 
      && result.data.dashboard_reembolsos_view_cid[0].estado==="Cancelado")
    return result.data.dashboard_reembolsos_view_cid[0].sum;
    else return 0


  }).catch(err => {
    console.log(err);
  });
  if(reembolsos!==undefined)
  setTotalReembolsos(reembolsos); 

  let ingreso = await client.query({
    query: GET_REEMBOLSOS,
    variables: { clientid: clientid }
  })
  .then(result => { 
    if(result.data.dashboard_reembolsos_view_cid.length>1 
      && result.data.dashboard_reembolsos_view_cid[1].estado==="Entregado")
    return result.data.dashboard_reembolsos_view_cid[1].sum;
    else return 0
  }).catch(err => {
    console.log(err);
  });
  if(ingreso!==undefined)
  setTotalIngresoReembolsos(ingreso);  
} 

async function cargaDevoluciones() {
 
  var dia = await client.query({
    query: GET_DEVOLUCION_MES, 
    variables: { clientid: clientid }}
  )
  .then(result => { 
    if(result !== null && result.data !== null && result.data.dashboard_devoluciones_mes !== null && result.data.dashboard_devoluciones_mes.length>0)
      return result.data.dashboard_devoluciones_mes[0].dia;
    else return 0;
  }).catch(err => {
    console.log(err);
  });
  console.log('line:535',dia)
  if(dia){
    setSerieDia(dia); 
  }
  
  var total = await client.query({
    query: GET_DEVOLUCION_MES,
    variables: { clientid: clientid }
  })
  .then(result => {  
    if(result !== null && result.data !== null && result.data.dashboard_devoluciones_mes !== null &&  result.data.dashboard_devoluciones_mes.length>0)
    return result.data.dashboard_devoluciones_mes[0].total;
    else return 0;
  }).catch(err => {
    console.log(err);
  });
  if(total!==undefined)
  setSerieDiaTotal(total); 
}

async function cargaTotalAnual() {
 
  var carga_total = await client.query({
    query: GET_TOTAL_ANUAL,
    variables: { clientid: clientid }
  })
  .then(result => { 
  if(result !== null && result.data !== null && result.data.dashboard_total_anual !== null && result.data.dashboard_total_anual.length>0)
    return result.data.dashboard_total_anual[0].total;
    else return[] ;

  }).catch(err => {
    console.log(err);
  });
  
  setSerieTotalAnual(carga_total); 
}

  // Setting Objetivos mensuales
  var om = 10000000;
  var os = 2500000;
  
  var [css] = useStyletron();
  var mb30 = css({
    '@media only screen and (max-width: 990px)': {
      marginBottom: '16px',
    },
  });

  return (

    <Grid fluid={true}>
      <Row>
        <Col md={5} lg={4} sm={6}>
          <RadialBarChart
            widgetTitle="Objetivo"
            series={[(ts/os)*100, (tm/om)*100]}
            label={['$'+ ts!==undefined?ts:0  , '$'+ tm!==undefined?tm:0   ]}
            colors={['#03D3B5', '#666d92']}
            helperText={['Objetivos semanales', 'Objetivos mensuales']}
          />
        </Col>
        <Col md={7} lg={8} sm={6}>
          <LineChart
            widgetTitle="Estadísticas de visitas"
            color={['#03D3B5']}
            categories={categoriesMeses}
            seriesName="Visitantes únicos"
            series={serieVisitas}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={3} sm={6} xs={12} className={mb30}>
          <StickerCard
            title="Los ingresos totales"
            subtitle="(Últimos 30 días)"
            icon={<CoinIcon />}
            price={['$' + (totalIngresos*1.19)]}
            indicator={flagTotalIngresos}
            indicatorText="Ingresos arriba"
            note="(30 días anteriores)"
            link="/orders"
            linkText="Todos los detalles"
          />
        </Col>
        <Col lg={3} sm={6} xs={12} className={mb30}>
          <StickerCard
            title="Pedidos Totales"
            subtitle="(Últimos 30 días)"
            icon={<CartIconBig />}
            price={[ + totalOrdenes]}
            indicator={flagTotalOrdenes}
            indicatorText="Ordenes Abajo"
            note="(30 días anteriores)"
            link="/orders"
            linkText="Todos los detalles"
          />
        </Col>
        <Col lg={3} sm={6} xs={12}>
          <StickerCard
            title="Nuevo Cliente"
            subtitle="(Últimos 30 días)"
            icon={<UserIcon />}
            price={['$' + clienteNuevo]}
            indicator={flagClienteNuevo}
            indicatorText="Cliente Arriba"
            note="(30 días anteriores)"
            link="/customers"
            linkText="Todos los detalles"
          />
        </Col>
        <Col lg={3} sm={6} xs={12}>
          <StickerCard
            title="Entrega Totales"
            subtitle="(Últimos 30 días)"
            icon={<DeliveryIcon />}
            price={['$' + totalEntrega]}
            indicator={flagTotalEntrega}
            indicatorText="Entrega hasta"
            note="(30 días anteriores)"
            link="/orders"
            linkText="Todos los detalles"
          />
        </Col>
      </Row>

      <Row>
     

        <Col md={5} lg={4}>
          <DonutChart
            widgetTitle="Objetivo"
            series={[totalReembolsos,totalIngresoReembolsos]}
            labels={['Ingresos de hoy', 'Reembolso de hoy']}
            colors={['#03D3B5', '#666d92']}
            helperText={['Objetivos semanales', 'Objetivos mensuales']}
            icon={[<Revenue />, <Refund />]}
            prefix="$"
          />
        </Col>
        <Col md={7} lg={8}>
          <GraphChart
            widgetTitle="Devoluciones por Mes"
            colors={['#03D3B5']}
            series={serieDiaTotal}
            labels={serieDia}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} lg={12}>
          <ColumnChart
            widgetTitle="Historial de ventas"
            colors={['#03D3B5']}
            prefix="$"
            totalValue="1,92,564"
            position="up"
            percentage="1.38%"
            text="Más que el año pasado"
            series={serieTotalAnual}
            categories={categoriesMeses}
          />
        </Col>
      </Row>
      {/* <Row>
        <Col md={5} lg={4}>
          <GradiantGraphChart
            colors={['#03D3B5']}
            series={[25, 30, 14, 30, 55, 60, 48]}
            labels={[
              '2019-05-12',
              '2019-05-13',
              '2019-05-14',
              '2019-05-15',
              '2019-05-16',
              '2019-05-17',
              '2019-05-18',
            ]}
            topRowTitle="Rendimiento"
            bottomRowData={[
              {
                label: 'Beneficio de la semana pasada',
                valueText: '+29.7%',
                value: 29.7,
                color: '#03D3B5',
              },
              {
                label: 'Esta semana pérdidas',
                valueText: '-53.4%',
                value: 53.4,
                color: '#FC747A',
              },
            ]}
          />
        </Col>

        <Col md={7} lg={8}>
          <MapWidget
            data={[
              {
                name: 'Williamburgs',
                value: 69922,
                color: '#2170FF',
              },
              {
                name: 'Brooklyn',
                value: 41953,
                color: '#29CAE4',
              },
              {
                name: 'New York',
                value: 23307,
                color: '#666D92',
              },
              {
                name: 'Jersey City',
                value: 20200,
                color: '#03D3B5',
              },
            ]}
            totalText="Total de clientes"
          />
        </Col>
      </Row> */}
    </Grid>
  );
};

export default Dashboard;
