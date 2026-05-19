import { useSearchRestaurantes } from '@/api/RestauranteApi';
import LoadingButton from '@/components/LoadingButton';
import SearchResultCard from '@/components/Search/SearchResultCard';
import type { SearchForm } from '@/components/Search/SearchBar';
import SearchBar from '@/components/Search/SearchBar';
import SearchResultInfo from '@/components/Search/SearchResultInfo';
import CuisinesFilter from '@/components/Search/CuisinesFilter';
import SortOptionsDropdown from '@/components/Search/SortOptionsDropdown';
import { useState } from 'react';
import { useParams } from 'react-router';

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOptions: string;
}

export default function SearchPage() {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOptions: "bestMatch"
    });
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const { data: results, isLoading } = useSearchRestaurantes(searchState, city);

    const setSortOptions = (sortOptions: string) => {
        setSearchState((prevState) => ({ ...prevState, sortOptions, page: 1 }));
    }

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({ ...prevState, selectedCuisines, page: 1 }));
    }

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery
        }))
    }

    const resetSearch = () => {
        setSearchState((prevState) => ({ ...prevState, searchQuery: "" }))
    }

    if (isLoading)
        return <LoadingButton />

    if (!results?.data || !city) {
        return <span>¡No hay resultados!</span>
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
            <div id='cuisines_list'>
                <CuisinesFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prev) => !prev)}
                />
            </div>
            <div id='main-content' className='flex flex-col gap-5'>
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeHolder='Busqueda por cocina o nombre del restaurante'
                    onReset={resetSearch}
                />
                <div className='flex justify-between flex-col gap-3 lg:flex-row'>
                    <SearchResultInfo
                        total={results.pagination.total}
                        city={city}
                    />
                    <SortOptionsDropdown
                        sortOptions={searchState.sortOptions}
                        onChange={(value) => setSortOptions(value)}
                    />
                </div>
                {results.data.map((restaurante, key) => (
                    <SearchResultCard restaurante={restaurante} key={key} />
                ))}
            </div>
        </div>
    )
}
