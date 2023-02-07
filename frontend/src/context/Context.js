import React from "react";

export const ReducerContext = React.createContext({
    state: {},
    dispatch: () => {},
});