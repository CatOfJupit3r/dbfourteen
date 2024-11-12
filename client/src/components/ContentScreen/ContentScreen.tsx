import PostsSection from '@components/ContentScreen/PostsSection';
import UsersToFollow from '@components/ContentScreen/UsersToFollow';
import { PostsContextProvider } from '@context/PostsContext';
import { useCurrentUser } from '@hooks/useCurrentUser';
import { FC } from 'react';

interface iContentScreen {}

const ContentScreen: FC<iContentScreen> = () => {
    const { currentUser } = useCurrentUser();

    return (
        <div className="container mx-auto min-h-screen p-4">
            <h1 className="mb-4 mt-10 text-2xl font-bold">Welcome, {currentUser?.name}</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <PostsContextProvider>
                    <PostsSection />
                </PostsContextProvider>
                <UsersToFollow />
            </div>
        </div>
    );
};

export default ContentScreen;
