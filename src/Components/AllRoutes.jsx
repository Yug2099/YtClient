// import React from "react";
// import Home from "../Pages/Home/Home";
// import { Routes, Route } from "react-router-dom";
// import Library from "../Pages/Library/Library";
// import YourVideos from "../Pages/YourVideos/YourVideos";
// import WatchHistory from "../Pages/WatchHistory/WatchHistory";
// import WatchLater from "../Pages/WatchLater/WatchLater";
// import LikedVideos from "../Pages/LikedVideos/LikedVideos";
// import VideoPage from "../Pages/VideoPage/VideoPage";
// import Channel from "../Pages/Channel/Channel";
// import Search from "../Pages/Search/Search";
// function AllRoutes({ setEditCreateChannelBtn,setVidUploadPage }) {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/library" element={<Library />} />
//       <Route path="/history" element={<WatchHistory />} />
//       <Route path="/watchlater" element={<WatchLater />} />
//       <Route path="/LikedVideos" element={<LikedVideos />} />
//       <Route path="/YourVideos" element={<YourVideos />} />
//       <Route path="/videopage/:vid" element={<VideoPage />} />
//       <Route path="/search/:searchQuery" element={<Search />} />
//       <Route
//         path="/channel/:Cid"
//         element={<Channel 
//           setVidUploadPage={setVidUploadPage}
//           setEditCreateChannelBtn={setEditCreateChannelBtn} />}
//       />
//     </Routes>
//   );
// }

// export default AllRoutes;

import React from "react";
import Home from "../Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Library from "../Pages/Library/Library";
import YourVideos from "../Pages/YourVideos/YourVideos";
import WatchHistory from "../Pages/WatchHistory/WatchHistory";
import WatchLater from "../Pages/WatchLater/WatchLater";
import LikedVideo from "../Pages/LikedVideos/LikedVideos";
import VideoPage from "../Pages/VideoPage/VideoPage";
import Channel from "../Pages/Channel/Channel";
import Subscriptions from "..//Pages/Subscriptions/Subscriptions";
import Search from "../Pages/Search/Search";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
function AllRoutes({ setEditCreateChanelBtn,setVidUploadPage }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/subscriptions" element={<Subscriptions />}/>
      <Route path="/history" element={<WatchHistory />} />
      <Route path="/watchlater" element={<WatchLater />} />
      <Route path="/likedvideo" element={<LikedVideo />} />
      <Route path="/yourvideos" element={<YourVideos />} />
      <Route path="/videopage/:vid" element={<VideoPage />} />
      <Route path="/seacrh/:searchQuery" element={<Search />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/channel/:Cid"
        element={<Channel 
          setVidUploadPage={setVidUploadPage}
          setEditCreateChanelBtn={setEditCreateChanelBtn} />}
      />
    </Routes>
  );
}

export default AllRoutes;