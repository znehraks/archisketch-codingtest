import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDeletingAtom, modeAtom } from "./components/recoil";
import Detail from "./components/galleryComponents/Detail";
import DeletePopup from "./components/galleryComponents/DeletePopup";
import Grid from "./components/galleryComponents/Grid";
import Title from "./components/galleryComponents/Title";
import FixedHeader from "./components/galleryComponents/FixedHeader";

const Wrapper = styled.div`
  width: 99vw;
  height: auto;
`;
const ContentWrapper = styled.div`
  padding-top: 56px;
`;
function Gallery() {
  //recoil.ts 참고
  const mode = useRecoilValue(modeAtom);
  const isDeleting = useRecoilValue(isDeletingAtom);

  return (
    <Wrapper>
      <FixedHeader />
      <ContentWrapper>
        {isDeleting.length !== 0 ? (
          <DeletePopup />
        ) : (
          <>
            {mode === "GRID" ? (
              <>
                <Title />
                <Grid />
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
