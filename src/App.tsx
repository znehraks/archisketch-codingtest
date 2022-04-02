import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { dataAtom } from "./components/recoil";
import GlobalStyles from "./components/styles/GlobalStyles";
import Gallery from "./Gallery";
import testJson from "./test.json";
import Helmet from "react-helmet";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/styles/theme";
function App() {
  //recoil.ts 참고
  const setData = useSetRecoilState(dataAtom);
  //최초 실행 시, data에 json 파일내용 추가
  //로컬에서만 돌아가므로, 새로고침 시, 삭제된 data들이 모두 복구됨.
  useEffect(() => {
    setData(testJson.renderings);
  }, [setData]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Helmet>
          <title>Archisketch - Web Editor</title>
        </Helmet>
        <GlobalStyles />
        <Gallery />
      </ThemeProvider>
    </>
  );
}

export default App;
