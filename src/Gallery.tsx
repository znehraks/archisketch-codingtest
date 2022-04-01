import testJson from "./test.json";
import styled from "styled-components";
import ImgComponent from "./components/ImgComponent";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allCheckedAtom,
  checkedListAtom,
  dataAtom,
  modeAtom,
} from "./components/recoil";
import Detail from "./components/Detail";
//FixedHeader

//Wrapper > Grid view >

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
  z-index: 10;
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
`;
const ContentWrapper = styled.div`
  padding-top: 52px;
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
        cursor: pointer;
        margin-left: 5px;
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
// 체크박스 만든 후, 선택한 것에 따라 위에 표시
// 모두선택 체크 박스 만들기
// 다운로드,삭제 기능 구현
// 선택취소 구현
// 개별 카드에서 다운로드, 삭제 구현
// 상세 페이지 확대 창 구현
// 양옆 화살표 구현
function Gallery() {
  const [mode, setMode] = useRecoilState(modeAtom);
  const data = useRecoilValue(dataAtom);
  const [checkedList, setCheckedList] = useRecoilState(checkedListAtom);
  const allChecked = useRecoilValue(allCheckedAtom);
  const selectAll = () => {
    if (allChecked) {
      setCheckedList([]);
    } else {
      setCheckedList([...data.map((item) => item._id)]);
    }
  };
  console.log(checkedList);
  return (
    <Wrapper>
      <FixedHeader>
        <button onClick={() => mode === "DETAIL" && setMode("GRID")}>X</button>
      </FixedHeader>
      <ContentWrapper>
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
                <span>다운</span>
                <span>삭제</span>
                <span onClick={() => setCheckedList([])}>선택취소</span>
              </>
            )}
          </div>
        </Title>
        {mode === "GRID" ? (
          <GridView>
            {data?.map((item) => (
              <ImgComponent key={item._id} itemId={item._id} />
            ))}
          </GridView>
        ) : (
          <Detail />
        )}
      </ContentWrapper>
    </Wrapper>
  );
}

export default Gallery;
