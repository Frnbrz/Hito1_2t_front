import '@/App.css'
import { ButtonAppBar } from '@/components/ButtonAppBar'
import { AuthGuard, RoleGuard } from '@/guards'
import { PrivateRoutes, PublicRoutes, Roles } from '@/models'
import { Dashboard } from '@/pages/Private'
import store from '@/redux/store'
import { ErrorBoundary, RoutesWithNotFound } from '@/utilities'
import { SnackbarProvider } from 'notistack'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { Register } from './pages/Register'
import { SnackbarUtilitiesConfigurator } from './utilities/snackbarManager'

const Login = lazy(() => import('./pages/Login/Login'))
const Private = lazy(() => import('./pages/Private/Private'))

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <SnackbarUtilitiesConfigurator />
        <Suspense fallback={<>Cargando</>}>
          <Provider store={store}>
            <BrowserRouter>
              <ButtonAppBar />
              <ErrorBoundary fallbackComponent={<h2>Hubo un error</h2>}>
                <RoutesWithNotFound>
                  <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
                  <Route path={PublicRoutes.LOGIN} element={<Login />} />
                  <Route path={PublicRoutes.REGISTER} element={<Register />} />
                  <Route element={<AuthGuard privateValidation />}>
                    <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
                  </Route>
                  <Route element={<RoleGuard rol={Roles.ADMIN} />}>
                    <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
                  </Route>
                </RoutesWithNotFound>
              </ErrorBoundary>
            </BrowserRouter>
          </Provider>
        </Suspense>
      </SnackbarProvider>
    </div>
  )
}

export default App
