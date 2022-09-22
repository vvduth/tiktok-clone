import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { NextPage } from "next";

import useAuthStore from "../store/authStore";

interface IProps {
  likes: any;
  flex?: string;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton = ({handleLike, handleDislike, likes}: IProps) => {
  const [alreadyLiked, setAlreadyLike] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id)

  useEffect(()=> {
    if (filterLikes?.length>0) {
        setAlreadyLike(true)
    } else 
    {
        setAlreadyLike(false)
    }
  },[filterLikes,  likes])
  
  return (
    <div className="gap-6">
      <div className="mt-4 flex flex-col items-center cursor-pointer justify-center">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
            <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#141314]"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-mt font-semibold">{likes?.length || 0  }</p>
      </div>
    </div>
  );
};

export default LikeButton;
