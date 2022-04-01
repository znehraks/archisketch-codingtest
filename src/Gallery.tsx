import styled from "styled-components";
import ImgComponent from "./components/ImgComponent";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allCheckedAtom,
  checkedListAtom,
  dataAtom,
  isDeletingAtom,
  modeAtom,
  resolutionAtom,
} from "./components/recoil";
import Detail from "./components/Detail";
import DeletePopup from "./components/DeletePopup";
import trashcanImg from "./components/styles/images/trashcan.svg";
import downloadImg from "./components/styles/images/download.svg";
import FileSaver from "file-saver";
import JSZip from "jszip";
const Wrapper = styled.div`
  width: 99vw;
  height: auto;
`;
const FixedHeader = styled.div`
  background-color: #fff;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px;
  position: fixed;
  z-index: 1;
  button {
    width: 42px;
    height: 30px;
    font-weight: 800;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10%;
    cursor: pointer;
    :hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  span {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700;
  }
`;
const ContentWrapper = styled.div`
  padding-top: 56px;
`;
const Title = styled.div`
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
      font-size: 16px;
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
const GridView = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 7px;
  padding: 0 32px 32px;
`;
function Gallery() {
  const [mode, setMode] = useRecoilState(modeAtom);
  const [isDeleting, setIsDeleting] = useRecoilState(isDeletingAtom);
  const data = useRecoilValue(dataAtom);
  const [checkedList, setCheckedList] = useRecoilState(checkedListAtom);
  const allChecked = useRecoilValue(allCheckedAtom);
  const [resolution, setResolution] = useRecoilState(resolutionAtom);
  const selectAll = () => {
    if (allChecked) {
      setCheckedList([]);
    } else {
      setCheckedList([...data.map((item) => item._id)]);
    }
  };
  const download = () => {
    if (checkedList.length === 1) {
      FileSaver.saveAs(checkedList[0], checkedList[0]);
    } else {
      let zip = new JSZip();
      checkedList.forEach((item) => {
        zip.file(item, btoa(item), { base64: true });
      });
      zip.generateAsync({ type: "blob" }).then((content) => {
        FileSaver.saveAs(content, "archisketch.zip");
      });
    }
  };
  console.log(checkedList);
  return (
    <Wrapper>
      <FixedHeader>
        <button
          onClick={() => {
            setResolution({});
            mode === "DETAIL" && setMode("GRID");
          }}
        >
          X
        </button>
        {resolution.width && resolution.height && (
          <span>
            해상도 : {resolution.width}X{resolution.height}
          </span>
        )}
      </FixedHeader>
      <ContentWrapper>
        {isDeleting.length !== 0 ? (
          <DeletePopup />
        ) : (
          <>
            {mode === "GRID" ? (
              <>
                <Title>
                  <div>
                    {checkedList.length !== 0 ? (
                      <>
                        <Span>{checkedList.length}개의 이미지 선택됨 </Span>
                        <input
                          type="checkbox"
                          checked={allChecked}
                          onChange={selectAll}
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
                    {checkedList.length !== 0 && (
                      <>
                        <span onClick={download}>
                          <img src={downloadImg} alt={"다운로드"} />
                        </span>
                        <span onClick={() => setIsDeleting([...checkedList])}>
                          <img src={trashcanImg} alt={"삭제"} />
                        </span>
                        <span onClick={() => setCheckedList([])}>선택취소</span>
                      </>
                    )}
                  </div>
                </Title>
                <GridView>
                  {data?.map((item) => (
                    <ImgComponent key={item._id} itemId={item._id} />
                  ))}
                </GridView>
              </>
            ) : (
              <Detail />
            )}
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
}

export default Gallery;
