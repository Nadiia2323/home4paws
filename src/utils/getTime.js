  const getTime = () => {
    const time = new Date().getMilliseconds();
    // console.log("time :>> ", time.getDate());
    return time;
};
  
export {getTime}