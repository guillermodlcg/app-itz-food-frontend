import { useSearchRestaurantes } from '@/api/RestauranteApi';
import LoadingButton from '@/components/LoadingButton';
import SearchResultCard from '@/components/Search/SearchResultCard';
import type { SearchForm } from '@/components/Search/SearchBar';
import SearchBar from '@/components/Search/SearchBar';
import SearchResultInfo from '@/components/Search/SearchResultInfo';
import { useState } from 'react';
import { useParams } from 'react-router';

export type SearchState ={
    searchQuery: string;
}

export default function SearchPage() {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({searchQuery: "" });
    const { data: results, isLoading } = useSearchRestaurantes(searchState, city);

    const setSearchQuery = (searchFormData: SearchForm)=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: searchFormData.searchQuery
        }))
    }

    const resetSearch = ()=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: ""
        }))
    }

    if(isLoading)
         <LoadingButton/>
    if(!results?.data || !city){
        return <span>¡No hay resultados!</span>
    }

    return (
       <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
        <div id='cuisines_list'>Insertar tipos de cocinas aqui</div>
        <div id='main-content'
        className='flex flex-col gap-5'>
            <SearchBar 
            searchQuery={searchState.searchQuery}
            onSubmit={setSearchQuery}
            placeHolder='Busqueda por cocina o nombre del restaurante'
            onReset={resetSearch}/>

            <SearchResultInfo
            total={results.pagination.total}
            city={city}
            />
            {
                results.data.map((restaurante, key)=>(
                    <SearchResultCard restaurante={restaurante} key={key}/>
                ))
            }
        </div>
       </div>
    )
}
