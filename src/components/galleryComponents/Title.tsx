import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  allCheckedAtom,
  checkedListAtom,
  dataAtom,
  isDeletingAtom,
} from "../recoil";
import trashcanImg from "../styles/images/trashcan.svg";
import downloadImg from "../styles/images/download.svg";
import { download, selectAll } from "./functions";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
  div {
    flex: 1;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    :first-child {
      font-size: 14px;
      justify-content: flex-start;
    }
    :last-child {
      justify-content: flex-end;
      span {
        border: 1px solid rgba(0, 0, 0, 0.1);
        cursor: pointer;
        margin-left: 10px;
        padding: 6px;
        font-size: 12px;
        img {
          width: 100%;
          height: 100%;
        }
        :last-child {
          padding: 12px;
        }
      }
    }
  }
`;
const Span = styled.span`
  margin-right: 10px;
`;
const TitleSpan = styled.span`
  font-weight: 800;
`;
function Title() {
  const setIsDeleting = useSetRecoilState(isDeletingAtom);
  const data = useRecoilValue(dataAtom);
  const [checkedList, setCheckedList] = useRecoilState(checkedListAtom);
  const allChecked = useRecoilValue(allCheckedAtom);

  //   //모두 선택 버튼 클릭 시 실행 함수
  //   const selectAll = () => {
  //     if (allChecked) {
  //       setCheckedList([]);
  //     } else {
  //       setCheckedList([...data.map((item) => item._id)]);
  //     }
  //   };

  //   //zip파일에 정상적으로 압축하기 위해 url 형식인 이미지 파일을 바이너리 형식으로 변환
  //   const urlToPromise = (url: any): any => {
  //     return new Promise(function (resolve, reject) {
  //       JSZipUtils.getBinaryContent(url, function (err: any, data: any) {
  //         if (err) {
  //           alert("다운로드 중 오류가 발생하였습니다.");
  //           reject(err);
  //         } else {
  //           resolve(data);
  //         }
  //       });
  //     });
  //   };

  //   //헤더의 download 버튼 클릭 시 실행되는 함수
  //   //위의 urlToPromise 함수를 이용하여, 현재 체크된 이미지들을 binary로 형 변환 한 뒤, 압축 실행.
  //   //archisketch.zip 파일 생성됨.
  //   const download = () => {
  //     if (checkedList.length === 1) {
  //       try {
  //         FileSaver.saveAs(checkedList[0], checkedList[0]);
  //       } catch (e: unknown) {
  //         alert("다운로드 중 오류가 발생하였습니다.");
  //       }
  //     } else {
  //       try {
  //         let zip = new JSZip();
  //         checkedList.forEach((item) => {
  //           zip.file(item, urlToPromise(item), { binary: true });
  //         });
  //         zip.generateAsync({ type: "blob" }).then((content) => {
  //           FileSaver.saveAs(content, "archisketch.zip");
  //         });
  //       } catch (e: unknown) {
  //         alert("다운로드 중 오류가 발생하였습니다.");
  //       }
  //     }
  //   };
  return (
    <Wrapper>
      <div>
        {checkedList?.length !== 0 ? (
          <>
            <Span>{checkedList?.length}개의 이미지 선택됨 </Span>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={() => selectAll(allChecked, setCheckedList, data)}
            />
            모두선택
          </>
        ) : (
          <Span>{data.length} 개의 랜더샷</Span>
        )}
      </div>
      <div>
        <TitleSpan>갤러리</TitleSpan>
      </div>
      <div>
        {checkedList?.length !== 0 && (
          <>
            <span onClick={() => download(checkedList)}>
              <img src={downloadImg} alt={"다운로드"} />
            </span>
            <span onClick={() => setIsDeleting([...checkedList])}>
              <img src={trashcanImg} alt={"삭제"} />
            </span>
            <span onClick={() => setCheckedList([])}>선택취소</span>
          </>
        )}
      </div>
    </Wrapper>
  );
}
export default Title;
