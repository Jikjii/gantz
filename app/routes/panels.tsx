import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import type { Panel } from "@prisma/client";
import { json } from "@remix-run/node";

import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import Nav from "~/components/Nav";

// overfetching - we only need the title, image and description
// type LoaderData = {
//   panelsListItems: Array<Panel>;
// };

type LoaderData = {
  panelsListItems: Array<{
    title: string | null;
    image: string | null;
    description: string | null;
    id: string;
  }>;
};

// variable loader is a LoaderFunction which is awaiting the data
// thats coming from the db
export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    panelsListItems: await db.panel.findMany({
      take: 5,
      select: { title: true, image: true, description: true, id: true },
      orderBy: { createdAt: "desc" },
    }),
  };
  return json(data);
};

export default function PanelsRoute() {
  const { panelsListItems } = useLoaderData<LoaderData>();
  console.log(panelsListItems);

  return (
    <div>
      <Nav />
      {/* <h1 className='text-3xl text-white'>PANELS (づ｡◕‿‿◕｡)づ</h1> */}

      <div className='flex h-screen'>
        <div className='m-auto'>
        <Outlet />
          {/* demo wrapper */}
          <div className='mb-48 w-11/12 h-5/6 mt-12'>
            <div className='absolute w-48 h-48 inline-block overflow-hidden text-teal-400 bg-transparent '>
              {/* <img
                className='card-img-top'
                src='https://i.pinimg.com/564x/ff/e4/68/ffe468759153a38698a1741f3bf5fa9c.jpg'
                alt=''
              /> */}
            </div>
          </div>
          {/* demo wrapper */}
        </div>
      </div>

      <main>
        {/* CARDS */}

        <div>
          <div className='grid grid-cols-4 gap-4'>
            {/*  */}
            {panelsListItems.map((panel) => (
              <Link to={panel.id}>
                <div className='p-8' key={panel.id}>
                  <article
                    className='mx-auto max-w-sm shadow-xl bg-cover bg-center min-h-150 transform duration-500 hover:-translate-y-2 cursor-pointer group '
                    style={{
                      backgroundImage: `url(${panel.image})`,
                    }}
                  >
                    <div className='bg-black bg-opacity-20 min-h-150 px-10 flex flex-wrap flex-col pt-96 hover:bg-opacity-75 transform duration-300'>
                      <h1 className='text-white text-3xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300'>
                        {panel.title}
                      </h1>
                      <div className='w-16 h-2 bg-orange-500 rounded-full mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300'></div>
                      <p className='opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime, beatae!
                      </p>
                    </div>
                  </article>
                </div>
              </Link>
            ))}

            {/*  */}
          </div>
        </div>

        {/* <div className='flex min-h-screen w-full flex-wrap content-center justify-center p-5'>
          <div className='grid grid-cols-3 gap-8'>
            <div className='w-80 bg-white p-3'>
              <img
                className='h-auto w-full object-cover rounded-lg'
                src={data.panelsListItems[0].image}
              />
              <ul className='mt-3 flex flex-wrap'>
                <li className='mr-auto'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z'
                      />
                    </svg>
                    1
                  </a>
                </li>
                <li className='mr-2'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z'
                      />
                    </svg>
                    24
                  </a>
                </li>
                <li className='mr-2'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z'
                      />
                    </svg>
                    3
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z'
                      />
                    </svg>
                    3
                  </a>
                </li>
              </ul>
            </div>

            <div className='w-80 bg-white p-3'>
              <img
                className='h-52 w-full object-cover'
                src='https://i.imgur.com/fjXFX93.jpeg'
              />
              <ul className='mt-3 flex flex-wrap'>
                <li className='mr-auto'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z'
                      />
                    </svg>
                    1
                  </a>
                </li>
                <li className='mr-2'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z'
                      />
                    </svg>
                    24
                  </a>
                </li>
                <li className='mr-2'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z'
                      />
                    </svg>
                    3
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z'
                      />
                    </svg>
                    3
                  </a>
                </li>
              </ul>
            </div>

            <div className='w-80 bg-white p-3'>
              <img
                className='h-52 w-full object-cover'
                src='https://i.imgur.com/ISpNf4j.jpeg'
              />
              <ul className='mt-3 flex flex-wrap'>
                <li className='mr-auto'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z'
                      />
                    </svg>
                    1
                  </a>
                </li>
                <li className='mr-2'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z'
                      />
                    </svg>
                    24
                  </a>
                </li>
                <li className='mr-2'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z'
                      />
                    </svg>
                    3
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z'
                      />
                    </svg>
                    3
                  </a>
                </li>
              </ul>
            </div>

            <div className='w-80 bg-white p-3'>
              <img
                className='h-52 w-full object-cover'
                src='https://i.imgur.com/DBpznrn.jpeg'
              />
              <ul className='mt-3 flex flex-wrap'>
                <li className='mr-auto'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z'
                      />
                    </svg>
                    1
                  </a>
                </li>
                <li className='mr-2'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z'
                      />
                    </svg>
                    24
                  </a>
                </li>
                <li className='mr-2'>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z'
                      />
                    </svg>
                    3
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex text-gray-400 hover:text-gray-600'
                  >
                    <svg
                      className='mr-0.5'
                      style={{ width: "24px", height: "24px" }}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z'
                      />
                    </svg>
                    3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
        {/* CARDS */}
        
      </main>
    </div>
  );
}
