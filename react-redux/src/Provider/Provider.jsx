import React from "react";

export const ReactReduxContext = React.createContext(null);

function Provider({store, children}) {
  return <ReactReduxContext.Provider value={store}>
      {children}
  </ReactReduxContext.Provider>;
}

export default Provider;
