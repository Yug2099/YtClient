// Updated Dashboard Component
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideo } from '../../actions/video';
import { getAllComment } from '../../actions/comments';
import moment from 'moment';
import { deleteVideo } from '../../actions/video';
import './Dashboard.css';

function Dashboard() {
  const dispatch = useDispatch();
  const videoData = useSelector((state) => state.videoReducer.data);
  console.log('Video data:', videoData);
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

  const [selectedVideos, setSelectedVideos] = useState([]);

  const handleSelectVideo = (videoId) => {
    setSelectedVideos((prevSelected) => {
      if (prevSelected.includes(videoId)) {
        return prevSelected.filter((id) => id !== videoId);
      } else {
        return [...prevSelected, videoId];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedVideos((prevSelected) => {
      if (prevSelected.length === videosWithFormattedDate.length) {
        return [];
      } else {
        return videosWithFormattedDate.map((video) => video._id);
      }
    });
  };

  const handleDeleteVideo = async (videoId) => {
    // Dispatch an action to delete the video
    await dispatch(deleteVideo(videoId));

    // After deleting, refresh the video list
    dispatch(getAllVideo());
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Channel Dashboard</h1>
        <h3>Channel Content</h3>
      </header>

      <table className="videos-list-container">
        <thead>
          <tr className="video-item heading-row">
            <th>
              <input type="checkbox" checked={selectedVideos.length === videosWithFormattedDate.length} onChange={handleSelectAll} />
            </th>
            <th>Video</th>
            <th>Visibility</th>
            <th>Date</th>
            <th>Views</th>
            <th>Comments</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {videosWithFormattedDate?.map((video, index) => (
            <tr key={index} className={`video-item ${selectedVideos.includes(video._id) ? 'selected' : ''}`}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedVideos.includes(video._id)}
                  onChange={() => handleSelectVideo(video._id)}
                />
              </td>
              <td>{video.videoTitle}</td>
              <td>{video.visibility}</td>
              <td>{video.formattedDate}</td>
              <td>{video.Views}</td>
              <td>{commentsCount(video._id)}</td>
              <td>{video.Like}</td>
              <td>
                {selectedVideos.includes(video._id) && (
                  <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
