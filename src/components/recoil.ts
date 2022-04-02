import { atom, selector } from "recoil";

//이미지 데이터 저장
export const dataAtom = atom<{ _id: string }[]>({
  key: "data",
  default: [],
});

//전체 그리드 뷰 모드 == "GRID"
//이미지 상세 페이지 모드 == "DETAIL"
export const modeAtom = atom<"GRID" | "DETAIL">({
  key: "mode",
  default: "GRID",
});

//삭제 리스트에 올라온 상태 관리
//배열이 비어있으면 삭제 상태아님
//배열에 원소가 한 개라도 들어있으면, 삭제 중으로 인식
export const isDeletingAtom = atom<string[]>({
  key: "isDeleting",
  default: [],
});

//현재 체크된 이미지들 상태 관리
//배열에 원소가 비어있으면 아무것도 체크되지 않은 상태
export const checkedListAtom = atom<string[]>({
  key: "checkedList",
  default: [],
});

//모두선택 여부 상태관리
//checkList와 data 길이 비교 후, 같으면 모두선택으로 간주
export const allCheckedAtom = selector({
  key: "allChecked",
  get: ({ get }) => {
    const checkList = get(checkedListAtom);
    const data = get(dataAtom);
    return checkList.length === data.length;
  },
});

//현재 상세페이지에서 보여지는 이미지 상태 관리
export const selectedCardAtom = atom<string>({
  key: "selectedCard",
  default: "",
});

//현재 상세페이지에서 보여지는 이미지의 data상의 인덱스 상태 관리
//상세페이지에서 좌,우 화살표 버튼으로 이전, 다음 페이지로의 이동에 사용됨
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

//해상도 정보 상태 관리
//상세페이지가 아니면 초기 값이 설정되지 않으므로, null 일 수 있음
export const resolutionAtom = atom<{ width?: number; height?: number }>({
  key: "resolution",
  default: {},
});
