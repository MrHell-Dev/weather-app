'use client';

import { createContext, useMemo, useState } from 'react';

interface SearchCountry {
    long: string;
    lat: string;
    name: string;
}
export const SearchCountryContext = createContext<{
    searchCountry: SearchCountry | undefined;
    setSearchCountry: (a: SearchCountry) => void;
}>({
    searchCountry: undefined,
    setSearchCountry: () => null,
});

export const SearchCountryProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [searchCountry, setSearchCountry] = useState<SearchCountry>();
    const valueToPass = useMemo(() => {
        return { searchCountry, setSearchCountry };
    }, [searchCountry]);
    return (
        <SearchCountryContext.Provider value={valueToPass}>
            {children}
        </SearchCountryContext.Provider>
    );
};
