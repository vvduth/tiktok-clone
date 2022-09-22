import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BASE_URL } from "../../utils";

import useAuthStore from "../../store/authStore";
import { Video } from "../../types";
import axios from "axios";
interface Iprops {
  postDetails: Video;
}

const Details = ({ postDetails }: Iprops) => {
  const [post, setPost] = useState(postDetails);
 const [playing, setPlaying] = useState(false) ;
  const videoRef = useRef(null);

  if (!post) return null;
  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center  bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>

        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
            ref={videoRef}
            loop 
            onClick={() => {}}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
          {!playing && (
            <button onClick={() => {}}>
              <BsFillPlayFill  className="text-white text-6xl lg:text-8xl"/> 
            </button>
          )}
          </div>
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
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};

export default Details;
