'use client';

import { createContext, useState } from 'react';

interface SearchCountry {
    long: string;
    lat: string;
    name: string;
}
export const SearchCountryContext = createContext<{
    searchCountry: SearchCountry | undefined;
    setSelectedCountry: (a: SearchCountry) => void;
}>({
    searchCountry: undefined,
    setSelectedCountry: () => null,
});

export const SearchCountryProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [searchCountry, setSelectedCountry] = useState<SearchCountry>();
    return (
        <SearchCountryContext.Provider
            value={{ searchCountry, setSelectedCountry }}
        >
            {children}
        </SearchCountryContext.Provider>
    );
};
