import PostPlaceholder from '@components/ContentScreen/PostPlaceholder';
import { FC } from 'react';

interface iLoading {}

const Loading: FC<iLoading> = () => {
    return (
        <div className="flex size-full flex-col gap-4">
            <PostPlaceholder />
            <PostPlaceholder />
            <PostPlaceholder />
            <PostPlaceholder />
            <PostPlaceholder />
            <PostPlaceholder />
            <PostPlaceholder />
            <PostPlaceholder />
            <PostPlaceholder />
            <PostPlaceholder />
        </div>
    );
};

export default Loading;
