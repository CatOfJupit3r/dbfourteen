import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { FC } from 'react';

interface iPostPlaceholder {
    className?: string;
}

const PostPlaceholder: FC<iPostPlaceholder> = ({ className }) => {
    return (
        <Card className={className}>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Skeleton className="size-8" />
                    <CardTitle>
                        <Skeleton className="h-6 w-56" />
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className={'flex flex-col gap-1'}>
                <Skeleton className="h-6 w-52" />
                <Skeleton className="w-76 h-6" />
                <Skeleton className="h-6 w-12" />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
                <div className="mb-2 flex items-center">
                    <Skeleton className="mr-2 h-8 w-36" />
                    <Skeleton className="mr-2 h-8 w-36" />
                </div>
                <div className={'flex flex-col gap-3'}>
                    <Skeleton className="h-4 w-96" />
                    <Skeleton className="h-4 w-80" />
                    <Skeleton className="h-4 w-96" />
                </div>
            </CardFooter>
        </Card>
    );
};

export default PostPlaceholder;
