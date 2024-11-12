import MainUI from '@components/MainUI';
import { LoginContextProvider } from '@context/LoginContext';
import { UsersContextProvider } from '@context/UsersContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
    return (
        <>
            <ToastContainer />
            <div>
                <UsersContextProvider>
                    <LoginContextProvider>
                        <MainUI />
                    </LoginContextProvider>
                </UsersContextProvider>
            </div>
        </>
    );
}

export default App;
