import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { dimModeState, lightModeState, modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import TransitionsModal from "../components/ModalPage";
import RightSidebar from "../components/right sidebar/RightSidebar";
import useTitle from "../hooks/useTitle";

function Home() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  const [lightTheme, setLightTheme] = useRecoilState(lightModeState);
  const [dimTheme, setDimTheme] = useRecoilState(dimModeState);

  useTitle("Home | Twitter By Mahdi");

  return (
    <main
      className={`dark:bg-black min-w-full min-h-screen flex max-w-[1500px] mx-auto ${
        lightTheme && "bg-white"
      } ${dimTheme && "bg-[#15202b]"}`}
    >
      <Sidebar />
      <Feed lightTheme={lightTheme} dimTheme={dimTheme} />
      <RightSidebar />
      {isOpen && <TransitionsModal />}
    </main>
  );
}

export default Home;
