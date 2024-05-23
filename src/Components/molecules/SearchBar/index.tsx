'use client';

import { WeatherApiManager } from '@/src/Libs/ApiManager/Service/WeatherApiManager';
import { AppRoutes } from '@/src/Libs/Contants/Routes';
import { SearchCountryContext } from '@/src/Libs/Context/SearchCountry';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from './index.module.scss';

function SearchBar() {
    const [searchItem, setSearchItem] = useState<string>();
    const [itemList, setItemList] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);
    const { setSelectedCountry } = useContext(SearchCountryContext);
    const router = useRouter();
    const handleSearch = async () => {
        const res = await new WeatherApiManager().fetchCityDataApi({
            name: searchItem,
        });
        if (res.status && res?.data?.results.length > 0) {
            setItemList(res?.data?.results);
            setShowDropDown(true);
        }
    };

    const handleCitySelect = (item: any) => {
        setSelectedCountry({
            lat: item?.latitude,
            long: item?.longitude,
            name: item?.name,
        });
        setShowDropDown(false);
        router.push(AppRoutes.WEATHER);
    };

    return (
        <div className={styles.searchBarWrapper}>
            <input
                type="seach"
                placeholder="Search for Citites"
                value={searchItem}
                onChange={(e) => {
                    const regex = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
                    if (!e.target.value || regex.test(e.target.value)) {
                        setSearchItem(e.target.value);
                        setItemList([]);
                    }
                }}
            />
            {searchItem && <button onClick={handleSearch}>Search</button>}
            <Dropdown show={showDropDown}>
                <Dropdown.Menu>
                    {itemList.map((item: any) => (
                        <Dropdown.Item
                            onClick={() => handleCitySelect(item)}
                            key={item?.id}
                        >
                            <h5>{item.name}</h5>
                            <span>
                                {item?.admin1},{item?.admin2}
                            </span>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default SearchBar;
