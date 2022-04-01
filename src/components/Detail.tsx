import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  dataAtom,
  selectedCardAtom,
  selectedCardIndexSelector,
} from "./recoil";
import testJson from "../test.json";

const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 56px);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background: rgb(250, 250, 250);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: rgb(250, 250, 250);
  }
`;

const PrevArrow = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translate(0px, -50%);
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  font-size: 28px;
  background: rgb(243, 244, 244);
  transition: all 0.32s ease 0s;
  cursor: pointer;
`;

const NextArrow = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translate(0px, -50%);
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  font-size: 28px;
  background: rgb(243, 244, 244);
  transition: all 0.32s ease 0s;
  cursor: pointer;
`;
function Detail() {
  const data = useRecoilValue(dataAtom);
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardAtom);
  const selectedCardIndex = useRecoilValue(selectedCardIndexSelector);
  console.log(selectedCardIndex);
  return (
    <Wrapper>
      {selectedCardIndex !== 0 && (
        <PrevArrow
          onClick={() => setSelectedCard(data[selectedCardIndex - 1]._id)}
        >
          &#129044;
        </PrevArrow>
      )}
      {selectedCardIndex !== data.length && (
        <NextArrow
          onClick={() => setSelectedCard(data[selectedCardIndex + 1]._id)}
        >
          &#10141;
        </NextArrow>
      )}
      <img src={selectedCard} alt="이미지"></img>
    </Wrapper>
  );
}

export default Detail;
