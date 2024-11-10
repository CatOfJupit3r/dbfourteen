import { FC } from 'react';

interface iSomeComponent {}

const SomeComponent: FC<iSomeComponent> = () => {
    return <div>Hello from SomeComponent!</div>;
};

export default SomeComponent;
