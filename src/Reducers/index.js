import { combineReducers } from "redux";

import authReducer from "./auth";
import channelReducers from "./channel";
import currentUserReducer from "./currentUser";
import videoReducer from "./Video";
import likedVideoReducer from "./likedVideos";
import watchLaterReducer from "./watchLater";
import commentReducer from "./comments";
import HistoryReducer from "./history";

export default combineReducers({
  authReducer,
  currentUserReducer,
  channelReducers,
  videoReducer,
  likedVideoReducer,
  watchLaterReducer,
  HistoryReducer,commentReducer
});