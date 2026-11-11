// The API returns errors as a bare JSON string, or as { msg } / { message }.
const errorMessage = (error, fallback) => {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (Array.isArray(data)) return data.join(", ");
  return data?.msg || data?.message || fallback;
};

export default errorMessage;
