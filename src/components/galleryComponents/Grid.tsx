import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { dataAtom } from "../recoil";
import ImgComponent from "./ImgComponent";

const GridView = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 7px;
  padding: 0 32px 32px;
`;
function Grid() {
  const data = useRecoilValue(dataAtom);
  return (
    <GridView>
      {data?.map((item) => (
        <ImgComponent key={item._id} itemId={item._id} />
      ))}
    </GridView>
  );
}
export default Grid;
