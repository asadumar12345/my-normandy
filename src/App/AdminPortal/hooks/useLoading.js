import { useState } from "react";

const useLoading = (callback) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (...args) => {
    setLoading(true);

    try {
      return await callback(args);
    } catch (e) {
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };

  return [handleSubmit, isLoading];
};

export default useLoading;
