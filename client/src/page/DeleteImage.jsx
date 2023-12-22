import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/delete/${params.id}`);
    toast.success("image deleted");
    return redirect("/collection");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/collection");
  }
};
