import { useState } from "react";
import { useFetcher } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const PhotoCard = ({ photo, onOpen }) => {
  const { _id: id, image, name } = photo;
  const fetcher = useFetcher();
  const [confirming, setConfirming] = useState(false);
  const deleting = fetcher.state !== "idle";

  return (
    <figure
      className={`mb-6 break-inside-avoid bg-mount p-3 shadow-print transition-opacity sm:p-4 ${
        deleting ? "pointer-events-none opacity-40" : ""
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full overflow-hidden bg-wall"
        aria-label={`View ${name || "photo"} full size`}
      >
        <img
          src={image}
          alt={name || "Untitled photo"}
          loading="lazy"
          className="block h-auto w-full transition-transform duration-500 hover:scale-[1.02]"
        />
      </button>

      <figcaption className="mt-3 flex min-h-[2.25rem] items-center justify-between gap-3">
        {confirming ? (
          <fetcher.Form
            method="post"
            action={`/delete/${id}`}
            className="flex w-full items-center justify-between gap-2"
          >
            <span className="text-sm font-medium text-danger">Delete this photo?</span>
            <span className="flex gap-1">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-md px-2.5 py-1.5 text-sm hover:bg-ink/5"
              >
                Keep
              </button>
              <button
                type="submit"
                autoFocus
                className="rounded-md bg-danger px-2.5 py-1.5 text-sm font-semibold text-mount hover:bg-danger/90"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </span>
          </fetcher.Form>
        ) : (
          <>
            <span className="truncate text-sm font-medium">{name || "Untitled"}</span>
            <button
              type="button"
              onClick={() => setConfirming(true)}
              aria-label={`Delete ${name || "photo"}`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-graphite hover:bg-danger/10 hover:text-danger"
            >
              <AiOutlineDelete size={18} aria-hidden="true" />
            </button>
          </>
        )}
      </figcaption>
    </figure>
  );
};

export default PhotoCard;
