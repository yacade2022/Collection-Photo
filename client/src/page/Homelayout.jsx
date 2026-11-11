import { Outlet, useNavigation } from "react-router-dom";

const Homelayout = () => {
  const navigation = useNavigation();
  const busy = navigation.state !== "idle";

  return (
    <>
      {busy && (
        <div
          role="progressbar"
          aria-label="Loading"
          className="progress-bar fixed inset-x-0 top-0 z-50 h-0.5 bg-cyan"
        />
      )}
      <Outlet />
    </>
  );
};

export default Homelayout;
