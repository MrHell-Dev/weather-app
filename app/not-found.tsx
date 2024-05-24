import { AppRoutes } from '@/src/Libs/Contants/Routes';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Looks Like You have lost</p>
            <Link href={AppRoutes.CITIES}>Return Home</Link>
        </div>
    );
}
