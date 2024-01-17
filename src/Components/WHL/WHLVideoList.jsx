import React from 'react';
import ShowVideoList from '../ShowvideoList/ShowVideoList';

function WHLVideoList({ page, CurrentUser, videoList }) {
  const uniqueVideos = getUniqueVideos(videoList);

  return (
    <>
      {CurrentUser ? (
        <>
          {uniqueVideos.map((entry) => (
            <ShowVideoList videoId={entry?.videoId} key={entry?._id} />
          ))}
        </>
      ) : (
        <>
          <h2 style={{ color: 'white' }}>Please Login To Watch Your {page}</h2>
        </>
      )}
    </>
  );
}

// Helper function to get unique video list based on videoId
const getUniqueVideos = (videoList) => {
  const uniqueVideos = [];
  const videoIds = new Set();

  for (const entry of videoList?.data?.reverse() || []) {
    if (!videoIds.has(entry?.videoId)) {
      videoIds.add(entry?.videoId);
      uniqueVideos.push(entry);
    }
  }

  return uniqueVideos;
};

export default WHLVideoList;
