
import { TestAsyncComponent } from '@/components/Test'
import { PrivateRoutes } from '@/models'
import { RoutesWithNotFound } from '@/utilities'
import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { Test } from './Test'

const Dashboard = lazy(() => import('./Dashboard/Dashboard'))
const Home = lazy(() => import('./Home/Home'))

function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
      <Route path={PrivateRoutes.HOME} element={<Home />} />
      <Route path={PrivateRoutes.TEST} element={<Test />} />
      <Route path={PrivateRoutes.TESTASYNC} element={<TestAsyncComponent />} />
    </RoutesWithNotFound>
  )
}
export default Private
