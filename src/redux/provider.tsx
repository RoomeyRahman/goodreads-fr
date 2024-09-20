"use client";

import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

const RootComponent = ({ children }: any) => {
  return children;
};
const Provider = ({ children }: any) => {
  return (
    <ReduxProvider store={store}>
      <RootComponent>{children}</RootComponent>
    </ReduxProvider>
  );
};

export default Provider;
