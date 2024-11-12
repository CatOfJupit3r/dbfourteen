import ContentScreen from '@components/ContentScreen/ContentScreen';
import LoginScreen from '@components/LoginScreen/LoginScreen';
import { useLoginContext } from '@context/LoginContext';
import { FC } from 'react';

interface iMainUI {}

const MainUI: FC<iMainUI> = () => {
    const { userID } = useLoginContext();
    return userID ? <ContentScreen /> : <LoginScreen />;
};

export default MainUI;
