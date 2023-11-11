import { Route, Routes } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Home from "./Pages/Home";
import Footer from "./Layout/Footer";
import ArtistAlbums from "./Components/ArtistAlbums";
import AlbumTracks from "./Components/AlbumTracks";
import ArabicPlaylistsPage from "./Components/ArabicPlaylistPage";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/artists/:id/albums"
          element={<ArtistAlbums></ArtistAlbums>}
        />
        <Route
          path="/artists/:id/albums/:albumId/tracks"
          element={<AlbumTracks></AlbumTracks>}
        />
        <Route path="/about" />
        <Route
          path="/playlist"
          element={<ArabicPlaylistsPage></ArabicPlaylistsPage>}
        ></Route>
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
