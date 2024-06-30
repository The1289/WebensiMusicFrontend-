import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/system";
import { fetchAllArtists } from '../redux/actions/artist';


const MediaSlide = () => {
    const dispatch = useDispatch();
    const artists = useSelector((state) => state.artists.artists);
    const isLoadingArtists = useSelector((state) => state.artists.isLoading);

    const theme = useTheme();
    useEffect(() => {
        dispatch(fetchAllArtists());
    }, [dispatch]);

    if (isLoadingArtists) {
        // Handle loading state for both songs and playlists
        return <p>Loading...</p>
    }




    return (
        <div>

            {/* Artist Swiper  */}
            <div className="ArtistsPage">
                <h2>Artists</h2>
                
                <div className="ArtistsPageContent">
                    {artists.map((artist) => (
                        <div className="artistsPageArtists" key={artist?._id}>

                            <Link to={`/artist/${artist?.name}/${artist?._id}`} className="artist-link" style={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
                                <div className="artistsPageArtistsPrfile_Name">
                                    <img
                                        src={artist?.profilePhoto}
                                        alt={artist?.name}
                                        className="artist-image"
                                    />

                                    <h4>{artist?.name} ( {artist?.role} )  </h4>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MediaSlide;
