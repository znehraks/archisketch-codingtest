import { atom, selector } from "recoil";
import testJson from "../test.json";

export const dataAtom = atom<{ _id: string }[]>({
  key: "data",
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
    return checkList.length === testJson.renderings.length;
  },
});

export const modeAtom = atom<"GRID" | "DETAIL">({
  key: "mode",
  default: "GRID",
});

export const selectedCardAtom = atom<string>({
  key: "selectedCard",
  default: "",
});

export const selectedCardIndexSelector = selector<number>({
  key: "selectedCardIndex",
  get: ({ get }) => {
    const selectedCard = get(selectedCardAtom);
    let selectedCardIndex = 0;
    testJson.renderings.map((item, index) => {
      if (item._id === selectedCard) {
        selectedCardIndex = index;
      }
      return null;
    });
    return selectedCardIndex;
  },
});
