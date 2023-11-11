import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";
const ArtistsPage = () => {
  // Manually enter the artist IDs you want to include
  const artistIds = [
    "4o6vIkdmHiEXZOesrJj3KO",
    "4BKC2HOGEqtYz2Xbgp9N1q",
    "56chSp36PsMhpQvUn1kdR3",
    "2BBnFUgIaLHqoRYPfshoPb",
    "6CGE1o9Swi1tAEa23wRTah",
    "57UiSuUcw9m0MV4bC2DukM",
    "0OUma98suuyyJqFHtjX5oU",
    "02T4vKIGje48LHpXmJoEwo",
    "5764EiAfWT26wi1CdLcnwz",
    "6FJeuwLBCX8VSTf6hp1Vc9",
    "3SMvE0QyULRkKy2Y2FLbUG",
    "6sm3nTKVNrdKN3iAo73oda",
    "03V846UE00DEjP9OaGvjKM",
    "388NKDhzE7FJ40ODmOr7aI",
    "5qvrUMJ8oO3BswrQO3w0hl",
    "0KJ7DiybcwyulZLILX3Z95",
    "0QDlkRZ349RXtT5XcwcLRP",
    "4rACOXTxSYqwgynYKJJpDX",
    "2jRxGTrLGVw35yRsElgsXj",
    "5QKGejJMncXUNUb9pUFbEf",
    "3i5MnWpawRCC9SYhLIHP7W",
    "0BoBtCqcbWMR0aa64eUuUa",
    "4bQtsYtDirwKccFyRXzwUW",
    "7zWFKl03Xg50gKryaEH0gu",
    "4BFLElxtBEdsdwGA1kHTsx",
  ];
  const [artists, setArtists] = useState([]);

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

        // Fetch information for each specified artist ID
        const artistsPromises = artistIds.map(async (artistId) => {
          const response = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          return response.data;
        });

        // Resolve all promises and get the array of artist information
        const artistsData = await Promise.all(artistsPromises);
        console.log(artistsData);
        setArtists(artistsData || []);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchData();
  }, [artistIds]);

  return (
    <div className="text-white text-center text-sm p-10 justify-center flex font-medium min-h-screen">
      <div className="min-h-screen ">
        <img
          className="heroImage heroImage  opacity-50 pb-20  "
          src={
            "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iFSJeuKqucvc/v0/1400x927.jpg"
          }
          alt=""
        />
        <h2 className="text-6xl pb-10 font-mono font-bold">HIP-HOP ARTISTS</h2>
        <ul>
          <div className="grid grid-cols-5 gap-8 justify-center">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="w-56 flex justify-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-300"
              >
                <li key={artist.id}>
                  <h3>{artist.name}</h3>
                  <Link to={`/artists/${artist.id}/albums`}>
                    <img
                      className="rounded-full h-56 w-60"
                      src={artist.images[0].url}
                    />
                  </Link>
                  {/* Button to go to the artist page on Spotify */}

                  {
                    <a
                      href={artist.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#DDC3A5] text-white p-2 mt-2 rounded-xl"
                    >
                      Artist Profile in Spotify
                    </a>
                  }
                </li>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ArtistsPage;
