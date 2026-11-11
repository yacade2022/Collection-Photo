import { useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Lightbox = ({ photos, index, onClose, onNavigate }) => {
  const dialogRef = useRef(null);
  const photo = index === null ? null : photos[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (photo && !dialog.open) dialog.showModal();
    if (!photo && dialog.open) dialog.close();
  }, [photo]);

  useEffect(() => {
    if (!photo) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photo, onNavigate]);

  const many = photos.length > 1;
  const navButton =
    "grid h-12 w-12 place-items-center rounded-full bg-mount/10 text-mount hover:bg-mount/20";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-label={photo?.name || "Photo"}
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/95"
    >
      {photo && (
        <div
          className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-10"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <img
            src={photo.image}
            alt={photo.name || "Untitled photo"}
            className="max-h-[80vh] max-w-full bg-mount object-contain p-2 sm:p-3"
          />
          <div className="flex items-center gap-4 text-mount">
            {many && (
              <button type="button" onClick={() => onNavigate(-1)} className={navButton} aria-label="Previous photo">
                <AiOutlineLeft size={20} />
              </button>
            )}
            <p className="min-w-[8rem] text-center">
              <span className="block font-medium">{photo.name || "Untitled"}</span>
              <span className="text-sm text-mount/60">
                {index + 1} of {photos.length}
              </span>
            </p>
            {many && (
              <button type="button" onClick={() => onNavigate(1)} className={navButton} aria-label="Next photo">
                <AiOutlineRight size={20} />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`${navButton} absolute right-4 top-4`}
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
      )}
    </dialog>
  );
};

export default Lightbox;
