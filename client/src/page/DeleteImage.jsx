import customFetch from "../utils/customFetch";
import errorMessage from "../utils/errorMessage";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/delete/${params.id}`);
    toast.success("Photo deleted");
  } catch (error) {
    toast.error(errorMessage(error, "Couldn't delete the photo. Try again."));
  }
  return redirect("/collection");
};
