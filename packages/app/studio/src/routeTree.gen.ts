/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const SessionIndexLazyImport = createFileRoute('/session/')()
const SessionNewLazyImport = createFileRoute('/session/new')()
const FacilitiesLatestLazyImport = createFileRoute('/facilities/latest')()
const FacilitiesFacilityIdLazyImport = createFileRoute(
  '/facilities/$facilityId',
)()
const ExperimentsVariantsLazyImport = createFileRoute('/experiments/variants')()
const ExperimentsShadowRootLazyImport = createFileRoute(
  '/experiments/shadow-root',
)()
const ExperimentsSdkLazyImport = createFileRoute('/experiments/sdk')()
const ExperimentsFrameLazyImport = createFileRoute('/experiments/frame')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const SessionIndexLazyRoute = SessionIndexLazyImport.update({
  path: '/session/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/session/index.lazy').then((d) => d.Route))

const SessionNewLazyRoute = SessionNewLazyImport.update({
  path: '/session/new',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/session/new.lazy').then((d) => d.Route))

const FacilitiesLatestLazyRoute = FacilitiesLatestLazyImport.update({
  path: '/facilities/latest',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/facilities/latest.lazy').then((d) => d.Route),
)

const FacilitiesFacilityIdLazyRoute = FacilitiesFacilityIdLazyImport.update({
  path: '/facilities/$facilityId',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/facilities/$facilityId.lazy').then((d) => d.Route),
)

const ExperimentsVariantsLazyRoute = ExperimentsVariantsLazyImport.update({
  path: '/experiments/variants',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/experiments/variants.lazy').then((d) => d.Route),
)

const ExperimentsShadowRootLazyRoute = ExperimentsShadowRootLazyImport.update({
  path: '/experiments/shadow-root',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/experiments/shadow-root.lazy').then((d) => d.Route),
)

const ExperimentsSdkLazyRoute = ExperimentsSdkLazyImport.update({
  path: '/experiments/sdk',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/experiments/sdk.lazy').then((d) => d.Route),
)

const ExperimentsFrameLazyRoute = ExperimentsFrameLazyImport.update({
  path: '/experiments/frame',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/experiments/frame.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/experiments/frame': {
      preLoaderRoute: typeof ExperimentsFrameLazyImport
      parentRoute: typeof rootRoute
    }
    '/experiments/sdk': {
      preLoaderRoute: typeof ExperimentsSdkLazyImport
      parentRoute: typeof rootRoute
    }
    '/experiments/shadow-root': {
      preLoaderRoute: typeof ExperimentsShadowRootLazyImport
      parentRoute: typeof rootRoute
    }
    '/experiments/variants': {
      preLoaderRoute: typeof ExperimentsVariantsLazyImport
      parentRoute: typeof rootRoute
    }
    '/facilities/$facilityId': {
      preLoaderRoute: typeof FacilitiesFacilityIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/facilities/latest': {
      preLoaderRoute: typeof FacilitiesLatestLazyImport
      parentRoute: typeof rootRoute
    }
    '/session/new': {
      preLoaderRoute: typeof SessionNewLazyImport
      parentRoute: typeof rootRoute
    }
    '/session/': {
      preLoaderRoute: typeof SessionIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  ExperimentsFrameLazyRoute,
  ExperimentsSdkLazyRoute,
  ExperimentsShadowRootLazyRoute,
  ExperimentsVariantsLazyRoute,
  FacilitiesFacilityIdLazyRoute,
  FacilitiesLatestLazyRoute,
  SessionNewLazyRoute,
  SessionIndexLazyRoute,
])

/* prettier-ignore-end */
