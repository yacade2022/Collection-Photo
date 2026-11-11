import { forwardRef, useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { ImFolderUpload } from "react-icons/im";
import { toast } from "react-toastify";

const UploadPanel = forwardRef(function UploadPanel(_props, fileInputRef) {
  const fetcher = useFetcher();
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const busy = fetcher.state !== "idle";

  // Free the object URL whenever the preview changes or the panel unmounts.
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  // Clear the form once an upload succeeds.
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.ok) {
      formRef.current?.reset();
      setPreview(null);
      setFileName("");
    }
  }, [fetcher.state, fetcher.data]);

  const pickFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("That file isn't an image. Choose a JPG, PNG, WebP or GIF.");
      return;
    }
    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
    // Suggest a name from the file, without overwriting one the user typed.
    if (nameRef.current && !nameRef.current.value) {
      nameRef.current.value = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (!files?.length || !fileInputRef.current) return;
    fileInputRef.current.files = files;
    pickFile(files[0]);
  };

  return (
    <fetcher.Form
      ref={formRef}
      method="post"
      action="/collection"
      encType="multipart/form-data"
      className="grid gap-5 rounded-xl border border-line bg-mount p-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:p-5"
    >
      <label
        htmlFor="image"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative grid aspect-[4/3] cursor-pointer place-items-center overflow-hidden rounded-lg border-2 border-dashed text-center transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-cyan ${
          dragging
            ? "border-cyan bg-cyan-soft"
            : "border-line bg-wall/60 hover:border-graphite/50"
        }`}
      >
        {preview ? (
          <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-2 px-4 text-sm text-graphite">
            <ImFolderUpload aria-hidden="true" className="text-2xl text-cyan" />
            <span>
              <span className="font-semibold text-cyan">Choose a photo</span>
              <span className="max-sm:hidden"> or drop it here</span>
            </span>
          </span>
        )}
        <input
          ref={fileInputRef}
          id="image"
          type="file"
          name="image"
          accept="image/*"
          required
          onChange={(e) => pickFile(e.target.files?.[0])}
          className="sr-only"
        />
      </label>

      <div className="flex flex-col justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">Add a photo</h2>
          <p className="mt-1 truncate text-sm text-graphite" aria-live="polite">
            {fileName ? `Selected: ${fileName}` : "JPG, PNG, WebP or GIF."}
          </p>
        </div>
        <div>
          <label htmlFor="photo-name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            ref={nameRef}
            id="photo-name"
            name="name"
            type="text"
            maxLength={60}
            required
            placeholder="e.g. Harbour at dusk"
            className="input"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={busy} className="btn-primary">
            {busy ? "Uploading…" : "Upload photo"}
          </button>
          {preview && !busy && (
            <button
              type="reset"
              onClick={() => {
                setPreview(null);
                setFileName("");
              }}
              className="btn-quiet"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </fetcher.Form>
  );
});

export default UploadPanel;
