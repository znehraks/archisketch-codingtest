import { atom, selector } from "recoil";

export const dataAtom = atom<{ _id: string }[]>({
  key: "data",
  default: [],
});

export const modeAtom = atom<"GRID" | "DETAIL">({
  key: "mode",
  default: "GRID",
});

export const isDeletingAtom = atom<string[]>({
  key: "isDeleting",
  default: [],
});

export const checkedListAtom = atom<string[]>({
  key: "checkedList",
  default: [],
});

export const allCheckedAtom = selector({
  key: "allChecked",
  get: ({ get }) => {
    const checkList = get(checkedListAtom);
    const data = get(dataAtom);
    return checkList.length === data.length;
  },
});

export const selectedCardAtom = atom<string>({
  key: "selectedCard",
  default: "",
});

export const resolutionAtom = atom<{ width?: number; height?: number }>({
  key: "resolution",
  default: {},
});

export const selectedCardIndexSelector = selector<number>({
  key: "selectedCardIndex",
  get: ({ get }) => {
    const data = get(dataAtom);
    const selectedCard = get(selectedCardAtom);
    let selectedCardIndex = 0;
    data.map((item, index) => {
      if (item._id === selectedCard) {
        selectedCardIndex = index;
      }
      return null;
    });
    return selectedCardIndex;
  },
});
