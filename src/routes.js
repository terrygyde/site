import React from "react"
import { Route } from "react-router"
import { PageContainer as PhenomicPageContainer } from "phenomic"

import AuthService from './utils/AuthService'

import AppContainer from "./AppContainer"
import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import Homepage from "./layouts/Homepage"
import Post from "./layouts/Post"
import CoverPage from "./layouts/CoverPage"
import CoverApp from "./layouts/CoverApp"

const auth = new AuthService('ti7huYbvsYnxJxgkrEgRqluAPmpwZbu1', 'freesewing.eu.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const PageContainer = (props) => (
  <PhenomicPageContainer
    { ...props }
    layouts={{
      Page,
      PageError,
      Homepage,
      Post,
      CoverPage,
      CoverApp,
    }}
  />
)

export default (
    <Route component={ AppContainer }>
        <Route path="profile" component={ PageContainer } onEnter={requireAuth} />
        <Route path="*" component={ PageContainer } auth={auth} />
    </Route>
)
