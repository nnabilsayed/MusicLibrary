import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
const AlbumTracks = () => {
  const { id, albumId } = useParams();
  const [album, setAlbum] = useState([]);
  const [track, setTracks] = useState([]);

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

        // Fetch album details
        const albumResponse = await axios.get(
          `https://api.spotify.com/v1/albums/${albumId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Fetch album tracks
        const tracksResponse = await axios.get(
          `https://api.spotify.com/v1/albums/${albumId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setAlbum(albumResponse.data);
        setTracks(tracksResponse.data.items);
        console.log(tracksResponse.data.items);
      } catch (error) {
        console.error("Error fetching album details and tracks:", error);
      }
    };

    fetchData();
  }, [albumId]);

  return (
    <div className="flex justify-center h-screen items-center ">
      <div className="">
        <Link to={`/artists/${id}/albums`}>
          <button className="text-white font-bold p-3">
            Back to artist Profile
          </button>
        </Link>
        {album.images && album.images.length > 0 && (
          <div className="grid grid-cols-2  items-center  ">
            <img
              className="w-96 rounded-3xl "
              src={album.images[0].url}
              alt=""
            />
            {Array.isArray(track) && track.length > 0 && (
              <div className=" pl-10 grid gap-4 text-white font-mono text-2xl ">
                {track.map((track) => (
                  <a
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={track.id}
                  >
                    {track.track_number}- {track.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumTracks;
