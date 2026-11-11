import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const notFound = !error || (isRouteErrorResponse(error) && error.status === 404);

  return (
    <main className="flex min-h-screen items-center px-6">
      <div className="mx-auto w-full max-w-md">
        <p className="font-display text-[7rem] font-extrabold leading-none tracking-tight text-cyan/20">
          {notFound ? "404" : "Oops"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          {notFound ? "This page doesn't exist" : "Something went wrong"}
        </h1>
        <p className="mt-3 text-graphite">
          {notFound
            ? "The link may be broken or the page may have moved."
            : "The page couldn't load. Refresh to try again, or go back to your collection."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/collection" className="btn-primary">
            Go to my collection
          </Link>
          <Link to="/login" className="btn-quiet border border-line">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error;
