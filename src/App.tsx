import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { dataAtom } from "./components/recoil";
import GlobalStyles from "./components/styles/GlobalStyles";
import Gallery from "./Gallery";
import testJson from "./test.json";

function App() {
  const setData = useSetRecoilState(dataAtom);
  useEffect(() => {
    setData(testJson.renderings);
  }, []);
  return (
    <>
      <GlobalStyles />
      <Gallery />
    </>
  );
}

export default App;
