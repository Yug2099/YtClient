import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Comments from "../../Components/Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import vid from "../../Components/Video/vid.mp4";
import LikeWatchLaterSaveBtns from "./LikeWatchLaterSaveBtns";
import "./VideoPage.css";
import { addToHistory } from "../../actions/History";
import { viewVideo } from "../../actions/video";
function VideoPage() {
  const { vid } = useParams();
  // console.log(vid)

  // const chanels = useSelector((state) => state?.chanelReducers);

  // console.log(Cid)
  // const currentChanel = chanels.filter((c) => c._id === vid)[0];

  const vids = useSelector((state) => state.videoReducer);
  // console.log(vids)
  const vv = vids?.data.filter((q) => q._id === vid)[0];
  const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state?.currentUserReducer);

  const handleHistory = useCallback(() => {
    dispatch(
      addToHistory({
        videoId: vid,
        Viewer: CurrentUser?.result._id,
      })
    );
  }, [dispatch, vid, CurrentUser?.result._id]);

  const handleViews = useCallback(() => {
    dispatch(viewVideo({ id: vid }));
  }, [dispatch, vid]);

  useEffect(() => {
    if (CurrentUser) {
      handleHistory();
    }
    handleViews();
  }, [CurrentUser, handleHistory, handleViews]);
  
  const [subscribeBtn, setsubscribeBtn] = useState('Subscribe');
  // const [loginMessage, setLoginMessage] = useState('');
  const [loginMessageVisible, setLoginMessageVisible] = useState(false);

  const handleSubscribeClick = () => {
    if (CurrentUser) {
      setsubscribeBtn('Subscribed');
      setLoginMessageVisible(false); // Hide the login message
    } else {
      setsubscribeBtn('Subscribe');
      setLoginMessageVisible(!loginMessageVisible); // Toggle the login message visibility
    }
  }

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
            <video
              // src={`http://localhost:5500/${vv?.filePath}`}
              src={`http://localhost:5500/${vv?.filePath}`}
              className={"video_ShowVideo_videoPage"}
              controls
            // autoPlay
            ></video>
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage"> {vv?.videoTitle}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.Views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdAt).fromNow()}
                  </div>
                  <LikeWatchLaterSaveBtns vv={vv} vid={vid} />
                </div>
              </div>
              <div className="Channel_det">
                <div className="Channel_btn">
                  <Link
                    to={`/channel/${vv?.videoChannel}`}
                    className="channl_details_videoPage"
                  >
                    <b className="channel_logo_videoPage">
                      <p>{vv?.Uploder.charAt(0).toUpperCase()}</p>
                    </b>
                    <p className="channel_name_videoPage">{vv?.Uploder}</p>
                  </Link>
                </div>
                <div className="subscribe_btn">
                  <button onClick={handleSubscribeClick}>
                    <span>
                      {subscribeBtn}
                    </span>
                  </button>
                  {!CurrentUser && loginMessageVisible && (
                    <div className="login-message">
                      Want to subscribe to this channel?<br />
                      <p>Sign in to subscribe to this channel</p><br /><br />
                      <a href="/sign-in">Sign in</a>
                    </div>
                  )}
                </div>
              </div>
              <div className="comments_VideoPage">
                <h2>
                  <u>Coments</u>
                </h2>
                <Comments videoId={vv._id} />
              </div>
            </div>
          </div>
          <div className="moreVideoBar">More video</div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;