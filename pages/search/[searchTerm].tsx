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
import Link from "next/link";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setisAccountss] = useState(true);
  const router = useRouter();
  const { searchTerm }:any = router.query;
  const { allUsers } = useAuthStore();
  const isAccount = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideo = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  const seacrhedAccounts = allUsers.filter((user : IUser) =>
    user.userName.toLowerCase().includes(searchTerm!.toLowerCase())
  );

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
        <div
            className="md:mt-16"
        >{
            seacrhedAccounts.length > 0 ? (
                seacrhedAccounts.map((user:IUser, index: number) => (
                    <div key={index}>
                        <Link href={`/profile/${user._id}`}>
                        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                          <div>
                            <Image
                              src={user.image}
                              width={50}
                              height={50}
                              className="rounded-full"
                              alt="user profile"
                             
                            />
                          </div>
                          <div className="xl:block">
                            <p className="flex gap-1 text-md font-bold text-primary lowercase">
                              {user.userName.replaceAll(" ", "")}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="capitalize text-gray-400 text-sm">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                ))
            ) : (
                <NoResult text = {`No account found for ${searchTerm}`}/> 
            )
        }</div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            <>
              {videos.map((video: Video, index: number) => (
                <VideoCard post={video} key={index} />
              ))}
            </>
          ) : (
            <NoResult text={`No Video Results for ${searchTerm}`} />
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
