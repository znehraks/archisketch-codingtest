import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  checkedListAtom,
  isDeletingAtom,
  modeAtom,
  resolutionAtom,
  selectedCardAtom,
} from "../recoil";
import trashcanImg from "../styles/images/trashcan.svg";
import downloadImg from "../styles/images/download.svg";
import { download } from "./functions";
const Wrapper = styled.div`
  background-color: #fff;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px;
  position: fixed;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    :last-child {
      margin-right: 30px;
      span {
        cursor: pointer;
        img {
          margin-right: 4px;
        }
        padding: 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        :hover {
          border-color: ${(props) => props.theme.accentColor};
          color: ${(props) => props.theme.accentColor};
        }
      }
    }
  }
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
function FixedHeader() {
  //recoil.ts 참고
  const [mode, setMode] = useRecoilState(modeAtom);
  const selectedCard = useRecoilValue(selectedCardAtom);
  const setIsDeleting = useSetRecoilState(isDeletingAtom);
  const checkedList = useRecoilValue(checkedListAtom);
  const [resolution, setResolution] = useRecoilState(resolutionAtom);

  return (
    <Wrapper>
      <div>
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
      </div>
      <div>
        {mode === "DETAIL" && (
          <>
            <span onClick={() => download(checkedList)}>
              <img src={downloadImg} alt={"다운로드"} />
              다운로드
            </span>
            <span onClick={() => setIsDeleting([selectedCard])}>
              <img src={trashcanImg} alt={"삭제"} />
            </span>
          </>
        )}
      </div>
    </Wrapper>
  );
}
export default FixedHeader;
