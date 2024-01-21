import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar';
import ShowVideoGrid from '../../Components/ShowVideoGrid/ShowVideoGrid';
import DescribeChannel from './DescribeChannel';

function Channel({ setEditCreateChannelBtn, setVidUploadPage }) {
  const { Cid } = useParams();
  const videos = useSelector(state => state.videoReducer?.data)?.filter(q => q?.videoChannel === Cid).reverse();

  // Filter out private videos
  const publicVideos = videos.filter(video => video.visibility === 'public');

  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <DescribeChannel
          Cid={Cid}
          setVidUploadPage={setVidUploadPage}
          setEditCreateChannelBtn={setEditCreateChannelBtn}
        />
        <ShowVideoGrid vids={publicVideos} />
      </div>
    </div>
  );
}

export default Channel;
