import * as React from 'react';
export { Fragment, cloneElement, createContext, createElement, forwardRef, isValidElement, useContext, useMemo, useRef, useState } from 'react';
export { useSyncExternalStore } from 'use-sync-external-store/shim/index.js';

// React.useInsertionEffect is not available in React <18
// This hack fixes a transpilation issue on some apps
const useBuiltinInsertionEffect = React["useInsertion" + "Effect"];

// Copied from:
// https://github.com/facebook/react/blob/main/packages/shared/ExecutionEnvironment.js
const canUseDOM = !!(
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
);

// Copied from:
// https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.ts
// "React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser."
const useIsomorphicLayoutEffect = canUseDOM
  ? React.useLayoutEffect
  : React.useEffect;

// useInsertionEffect is already a noop on the server.
// See: https://github.com/facebook/react/blob/main/packages/react-server/src/ReactFizzHooks.js
const useInsertionEffect =
  useBuiltinInsertionEffect || useIsomorphicLayoutEffect;

// Userland polyfill while we wait for the forthcoming
// https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
// Note: "A high-fidelity polyfill for useEvent is not possible because
// there is no lifecycle or Hook in React that we can use to switch
// .current at the right timing."
// So we will have to make do with this "close enough" approach for now.
const useEvent = (fn) => {
  const ref = React.useRef([fn, (...args) => ref[0](...args)]).current;
  // Per Dan Abramov: useInsertionEffect executes marginally closer to the
  // correct timing for ref synchronization than useLayoutEffect on React 18.
  // See: https://github.com/facebook/react/pull/25881#issuecomment-1356244360
  useInsertionEffect(() => {
    ref[0] = fn;
  });
  return ref[1];
};

export { useEvent, useInsertionEffect, useIsomorphicLayoutEffect };
