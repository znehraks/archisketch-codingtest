import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  checkedListAtom,
  isDeletingAtom,
  modeAtom,
  selectedCardAtom,
} from "./recoil";
import FileSaver from "file-saver";
const ImgWrapper = styled.div`
  flex: 0 1 20%;
  width: 20%;
`;
interface IImgCardWrapper {
  isChecked?: boolean;
}
const ImgCardWrapper = styled.div<IImgCardWrapper>`
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  transition: box-shadow 0.25s ease 0s;
  margin: 9px;
  box-shadow: none;
  input {
    display: none;
  }
  span {
    display: none;
  }
  :hover {
    input {
      width: 25px;
      height: 25px;
      display: inline;
      position: absolute;
      top: 5px;
      left: 15px;
    }
    span {
      width: 25px;
      height: 25px;
      display: inline;
      position: absolute;
      top: 5px;
      right: 10px;
      color: white;
      font-size: 24px;
    }
  }
  ${(props) =>
    props.isChecked &&
    `input {
      width: 25px;
      height: 25px;
      display: inline;
      position: absolute;
      top: 5px;
      left: 15px;
    }
    span{
      width: 25px;
      height: 25px;
      display: inline;
      position: absolute;
      top: 5px;
      right: 10px;
      color: white;
      font-size: 24px;
    }    
    `}
`;
const ImgCardInnerWrapper = styled(ImgCardWrapper)<IImgCardWrapper>`
  width: 100%;
  overflow: hidden;
  padding-top: 71%;
  :hover {
    background-color: #000;
  }
  ${(props) => props.isChecked && `background-color: #000;`}
  img {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    object-fit: cover;
    :hover {
      opacity: 0.6;
    }
    ${(props) => props.isChecked && `opacity: 0.6;`}
  }
`;
interface ICardModalProps {
  isModalClicked: boolean;
}
const CardModal = styled.div<ICardModalProps>`
  background-color: white;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  display: ${(props) => (props.isModalClicked ? "flex" : "none")};
  justify-content: space-around;
  align-items: flex-start;
  width: 70px;
  height: 60px;
  position: absolute;
  top: 40px;
  right: 10px;
  div {
    font-size: 14px;
    padding: 4px;
    width: 100%;
    height: 100%;
    :hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
interface IProps {
  itemId: string;
}
function ImgComponent({ itemId }: IProps) {
  //recoil.ts 참고
  const setMode = useSetRecoilState(modeAtom);
  const setIsDeleting = useSetRecoilState(isDeletingAtom);
  const setSelectedCard = useSetRecoilState(selectedCardAtom);
  const [checkedList, setCheckedList] = useRecoilState(checkedListAtom);

  //카드에 hover 혹은 check 시, 생기는 [...]모양 메뉴를 누름으로써 해당 모달의 display를 조절하는 hook
  const [isModalClicked, setIsModalClicked] = useState<boolean>(false);

  //현재 카드가 체크 되었는지 아닌지 상태 관리하는 hook
  const [isChecked, setIsChecked] = useState<boolean>(
    checkedList.includes(itemId)
  );

  //모두선택 체크 해제 시, 단일 선택으로 체크 된 컴포넌트가 리랜더링 되지 않는 문제를 해결한 useEffect hook
  useEffect(() => {
    setIsChecked(checkedList.includes(itemId));
  }, [checkedList]);

  //체크박스 내에 onChange 함수
  //체크되자 않은 상태로 체크가 되면, 새롭게 checkedList의 원소로 추가
  //이미 체크된 카드에 다시 체크를 하면 토글되어, 기존의 checkedList에 추가된 본 원소를 제거
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isChecked) {
      setCheckedList((prevList) =>
        prevList.filter((item) => item !== e.target.value)
      );
    } else {
      setCheckedList((prevList) => [...prevList, e.target.value]);
    }
    setIsChecked((prev) => !prev);
  };

  return (
    <ImgWrapper>
      <ImgCardWrapper isChecked={isChecked}>
        <ImgCardInnerWrapper
          isChecked={isChecked}
          onClick={() => {
            setMode("DETAIL");
            setSelectedCard(itemId);
          }}
        >
          <img src={itemId} alt={"인테리어"}></img>
        </ImgCardInnerWrapper>

        <input
          type="checkbox"
          value={itemId}
          checked={isChecked}
          onChange={onChange}
        />
        <span onClick={() => setIsModalClicked(!isModalClicked)}>...</span>
        <CardModal isModalClicked={isModalClicked}>
          <div
            onClick={() => {
              FileSaver.saveAs(itemId, `${itemId}`);
              setIsModalClicked(false);
            }}
          >
            다운로드
          </div>
          <div onClick={() => setIsDeleting([itemId])}>삭제</div>
        </CardModal>
      </ImgCardWrapper>
    </ImgWrapper>
  );
}

export default ImgComponent;
