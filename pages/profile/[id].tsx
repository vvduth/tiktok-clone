import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}
const Profile = ({ data }: IProps) => {
  const [showVideo, setShowVideos] = useState(true);
  const { user, userLikedVideos, userVideos } = data;

  const [videoList, setVideoList] = useState<Video[]>([])

  const videos = showVideo ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showVideo ? "border-b-2 border-black" : "text-gray-400";


  useEffect(() => {
    if (showVideo) {
        setVideoList(userVideos) ;
    } else {
        setVideoList(userLikedVideos) ;
    }
  },[showVideo, userLikedVideos, userVideos])
  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 md-4 bg-white w-full">
        <div className="w-16 h-16 md:w32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col">
          <p className=" text-2xl tracking-wider justify-center flex gap-1 text-md font-bold text-primary lowercase">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-sm md:text-xl">
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            onClick={() => setShowVideos(true)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
          >
            Posted Videos
          </p>
          <p
            onClick={() => setShowVideos(false)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
          >
            Liked videos
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
            {videoList.length > 0  ? (
                videoList.map((post: Video, index: number) => (
                    <VideoCard post={post} key={index}/>
                ))
            ) : (
                <NoResult text={`No ${showVideo ? '' : 'Liked'} Videos Yet`} /> 
            )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  console.log(res.data);

  return {
    props: { data: res.data },
  };
};

export default Profile;
