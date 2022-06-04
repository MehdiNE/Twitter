export const useTag = (userTagProps) => {
  const userTag = userTagProps?.split(" ")?.join("")?.toLocaleLowerCase();

  return { userTag };
};
