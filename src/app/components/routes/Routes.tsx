import { FC, lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Loading from 'containers/loading/Loading'

const Routes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          component={lazy(() => import('containers/swiping/Swiping'))}
          exact
          path="/"
        />
        <Route
          component={lazy(() => import('containers/error/Error'))}
          exact
          path="/404"
        />
        <Route
          component={lazy(() => import('containers/login/Login'))}
          exact
          path="/login"
        />
        <Route
          component={lazy(() => import('containers/register/Register'))}
          exact
          path="/register"
        />
        <Route
          component={lazy(() => import('containers/groups/Groups'))}
          exact
          path="/groups"
        />
        <Route
          component={lazy(() => import('containers/groupEdit/GroupEdit'))}
          exact
          path="/g/new"
        />
        <Route
          component={lazy(() => import('containers/group/Group'))}
          exact
          path="/g/:groupId"
        />
        <Route
          component={lazy(() => import('containers/groupEdit/GroupEdit'))}
          exact
          path="/g/:groupId/edit"
        />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  )
}

export default Routes
