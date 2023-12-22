import React from "react";
import LogUser from "./LogUser";
import { Form } from "react-router-dom";
import { ImFolderUpload } from "react-icons/im";
import customFetch from "../utils/customFetch";
import { useLoaderData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  try {
    await customFetch.post("/upload", formData);
    toast.success("Upload Successful");
  } catch (error) {
    toast.error(response?.error?.data?.message);
  }
  return null;
};

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/getImages");
    return { data };
  } catch (error) {
    return error;
  }
};

const Collection = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { data } = useLoaderData();
  const { collection } = data;
  const { userName } = data;

  return (
    <>
      <LogUser userName={userName} />
      <div className="container mx-auto  ">
        <div>
          <Form
            method="post"
            encType="multipart/form-data"
            className="max-sm:w-2/3 w-1/2 mx-auto mt-12 p-4 rounded-md   shadow-lg shadow-blue-500/50  "
          >
            <h3 className=" capitalize  text-indigo-500 font-semibold text-xl mb-4">
              file upload
            </h3>
            <div className="mb-4 w-fit">
              <label className="text-indigo-500 capitalize pr-1 ">name</label>
              <input
                type="text"
                className=" max-sm:w-full bg-slate-200 p-1 rounded-md outline-none"
                name="name"
              />
            </div>
            <div className="flex items-center bg-indigo-500 justify-center w-fit  p-1 rounded-md hover:bg-indigo-700 duration-300">
              <span className="text-3xl text-slate-100">
                <ImFolderUpload />
              </span>
              <label className=" text-slate-100  " htmlFor="avatar">
                Choose a photo
              </label>
              <input
                type="file"
                className="hidden"
                id="avatar"
                name="image"
                accept="image/*"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-24 text-slate-100 bg-indigo-500 mt-1 p-1 rounded-md hover:bg-indigo-700 hover:scale-95 duration-300"
            >
              {isSubmitting ? "uploading..." : "upload"}
            </button>
          </Form>
        </div>
      </div>
      <div>
        <div className=" py-12 px-16 grid md:grid-cols-3  lg:grid-cols-4 gap-10 ">
          {collection.map((element) => {
            const { _id: id, image, name } = element;
            return (
              <div key={id}>
                <img
                  src={image}
                  alt="image"
                  className=" w-full h-48 rounded-md max-w-full max-h-full "
                />
                <div className="flex justify-between items-center mt-1">
                  <p className=" text-indigo-500 font-medium">{name}</p>
                  <Form method="post" action={`/delete/${id}`}>
                    <button
                      type="submit"
                      className=" bg-indigo-500  px-1 rounded-md text-slate-50 hover:bg-indigo-700 duration-300"
                    >
                      delete
                    </button>
                  </Form>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Collection;
