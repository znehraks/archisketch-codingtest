import testJson from "./test.json";
import styled from "styled-components";
//Header

//Wrapper > Grid view >

const Wrapper = styled.div`
  width: 99vw;
  height: auto;
`;
const Header = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 8px;
  button {
    width: 42px;
    padding: 8px;
  }
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
    :first-child {
      justify-content: flex-start;
    }
  }
`;
const Span = styled.span``;
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
const ImgWrapper = styled.div`
  flex: 0 1 20%;
  width: 20%;
`;

const ImgCardWrapper = styled.div`
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  transition: box-shadow 0.25s ease 0s;
  margin: 9px;
  box-shadow: none;
`;
const ImgCardInnerWrapper = styled(ImgCardWrapper)`
  width: 100%;
  overflow: hidden;
  padding-top: 71%;
  :hover {
    background-color: #000;
  }
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
  }
`;
// 체크박스 만든 후, 선택한 것에 따라 위에 표시
// 모두선택 체크 박스 만들기
// 다운로드,삭제 기능 구현
// 선택취소 구현
// 개별 카드에서 다운로드, 삭제 구현
// 상세 페이지 확대 창 구현
// 양옆 화살표 구현
const Gallery = () => {
  return (
    <Wrapper>
      <Header>
        <button>X</button>
      </Header>
      <Title>
        <div>
          <Span>81 개의 랜더샷</Span>
        </div>
        <div>
          <TitleSpan>갤러리</TitleSpan>
        </div>
        <div />
      </Title>
      <GridView>
        {testJson?.renderings?.map((item) => (
          <ImgWrapper>
            <ImgCardWrapper>
              <ImgCardInnerWrapper>
                <img src={item._id} alt={"인테리어"}></img>
              </ImgCardInnerWrapper>
            </ImgCardWrapper>
          </ImgWrapper>
        ))}
      </GridView>
    </Wrapper>
  );
};

export default Gallery;
