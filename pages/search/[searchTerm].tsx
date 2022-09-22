import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import useAuthStore from "../../store/authStore";
import { useRouter } from "next/router";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setisAccountss] = useState(true);
  const router = useRouter()  ; 
  const {searchTerm} = router.query ; 

  const isAccount = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideo = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  console.log(videos)
  return (
    <div className="w-full ">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          onClick={() => setisAccountss(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${isAccount}`}
        >
          Accounts
        </p>
        <p
          onClick={() => setisAccountss(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideo}`}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div>
            ACCOUNTS
        </div>
      ): (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">

            {videos.length ? (
                <>
                    {videos.map((video:Video, index: number) => (
                        <VideoCard 
                            post={video}
                            key={index} 
                        /> 
                    ))}
                </>

            ): (
                <NoResult text={`No Video Results for ${searchTerm}`}/> 
            )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
