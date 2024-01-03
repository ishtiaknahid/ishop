import Nav from "../components/Nav";
import AnnouncementSidebar from "../components/AnnouncementSidebar.jsx";
import ImageSlider from "../components/ImageSlider";
import { announcementImages } from '../assets/announcementSliderImage';
import Footer from "../sections/Footer.jsx";

export default function Announcement() {
  return (
    <>
      <Nav />
      <div className="flex">
        {/* sidebar */}
        <AnnouncementSidebar />

        <div className="flex-10 flex flex-col justify-center w-full main">
          <div className="h-[69.5vh] overflow-scroll overflow-x-hidden">
            <ul>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
              <li className="border border-red-700 h-10 m-auto w-[80%]"></li>
            </ul>
          </div>
          <div className="">          
            <ImageSlider images={announcementImages} imgSize={'w-[100%]'} /></div>
          </div>
      </div>
      <Footer/>
    </>
  );
}
