'use client';
import { AppRoutes } from '@/src/Libs/Contants/Routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './index.module.scss';

function LeftNavigation() {
    const pathName = usePathname();
    const itemList = [
        { name: 'Weather', link: AppRoutes.WEATHER },
        { name: 'Cities', link: AppRoutes.CITIES },
        { name: 'TODO', link: AppRoutes.DEMO },
        { name: 'Settings', link: AppRoutes.SETTINGS },
    ];
    return (
        <ul className={styles.leftNavList}>
            <li className={styles.logoItem}>
                <Link href={AppRoutes.CITIES}>
                    <img src="/assets/images/umbrella.jpg" />
                </Link>
            </li>
            {itemList.map((item) => (
                <li
                    key={item.link}
                    className={pathName === item.link ? styles.active : ''}
                >
                    <Link href={item.link}>{item.name}</Link>
                </li>
            ))}
        </ul>
    );
}

export default LeftNavigation;
