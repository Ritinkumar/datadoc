import React, { createContext, useState, useContext, useEffect } from 'react';
import { getIpAddress } from './components/NetworkUtils';

// Create context
const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

// Global state provider component
export const GlobalStateProvider = ({ children }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isSmallScreenExtraSmall, setIsSmallScreenExtraSmall] =
        useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const [selectedRepo, setSelectedRepo] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedRepoForAction, setSelectedRepoForAction] = useState({});

    const [webSocket, setWebSocket] = useState(null);

    useEffect(() => {
        if (isUserLoggedIn) {
            const ipaddr = getIpAddress();
            const email = localStorage.getItem('ddLoginMail');
            const ws = new WebSocket(`ws://${ipaddr}:8000/ws/${email}`);
            setWebSocket(ws);
        }
    }, [isUserLoggedIn]);

    return (
        <GlobalStateContext.Provider
            value={{
                isSmallScreen,
                isSmallScreenExtraSmall,
                isUserLoggedIn,
                selectedRepo,
                selectedFile,
                selectedRepoForAction,
                webSocket,
            }}
        >
            <GlobalDispatchContext.Provider
                value={{
                    setIsSmallScreen,
                    setIsSmallScreenExtraSmall,
                    setIsUserLoggedIn,
                    setSelectedRepo,
                    setSelectedFile,
                    setSelectedRepoForAction,
                }}
            >
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};

// Custom hooks to use the global state and dispatch
export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
