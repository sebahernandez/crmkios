import React, { useContext, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  LOGIN,
  COMMAND_ORDER,
  REGISTRO,
  SUBSCRIPCION,
  COMENZAR, 
  PRODUCTS,
  CATEGORY,
  DASHBOARD,
  ORDERS,
  SETTINGS,
  CUSTOMERS,
  COUPONS,
  STAFF_MEMBERS,
  SITE_SETTINGS,
  SITE_HELP,
} from 'settings/constants';
import AuthProvider, { AuthContext } from 'context/auth';
import { InLineLoader } from 'components/InlineLoader/InlineLoader';
const Products = lazy(() => import('containers/Products/Products'));
const AdminLayout = lazy(() => import('containers/Layout/Layout'));
const Dashboard = lazy(() => import('containers/Dashboard/Dashboard'));
const Category = lazy(() => import('containers/Category/Category'));
const Orders = lazy(() => import('containers/Orders/Orders'));
const Settings = lazy(() => import('containers/Settings/Settings'));
const SiteSettingForm = lazy(() =>
  import('containers/SiteSettingForm/SiteSettingForm')
);
const StaffMembers = lazy(() => import('containers/StaffMembers/StaffMembers'));
const Customers = lazy(() => import('containers/Customers/Customers'));
const Coupons = lazy(() => import('containers/Coupons/Coupons'));
const Login = lazy(() => import('containers/Login/Login'));
const CommandOrder = lazy(() => import('containers/CommandOrder/CommandOrder'));
const Register = lazy(() => import('containers/RegistroForm/RegistroForm'));
const BasicForm = lazy(() => import('pages/BasicForm'));
const MakeUp = lazy(() => import('containers/MakeUp/MakeUp'));
const NotFound = lazy(() => import('containers/NotFound/NotFound'));
const HelpForm = lazy(() => import('containers/Help/Help'));

/**
 *
 *  A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 *
 */

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />

  );
}

const Routes = () => {
  
  
  return (
    <AuthProvider>
      <Suspense fallback={<InLineLoader />}>
        <Switch>
          <PrivateRoute exact={true} path={DASHBOARD}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Dashboard clientid={sessionStorage.getItem('clientid')}/>
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={PRODUCTS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Products clientid={sessionStorage.getItem('clientid')}/>
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={CATEGORY}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Category clientid={sessionStorage.getItem('clientid')} />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={ORDERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Orders clientid={sessionStorage.getItem('clientid')}/>
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={CUSTOMERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Customers clientid={sessionStorage.getItem('clientid')}/>
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={COUPONS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Coupons clientid={sessionStorage.getItem('clientid')}/>
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={SETTINGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Settings clientid={sessionStorage.getItem('clientid')}/>
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={STAFF_MEMBERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <StaffMembers clientid={sessionStorage.getItem('clientid')}/>
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={SITE_SETTINGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <SiteSettingForm clientid={sessionStorage.getItem('clientid')}/>
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          

          <PrivateRoute path={SITE_HELP}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <HelpForm clientid={localStorage.getItem('clientid')}/>
              </Suspense>
            </AdminLayout>
          </PrivateRoute>


          <Route path={COMMAND_ORDER}>
            <CommandOrder  clientid={sessionStorage.getItem('clientid')} />
          </Route>
          <Route path={LOGIN}>
            <Login />
          </Route>

          <Route path={REGISTRO}>
            <Register />
          </Route>

          {/* Solucion 2 */}
         <Route path={SUBSCRIPCION}>
            <BasicForm />
          </Route>
          
          {/* Solucion 1 */}
          <Route path={COMENZAR}>
            <MakeUp />
          </Route>
          
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AuthProvider>
  );
};

export default Routes;
