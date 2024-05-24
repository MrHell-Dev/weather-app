'use client';
import { useEffect } from 'react';

export default function ErrorComp({
    error,
}: Readonly<{
    error: Error & { digest?: string };
}>) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={() => window.location.reload()}>Try again</button>
        </div>
    );
}
