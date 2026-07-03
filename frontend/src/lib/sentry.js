import * as Sentry from "@sentry/react";

export const initSentry = () => {
  const dsn = process.env.REACT_APP_SENTRY_DSN;
  if (!dsn) return;
  Sentry.init({
    dsn,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV,
  });
};

export const reportError = (error, context) => {
  if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.captureException(error, { extra: context });
  }
};
