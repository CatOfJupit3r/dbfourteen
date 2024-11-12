import { iUser } from '@models/User';
import APIService from '@services/APIService';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface iUsersContext {
    users: Array<iUser>;
    followUser: (userToFollow: string, user_id: string) => Promise<void>;
}

const UsersContext = createContext<iUsersContext | undefined>(undefined);

export const UsersContextProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<Array<iUser>>([]);

    const updateUsers = useCallback(async () => {
        setUsers(await APIService.getUsers());
    }, []);

    const followUser = useCallback(
        async (userToFollow: string, user_id: string) => {
            try {
                await APIService.followUser(userToFollow, user_id);
                await updateUsers();
            } catch (_) {
                toast('Failed to follow user', { type: 'error' });
            }
        },
        [updateUsers],
    );

    useEffect(() => {
        updateUsers()
            .then(() => console.log('Users updated'))
            .catch((error) => console.error('Error updating users:', error));
    }, []);

    return (
        <UsersContext.Provider
            value={{
                users,
                followUser,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export const useUsersContext = () => {
    const context = useContext(UsersContext);
    if (context === undefined) {
        throw new Error('useUsersContext must be used within a UsersContextProvider.');
    }
    return context as iUsersContext;
};
