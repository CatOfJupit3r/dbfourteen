import React, { createContext, ReactNode, useCallback, useContext } from 'react';

interface iLoginContext {
    userID: string | null;
    changeUserID: (user_id: string) => void;
}

const LoginContext = createContext<iLoginContext | undefined>(undefined);

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
    const [userID, setUserID] = React.useState<string>('');

    const changeUserID = useCallback(
        (user_id: string) => {
            setUserID(user_id);
        },
        [setUserID],
    );

    return (
        <LoginContext.Provider
            value={{
                userID,
                changeUserID,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useLoginContext = () => {
    const context = useContext(LoginContext);
    if (context === undefined) {
        throw new Error('useLoginContext must be used within a LoginContextProvider.');
    }
    return context as iLoginContext;
};
