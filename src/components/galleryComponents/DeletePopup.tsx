import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  checkedListAtom,
  dataAtom,
  isDeletingAtom,
  isFromModalAtom,
  modeAtom,
  resolutionAtom,
} from "../recoil";
import { deleteImg } from "./functions";
const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0px;
`;
const Background = styled.div`
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -ms-transition: all 0.2s;
  -o-transition: all 0.2s;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.72);
`;

const Section = styled.div`
  position: absolute !important;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 440px;
  height: 530px;
  -webkit-box-shadow: 0px 2px 32px rgb(22 65 76 / 8%);
  -moz-box-shadow: 0px 2px 32px rgba(22, 65, 76, 0.08);
  box-shadow: 0px 2px 32px rgb(22 65 76 / 8%);
  background: #fdfdfd;
  border-radius: 16px;
`;

const ImgWrap = styled.div`
  width: 440px;
  border-radius: 16px 16px 0 0;
  img {
    width: 440px;
    height: 220px;
    border-radius: 16px 16px 0 0;
    background: ${(props) => props.theme.accentColor};
  }
`;

const MessageWrap = styled.div`
  margin: 24px auto;
  text-align: center;
  h5 {
    font-size: 24px;
    font-weight: 600;
    user-select: none;
    color: #2b2b2b;
    margin-bottom: 8px;
    white-space: pre-line;
  }
  span {
    user-select: none;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
    font-weight: 300;
    color: #8b8b8b;
    text-transform: none;
    white-space: pre-line;
  }
`;

const ButtonBox = styled.div`
  position: absolute !important;
  bottom: 24px;
  z-index: 3;
`;
const Button = styled.button`
  width: 392px;
  height: 48px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.1px;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: auto 24px;
  border: 0;
  border-radius: 4px;
  text-transform: uppercase;
  line-height: 48px !important;
  margin-top: 10px;
  z-index: 10005;
  cursor: pointer;
  z-index: 4;
  :hover {
    opacity: 0.6;
  }
  :first-child {
    background-color: #6db2c5;
  }
`;
function DeletePopup() {
  //recoil.ts 참고
  const setMode = useSetRecoilState(modeAtom);
  const setResolution = useSetRecoilState(resolutionAtom);
  const [isDeleting, setIsDeleting] = useRecoilState(isDeletingAtom);
  const isFromModal = useRecoilValue(isFromModalAtom);
  const setData = useSetRecoilState(dataAtom);
  const [checkedList, setCheckedList] = useRecoilState(checkedListAtom);

  return (
    <Wrapper>
      <Background>
        <Section>
          <ImgWrap>
            <img
              src={
                "https://resources.archisketch.com/editor/assets_test/img/pop-up/gallery_delete@2x.gif"
              }
              alt="삭제 이미지"
            />
          </ImgWrap>
          <MessageWrap>
            <br />
            <h5>
              {isDeleting.length === 0
                ? "확인"
                : `${isDeleting.length}개의 이미지가 선택되었습니다.`}
            </h5>
            <span>
              <br />
              정말 이 이미지를 삭제 하시겠습니까?
            </span>
          </MessageWrap>
          <ButtonBox>
            <Button
              onClick={() =>
                deleteImg(
                  setData,
                  checkedList,
                  isDeleting,
                  setIsDeleting,
                  setCheckedList,
                  setResolution,
                  setMode,
                  isFromModal
                )
              }
            >
              삭제
            </Button>
            <Button onClick={() => setIsDeleting([])}>돌아가기</Button>
          </ButtonBox>
        </Section>
      </Background>
    </Wrapper>
  );
}
export default DeletePopup;
