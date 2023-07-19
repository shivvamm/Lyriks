import { useDispatch, useSelector } from 'react-redux';

import {Error, Loader , SongCard } from '../components';
import { genres } from '../assets/constants';
import { selectGenreListId } from '../redux/features/playerSlice'
import {  useGetSongsByGenreQuery } from '../redux/services/shazamCore'



const Discover = () =>{
    const dispatch = useDispatch();
    const { activeSong , isPlaying, genreListId} = useSelector((state) => state.player);

     const { data, isFteching, error } =  useGetSongsByGenreQuery(genreListId || 'POP');
const genresTitle = genres.find(({ value }) => value === genreListId)?.title;

if(isFteching) return < Loader title="Loading songs...." />;

if(error) return <Error/>;

return(
<div className="flex flex-col">
    <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10 ">
        <h2 className="font-bold text-3xl text-white text-left">Discover{genresTitle}</h2>
        <select 
        onChange={(e)=> dispatch(selectGenreListId(e.target.value))}
        value={genreListId || 'pop'}
        className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >{genres.map((genre) => <option>{genre.title}</option>)}
        </select>
    </div>
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song,i) => (
            <SongCard 
            key={song.key}
            song={song}
            iplaying = {isPlaying}
            activeSong={activeSong}
            data ={data}
            i={i}
            />
        ))}
    </div>
</div>
);
}
export default Discover;
