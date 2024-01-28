
import { PrivateRoutes } from '@/models'
import { RoutesWithNotFound } from '@/utilities'
import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'

const Home = lazy(() => import('./Home/Home'))
const Post = lazy(() => import('./Post/Post'))
const PostItem = lazy(() => import('./Post/PostItem'))
const Profile = lazy(() => import('./Profile/Profile'))
const Dashboard = lazy(() => import('./Dashboard/Dashboard'))

function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.HOME} />} />
      <Route path={PrivateRoutes.HOME} element={<Home />} />
      <Route path={PrivateRoutes.POST} element={<Post />} />
      <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
      <Route path={`${PrivateRoutes.POST}/:id`} element={<PostItem />} />
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
    </RoutesWithNotFound>
  )
}
export default Private
