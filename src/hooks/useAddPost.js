import { useState } from "react";
import { v4 } from "uuid";

export const useAddPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const addPost = ({ add, note }) => {
    const data = {
      id: v4(),
      note: note,
    };
    add(function (prevContent) {
      return [
        {
          id: data.id,
          note: data.note,
        },
        ...prevContent,
      ];
    });
  };
  return { isLoading, error, addPost };
};
