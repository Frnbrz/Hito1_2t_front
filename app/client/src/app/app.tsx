import { ButtonAppBar } from '@/components/ButtonAppBar'
import { AuthGuard, RoleGuard } from '@/guards'
import { PrivateRoutes, PublicRoutes, Roles } from '@/models'
import { Dashboard } from '@/pages/Private'
import { Register } from '@/pages/Register'
import store from '@/redux/store'
import { ErrorBoundary, RoutesWithNotFound, SnackbarUtilitiesConfigurator } from '@/utilities'
import { SnackbarProvider } from 'notistack'
import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'


const Login = lazy(() => import('../pages/Login/Login'))
const Private = lazy(() => import('../pages/Private/Private'))
const ErrorPage = lazy(() => import('../components/ErrorPage/ErrorPage'))

function App() {
  return (
    <main>
      <SnackbarProvider>
        <SnackbarUtilitiesConfigurator />
        <Suspense fallback={<>Cargando</>}>
          <Provider store={store}>
            <BrowserRouter>
              <ButtonAppBar />
              <ErrorBoundary fallbackComponent={<ErrorPage />}>
                <RoutesWithNotFound>
                  <Route path="/" element={<Navigate to={PrivateRoutes.HOME} />} />
                  <Route path={PublicRoutes.LOGIN} element={<Login />} />
                  <Route path={PublicRoutes.REGISTER} element={<Register />} />
                  <Route element={<AuthGuard privateValidation />}>
                    <Route path={`/*`} element={<Private />} />
                  </Route>
                  <Route element={<RoleGuard role={Roles.ADMIN} />}>
                    <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
                  </Route>
                </RoutesWithNotFound>
              </ErrorBoundary>
            </BrowserRouter>
          </Provider>
        </Suspense>
      </SnackbarProvider>
    </main>
  )
}

export default App