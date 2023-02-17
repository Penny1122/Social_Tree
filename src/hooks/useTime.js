import React from "react";

export const useTime = () => {
  const Time = (time) => {
    const getTime = time.getTime();
    const duration = (Date.now() - getTime) / 1000;
    if (duration <= 60) {
      // console.log(`${Math.round(Math.max(duration, 1))}秒前`);
      return `${Math.round(Math.max(duration, "剛剛"))}秒前`;
    } else if (60 < duration && duration <= 3600) {
      return `${Math.round(duration / 60)}分鐘前`;
    } else if (3600 < duration && duration <= 86400) {
      return `${Math.round(duration / (60 * 60))}小時前`;
    } else if (86400 < duration && duration <= 604800) {
      return `${Math.round(duration / (60 * 60 * 24))}天前`;
    } else {
      const createdTime = time.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return createdTime;
    }
  };

  return { Time };
};
