import { useLoginContext } from '@context/LoginContext';
import { useUsersContext } from '@context/UsersContext';
import { iUser } from '@models/User';
import { useEffect, useState } from 'react';

export const useCurrentUser = () => {
    const { userID } = useLoginContext();
    const { users } = useUsersContext();
    const [currentUser, setCurrentUser] = useState<iUser | null>(null);

    useEffect(() => {
        if (userID) {
            const user = users.find((user) => user.user_id === userID);
            setCurrentUser(user || null);
        } else {
            setCurrentUser(null);
        }
    }, [userID, users]);

    return { currentUser };
};
