import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideo } from '../../actions/video';
import { getAllComment } from '../../actions/comments';
import moment from 'moment';
import './Dashboard.css';

function Dashboard() {
  const dispatch = useDispatch();
  const videoData = useSelector((state) => state.videoReducer.data);
  const commentData = useSelector((state) => state.commentReducer.data);

  useEffect(() => {
    // Fetch all videos and comments when the component mounts
    dispatch(getAllVideo());
    dispatch(getAllComment());
  }, [dispatch]);

  // Use useEffect to update the comments count when commentData changes
  useEffect(() => {
    // Handle the logic for updating the comments count when commentData changes
    console.log('Comment data has changed:', commentData);
  }, [commentData]);

  const videosWithFormattedDate = videoData?.map((video) => ({
    ...video,
    formattedDate: moment(video.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
  }));

  const commentsCount = (videoId) => {
    const videoComments = commentData?.filter((comment) => comment.video === videoId);
    return videoComments ? videoComments.length : 0;
  };

  // Main headings
  const headings = ['Video', 'Visibility', 'Date', 'Views', 'Comments', 'Likes'];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Channel Dashboard</h1>
        <h3>Channel Content</h3>
      </header>

      <div className="videos-list-container">
        {/* Main headings row */}
        <div className="video-item heading-row">
          {headings.map((heading, index) => (
            <p key={index}>{heading}</p>
          ))}
        </div>

        {/* Video data rows */}
        {videosWithFormattedDate?.map((video, index) => (
          <div key={index} className="video-item">
            <p>{video.videoTitle}</p>
            <p>{video.visibility}</p>
            <p>{video.formattedDate}</p>
            <p>{video.Views}</p>
            <p>{commentsCount(video._id)}</p>
            <p>{video.Like}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
