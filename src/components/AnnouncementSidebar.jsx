/* eslint-disable react/jsx-no-comment-textnodes */
export default function AnnouncementSidebar() {
  return (
    <>
    
    <div className="w-[350px] h-[90vh] bg-acqa flex flex-col">
      <div className="w-auto h-[50%] gap-1 flex flex-col items-center">
        <p className="text-white font-bold text-center pt-3">
          <a href="">i-Shop Announcement </a>
        </p>
      </div>

      <div className="flex flex-col items-center justify-end h-[300px] grow-[3]">
        <a
          href="https://souq.iium.edu.my/"
          target="_blank" rel="noreferrer"
          className="border p-4 rounded-xl text-white font-bold mb-5"
        >
          I-Malum Advertisements
        </a>
      </div>
    </div>
    </>
  );
}
