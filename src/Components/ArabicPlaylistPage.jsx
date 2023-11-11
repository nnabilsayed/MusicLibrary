import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ArabicPlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);

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

        // Fetch featured playlists with the "Arabic" category
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/featured-playlists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              q: "genre:Arabic",
              type: "playlist",
              timestamp: new Date().toISOString(),
            },
          }
        );

        const playlistsData = response.data.playlists.items || [];
        setPlaylists(playlistsData);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white text-center text-sm p-10 justify-center flex font-medium min-h-screen">
      <div className="min-h-screen">
        <img
          className="heroImage heroImage  opacity-50 pb-20  "
          src={
            "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iFSJeuKqucvc/v0/1400x927.jpg"
          }
          alt=""
        />
        <h2 className="text-6xl pb-10 font-mono font-bold">
          FEATURED ARABIC PLAYLISTS
        </h2>
        <ul>
          <div className="grid grid-cols-5 gap-8 justify-center">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="w-56 flex justify-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-300"
              >
                <li key={playlist.id}>
                  <h3>{playlist.name}</h3>

                  <img
                    className="rounded-full h-56 w-60"
                    src={playlist.images[0].url}
                    alt={`Playlist image for ${playlist.name}`}
                  />

                  {/* Button to go to the playlist page on Spotify */}
                  <a
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-950 text-white p-2 mt-2"
                  >
                    Playlist on Spotify
                  </a>
                </li>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ArabicPlaylistsPage;
