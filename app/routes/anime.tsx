import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAnimes } from "~/models/anime.server";
import gsap from "gsap";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";


type LoaderData = {
  data: Awaited<ReturnType<typeof getAnimes>>;
};

export const loader = async () => {
  return json<LoaderData>({
    data: await getAnimes(),
  });
};







export default function animeRoute() {
    const { data } = useLoaderData() as LoaderData;
  console.log(data);
  const [offset, setOffset] = useState(0);

  const handleNavigation = (e) => {
    e.preventDefault()
    setOffset(offset + 20)
    console.log(offset)
}

  return (
    <div>
      {/* <div className='relative w-full overflow-hidden bg-black h-80 after:absolute after:top-0 after:left-0 after:right-0 after:content-none after:w-full after:h-full after:bg-[#040404d5]'>
        <div className='relative h-full w-full'>
          <img
            ref={(elem) => (elems.current[0] = elem)}
            src={gallery[state.current].cover}
            alt=''
            className='w-full h-full object-cover object-center'
          />
          <p className='absolute text-white font-bold uppercase bottom-8 left-4 z-100'>
            {gallery[state.current].title}
          </p>
        </div>
        <div className='relative h-full w-full'>
          <img
            ref={(elem) => (elems.current[1] = elem)}
            src={gallery[state.next].cover}
            alt=''
            className='w-full h-full object-cover object-center'
          />
          <p>{gallery[state.next].title}</p>
        </div>
        <div className='absolute w-2/5 h-12 flex items-center bottom-8 right-4 z-100'>
          {gallery.map((_item, index) =>
            index === state.current ? (
              <span
                key={`stripe${index}`}
                onClick={() => handleChange(index)}
                style={{ opacity: 1 }}
                className='w-16 h-1 bg-white block m-4 cursor-pointer content-none rounded-xl'
              ></span>
            ) : (
              <span
                key={`stripe${index}`}
                onClick={() => handleChange(index)}
                style={{ opacity: 0.5 }}
                className='w-16 h-1 bg-white block m-4 cursor-pointer content-none rounded-xl'
              ></span>
            )
          )}
        </div>
      </div> */}


      <div className="flex h-screen">
        <form className="m-auto">
            <div className="flex">
                <input placeholder="Search" />

            </div>

   

        </form>
      </div>

      <div>
        <div className='grid grid-cols-4 gap-4'>
          {/*  */}
          {data.map((anime) => (
            <div className='p-8' key={anime.attributes.titles.en_us}>
              <article
                className='mx-auto max-w-sm shadow-xl bg-cover bg-center min-h-150 transform duration-500 hover:-translate-y-2 cursor-pointer group'
                style={{
                  backgroundImage: `url(${anime?.attributes?.posterImage?.original})`,
                }}
              >
                <div className='bg-black bg-opacity-20 min-h-150 px-10 flex flex-wrap flex-col pt-96 hover:bg-opacity-75 transform duration-300'>
                  <h1 className='text-white text-3xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300'>
                    {anime.attributes.titles.en_us}
                  </h1>
                  <div className='w-16 h-2 bg-orange-500 rounded-full mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300'></div>
                  <p className='opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime, beatae!
                  </p>
                </div>
              </article>
            </div>
          ))}

          {/*  */}
        </div>
        <div className="flex">
                <button className="bg-orange-600 rounded-xl" onClick={handleNavigation}>Show More</button>
        </div>
      </div>
    </div>
  );
}
