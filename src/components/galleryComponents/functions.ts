import FileSaver from "file-saver";
import JSZip from "jszip";
import { SetterOrUpdater } from "recoil";
const JSZipUtils = require("jszip-utils");

//모두 선택 버튼 클릭 시 실행 함수
export const selectAll = (
  allChecked: boolean,
  setCheckedList: SetterOrUpdater<string[]>,
  data: {
    _id: string;
  }[]
): void => {
  if (allChecked) {
    setCheckedList([]);
  } else {
    setCheckedList([...data?.map((item: { _id: string }) => item._id)]);
  }
};

//이미지 삭제 함수,
//현재 체크된 이미지들을 제외한 나머지를 새 data로 업데이트
//즉, 체크된 이미지를 삭제한 배열이 새 data state가 됨.
export const deleteImg = (
  setData: SetterOrUpdater<
    {
      _id: string;
    }[]
  >,
  checkedList: string[],
  isDeleting: string[],
  setIsDeleting: SetterOrUpdater<string[]>,
  setCheckedList: SetterOrUpdater<string[]>,
  setResolution: SetterOrUpdater<{
    width?: number | undefined;
    height?: number | undefined;
  }>,
  setMode: SetterOrUpdater<"GRID" | "DETAIL">,
  fromModal: boolean
): void => {
  setData((prev: any) => {
    const deleteTarget = fromModal
      ? [...isDeleting]
      : [...checkedList, ...isDeleting];
    return prev.filter((item: any) => !deleteTarget.includes(item._id));
  });
  setIsDeleting([]);
  setCheckedList([]);
  setResolution({});
  setMode("GRID");
};

//zip파일에 정상적으로 압축하기 위해 url 형식인 이미지 파일을 바이너리 형식으로 변환
export const urlToPromise = (url: string): any => {
  return new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent(url, function (err: any, data: any) {
      if (err) {
        alert("다운로드 중 오류가 발생하였습니다.");
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

//헤더의 download 버튼 클릭 시 실행되는 함수
//위의 urlToPromise 함수를 이용하여, 현재 체크된 이미지들을 binary로 형 변환 한 뒤, 압축 실행.
//archisketch.zip 파일 생성됨.
export const download = (checkedList: string[]): void => {
  if (checkedList.length === 1) {
    try {
      FileSaver.saveAs(checkedList[0], checkedList[0]);
    } catch (e: unknown) {
      alert("다운로드 중 오류가 발생하였습니다.");
    }
  } else {
    try {
      let zip = new JSZip();
      checkedList.forEach((item) => {
        zip.file(item, urlToPromise(item), { binary: true });
      });
      zip.generateAsync({ type: "blob" }).then((content) => {
        FileSaver.saveAs(content, "archisketch.zip");
      });
    } catch (e: unknown) {
      alert("다운로드 중 오류가 발생하였습니다.");
    }
  }
};

//상세페이지의 이미지의 해상도를 구하는 함수
export const getResolution = (
  selectedCard: string,
  setResolution: any
): void => {
  const url = selectedCard;
  const img = new Image();
  img.onload = function () {
    setResolution({ width: img.width, height: img.height });
  };
  img.src = url;
};
