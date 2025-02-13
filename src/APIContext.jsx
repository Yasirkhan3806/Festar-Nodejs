import axios from 'axios';
import { createContext, useContext } from 'react';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' }
});

// Create a Context
const ApiContext = createContext(api);

// Custom hook for easy access
export const useApi = () => useContext(ApiContext);

// Context Provider Component
export const ApiProvider = ({ children }) => {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

const token = api.get("/auth/access-token")

const TokenContext = createContext(token)

export const usetoken = ()=> useContext(TokenContext)

export const TokenProvider = ({children})=>{
<TokenContext.Provider value={token}>{children}</TokenContext.Provider>
}

