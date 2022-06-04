import React, { useEffect } from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
// import Modal from "../components/Modal";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import TransitionsModal from "../components/ModalPage";

function Home() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  useEffect(() => {
    document.title = "Home | Twitter By Mahdi";
  }, []);

  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
      <Sidebar />
      <Feed />
      {isOpen && <TransitionsModal />}
    </main>
  );
}

export default Home;
