import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFunction: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>("");
  const apiMutation = useMutation(mutationFunction);

  const mutate = async (payload: any) => {
    setIsLoading(true);
    try {
      const res = await apiMutation(payload);
      return res;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};
