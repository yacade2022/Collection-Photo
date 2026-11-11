import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const LogUser = ({ userName = "" }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => !menuRef.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const logout = async () => {
    try {
      await customFetch.get("/auth/logout");
      navigate("/login");
    } catch {
      toast.error("Couldn't log out. Try again.");
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 text-sm font-medium hover:bg-ink/5"
      >
        <span
          aria-hidden="true"
          className="grid h-8 w-8 place-items-center rounded-full bg-cyan font-display font-semibold text-mount"
        >
          {userName.charAt(0).toUpperCase() || "?"}
        </span>
        <span className="max-w-[10rem] truncate max-sm:sr-only">{userName}</span>
        <FaCaretDown
          aria-hidden="true"
          className={`text-graphite transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 mt-2 w-56 rounded-lg border border-line bg-mount p-1.5 shadow-print"
        >
          <p className="px-3 pb-2 pt-1.5 text-xs text-graphite">
            Logged in as <span className="font-semibold text-ink">{userName}</span>
          </p>
          <button
            type="button"
            role="menuitem"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-ink/5"
          >
            <AiOutlineLogout aria-hidden="true" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default LogUser;
