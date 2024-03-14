# Atlas SDK Adapter for React

This packages provides an `AtlasProvider` component for injecting an Atlas SDK instance and session object and a `useAtlas` hook to retrieve them.

It also exposes a collection of queries for use with `@tanstack/react-query` and a set of `useXyz` hooks to wrap these queries into one-liners for use in presentational components.

## Future Improvements

- Speakeasy supports a discriminator & might be able to generate one endpoint-wrapping method per distinct `view` value
    - need to understand how this works & how/whether Goa metadata would need to change
- Speakeasy can handle retry + backoff instead of react-query (but maybe we prefer to stay in control)
- Speakeasy "hooks" can add code pre- or post-request, e.g. to grab the useful content out of the Goa response, potentially eliminating `assertResponse`
