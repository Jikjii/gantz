import LandingPage from "~/components/LandingPage";
import Nav from "~/components/Nav";

export default function IndexRoute() {
  return (
    <div>
      <Nav />
      <LandingPage />



      {/* <div className='flex overflow-hidden w-full text-sm font-medium relative max-w-screen-xl max-h-screen h-screen rounded-[90px] shadow-indigo-500/40'>
     
        <div className='w-56 h-full p-8 flex flex-col flex-shrink-0 overflow-y-auto overflow-x-hidden duration-300'>
         
          <span className='logo text-white'>S</span>
          <a
            className='no-underline text-white text-lg font-semibold leading-8 sticky top-0      before:absolute before:left-0 before:w-48 before:h-16 before:content-none before:-top-8 before:-z-1'
            href='#'
          >
            skateboard
          </a>
          <div className='w-40 border-b-0 p-9'>
            <div className='text-xs mb-6 tracking-wider text-white'>MENU</div>
            <div className='flex flex-col'>
              <a
                className='flex items-center no-underline mt-6 text-white'
                href='#'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                </svg>{" "}
                <h1 className='text-white pr-4'>Discover</h1>
              </a>
              <a
                className='flex items-center no-underline mt-6 text-white'
                href='#'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                </svg>{" "}
                <h1 className='text-white pr-4'>Discover</h1>
              </a>
              <a
                className='flex items-center no-underline mt-6 text-white'
                href='#'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                </svg>{" "}
                <h1 className='text-white pr-4'>Discover</h1>
              </a>
              <a
                className='flex items-center no-underline mt-6 text-white'
                href='#'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                </svg>{" "}
                <h1 className='text-white pr-4'>Discover</h1>
              </a>
              <a
                className='flex items-center no-underline mt-6 text-white'
                href='#'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                </svg>{" "}
                <h1 className='text-white pr-4'>Discover</h1>
              </a>
            </div>
          </div>
          <div className='w-40 border-b-0 p-9'>
            <div className='text-xs mb-6 tracking-wider text-white'>MENU</div>
            <div className='flex flex-col'>
              <a
                className='flex items-center no-underline mt-6 text-white'
                href='#'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                </svg>{" "}
                <h1 className='text-white pr-4'>Panels</h1>
              </a>
              <a
                className='flex items-center no-underline mt-6 text-white'
                href='#'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                </svg>{" "}
                <h1 className='text-white pr-4'>Sketches</h1>
              </a>
              <a
                className='flex items-center no-underline mt-6 text-white'
                href='#'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                </svg>{" "}
                <h1 className='text-white pr-4'>Digital Art</h1>
              </a>
              <a
                className='flex items-center no-underline mt-6 text-white'
                href='#'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                </svg>{" "}
                <h1 className='text-white pr-4'>Community</h1>
              </a>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-grow'>
          <div className='flex items-center flex-shrink-0 p-8'>
            <div className='h-8 flex w-full max-w-md'>
              <input
                type='text'
                placeholder='Search'
                className='w-full h-full rounded-lg text-sm font-medium bg-no-repeat text-white border-none bg-slate-400 pr-1.5 pl-4 shadow-md'
              />
            </div>
            <div className="flex items-center pl-5 flex-shrink-0 ml-auto">
            <img className="w-8 h-8 flex-shrink-0 object-cover rounded-full" src="https://images.unsplash.com/photo-1587918842454-870dbd18261a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=943&q=80" alt="" />
            </div>
          </div>
        </div>
      </div> 
      */}
    </div>
  );
}
