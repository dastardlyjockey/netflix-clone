import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourite from "@/hooks/useFavourite";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavouriteButtonProps {
  movieId: string;
}
const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavourites } = useFavourite();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavourite = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavourite = useCallback(async () => {
    let response;

    if (isFavourite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updatedFavouriteIds = response?.data?.favouriteIds;

    mutate({
      ...currentUser,
      favouriteIds: updatedFavouriteIds,
    });
    mutateFavourites();
  }, [movieId, currentUser, isFavourite, mutate, mutateFavourites]);

  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavourite}
      className={
        "cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
      }
    >
      <Icon className={"text-white"} size={25} />
    </div>
  );
};

export default FavouriteButton;
