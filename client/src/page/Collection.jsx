import { useCallback, useRef, useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import errorMessage from "../utils/errorMessage";
import LogUser from "./LogUser";
import UploadPanel from "../components/UploadPanel";
import PhotoCard from "../components/PhotoCard";
import Lightbox from "../components/Lightbox";

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await customFetch.post("/upload", formData);
    toast.success("Photo uploaded");
    return { ok: true };
  } catch (error) {
    toast.error(errorMessage(error, "Upload failed. Check your connection and try again."));
    return { ok: false };
  }
};

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/getImages");
    return data;
  } catch (error) {
    if (error?.response?.status === 401) return redirect("/login");
    throw error;
  }
};

const Collection = () => {
  const { collection = [], userName } = useLoaderData();
  const fileInputRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  // Newest first.
  const photos = [...collection].reverse();
  const count = photos.length;

  const navigate = useCallback(
    (step) => setOpenIndex((i) => (i === null ? i : (i + step + count) % count)),
    [count]
  );

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line/70 bg-wall/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <span className="font-display text-lg font-semibold text-cyan">Collection</span>
          <LogUser userName={userName} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
        <section className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,40rem)] lg:items-end lg:py-14">
          <div>
            <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
              {userName ? `${userName}'s wall` : "Your wall"}
            </h1>
            <p className="mt-3 text-graphite">
              {count === 0
                ? "Nothing here yet."
                : `${count} ${count === 1 ? "photo" : "photos"}, newest first.`}
            </p>
          </div>
          <UploadPanel ref={fileInputRef} />
        </section>

        {count === 0 ? (
          <div className="grid place-items-center rounded-xl border-2 border-dashed border-line px-6 py-20 text-center">
            <h2 className="font-display text-2xl font-semibold">Your wall is empty</h2>
            <p className="mt-2 max-w-sm text-graphite">
              Upload a photo and it will be hung here. Click any photo later to see it full size.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary mt-6"
            >
              Choose a photo
            </button>
          </div>
        ) : (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {photos.map((photo, i) => (
              <PhotoCard key={photo._id} photo={photo} onOpen={() => setOpenIndex(i)} />
            ))}
          </div>
        )}
      </main>

      <Lightbox
        photos={photos}
        index={openIndex !== null && openIndex < count ? openIndex : null}
        onClose={() => setOpenIndex(null)}
        onNavigate={navigate}
      />
    </>
  );
};

export default Collection;
