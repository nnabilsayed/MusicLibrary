import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

const ArtistAlbums = () => {
  const { id } = useParams();
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await axios.post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({
            grant_type: "client_credentials",
            client_id: "4d16c78848294090912843c7982f540c",
            client_secret: "112cb97de624492098965ec0c2df94fa",
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const accessToken = tokenResponse.data.access_token;

        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${id}/albums`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const response2 = await axios.get(
          `https://api.spotify.com/v1/artists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setArtist(response2.data);

        const onlyAlbums = response.data.items.filter(
          (album) => album.album_type === "album"
        );

        setAlbums(onlyAlbums);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching artist albums:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="text-white text-center text-sm p-10 justify-center flex font-medium min-h-screen">
      <div className="relative">
        <h2 className="text-white text-5xl p-10 font-bold">Artist Albums</h2>

        <ul>
          <div className="relative p-10">
            {artist.images?.[0] && (
              <img
                src={artist.images[0].url}
                className="w-full h-72 object-cover pb-3"
                alt=""
              />
            )}

            {artist.images?.[0] && (
              <img
                src={artist.images[0].url}
                className="w-60 rounded-full absolute bottom-0 left-3 top-44"
                alt=""
              />
            )}
          </div>
          <div className="flex justify-center pt-10 bg">
            {loading ? (
              <span className="loading loading-ball loading-lg"></span>
            ) : (
              <>
                {albums.length > 0 ? (
                  <div className="grid grid-cols-5 gap-8 justify-center pt-20 bg">
                    {albums.map((album) => (
                      <li
                        key={album.id}
                        className="text-white text-base  rounded-2xl transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-300 "
                      >
                        <Link to={`/artists/${id}/albums/${album.id}/tracks`}>
                          <img
                            className="rounded-3xl h-56 w-60 p-2"
                            src={album.images[0].url}
                            alt=""
                          />
                          <h3 className="text-xl">{album.name}</h3>
                          <h3>{album.release_date}</h3>
                        </Link>
                      </li>
                    ))}
                  </div>
                ) : (
                  <p className="text-white text-7xl p-10">
                    Artist has no albums yet!
                  </p>
                )}
              </>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};
export default ArtistAlbums;
