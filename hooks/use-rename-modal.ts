import { create } from "zustand";

const initialValues = {
  id: "",
  title: "",
};

interface Modal {
  isOpen: boolean;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
  initialValues: typeof initialValues;
}

export const useRenameModal = create<Modal>((set) => ({
  isOpen: false,
  initialValues,
  onOpen: (id: string, title: string) =>
    set(() => ({ isOpen: true, initialValues: { id, title } })),
  onClose: () => set(() => ({ isOpen: false, initialValues })),
}));
