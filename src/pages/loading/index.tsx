import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import '../user/User.css'
interface LoadingContextType {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    loading: false,
    setLoading: () => { },
});

interface LoadingContextProviderProps {
    children: ReactNode;
}

export const LoadingContextProvider: React.FC<LoadingContextProviderProps> = ({
    children,
}) => {
    const [loading, setLoading] = useState(false);
    console.log(loading,"1")
    const handleClose=()=>{
        setLoading(false);
    }
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
            <div className="backdrop-container">
            <Backdrop
              
                open={loading}
                onClick={handleClose}
                
            >
                 <CircularProgress color="inherit" />
            </Backdrop>
            </div>
        </LoadingContext.Provider>
    );
};

export const useLoadingContext = () => useContext(LoadingContext);
