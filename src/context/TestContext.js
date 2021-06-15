// import { createContext } from 'react';
import React, { useContext } from 'react';
export const TestContext = React.createContext({});
export const useTestContext = () => {
  const context = useContext(TestContext)
  return context
}
