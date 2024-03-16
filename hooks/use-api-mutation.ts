import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFunction: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = async (payload: any) => {
    setIsLoading(true);
    try {
      return apiMutation(payload);
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
};
