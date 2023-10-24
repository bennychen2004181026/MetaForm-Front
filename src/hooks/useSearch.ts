import { useState } from 'react';

export default function useSearch() {
    const [search, setSearch] = useState<string>();
    return {
        search,
        setSearch,
    };
}
