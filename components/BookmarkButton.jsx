"use client";
import { useState, useEffect } from "react";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { set } from "mongoose";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((response) => {
      if (response.error) {
        toast.error(response.error);
        setIsLoading(false);
        return;
      }
      if (response.isBookmarked) {
        setIsBookmarked(response.isBookmarked);
      }
      setIsLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = async (event) => {
    if (!userId) {
      toast.error("You need to be logged in to bookmark a property.");
      return;
    }

    bookmarkProperty(property._id).then((response) => {
      if (response.error) return toast.error(response.error);
      setIsBookmarked(response.isBookmarked);
      toast.success(response.message);
    });
  };

  return isBookmarked ? (
    <div>
      <button
        onClick={handleClick}
        className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      >
        <FaBookmark className="mr-2" />
        Remove BookMark
      </button>
    </div>
  ) : (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      >
        <FaBookmark className="mr-2" />
        BookMark Property
      </button>
    </div>
  );
};

export default BookmarkButton;
