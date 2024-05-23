import LeftNavigation from '@/src/Components/atoms/LeftNavigation';
import SearchBar from '@/src/Components/molecules/SearchBar';
import { SearchCountryProvider } from '@/src/Libs/Context/SearchCountry';
import { Container } from 'react-bootstrap';
import styles from './index.module.scss';

interface ILayoutProps {
    children: React.ReactNode;
}
function Layout(props: Readonly<ILayoutProps>) {
    const { children } = props;
    return (
        <Container className={styles.layoutWrapper}>
            <div className={styles.leftSectionWrapper}>
                <LeftNavigation />
            </div>
            <SearchCountryProvider>
                <div className={styles.rightSectionWrapper}>
                    <SearchBar />
                    {children}
                </div>
            </SearchCountryProvider>
        </Container>
    );
}

export default Layout;
