export default function IndexRoute() {
    return (
        <div>
            <div className="flex overflow-hidden w-full text-sm font-medium relative max-w-screen-xl max-h-screen h-screen rounded-[90px] shadow-indigo-500/40">
            {/* sidebar below */}
            <div className="w-56 h-full p-8 flex flex-col flex-shrink-0 overflow-y-auto overflow-x-hidden duration-300">
            {/* logo below */}
            <span className="logo text-white">S</span>
            <a className="no-underline text-white text-lg font-semibold leading-8 sticky top-0      before:absolute before:left-0 before:w-48 before:h-16 before:content-none before:-top-8 before:-z-1" href="#">skateboard</a>
            <div className="w-40 border-b-0 p-9">
            <div className="text-xs mb-6 tracking-wider text-white">MENU</div>
            <div className="flex flex-col">
            <a className="flex items-center no-underline mt-6 text-white" href="#">Discover</a>
            </div>
            </div>
            </div>
            </div>
        </div>
    );
  }