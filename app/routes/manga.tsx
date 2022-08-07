import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getTopMangas } from "~/models/topmanga.server";
import React, { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { TopManga } from '../types'

type LoaderData = {
  data: Awaited<ReturnType<typeof getTopMangas>>;
};

export const loader = async () => {
  return json<LoaderData>({
    data: await getTopMangas(),
  });
};

export default function mangaRoute() {
  const { data } = useLoaderData() as LoaderData;
  console.log(data);

  let timer = null;
  let elems = useRef([]);
  let timeline = gsap.timeline({
    defaults: {
      duration: 0.75,
      ease: "power3.inOut",
    },
    paused: true,
  });

  const gallery = [
    {
      title: "title one",
      cover:
        "https://images.unsplash.com/photo-1617643049820-f072111ac920?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80",
    },
    {
      title: "title two",
      cover:
        "https://images.unsplash.com/photo-1617643606475-99ad26026885?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80",
    },
    {
      title: "title three",
      cover:
        "https://icons8.com/wp-content/uploads/2020/02/digital-illustration-brian-edward-miller.jpg",
    },
    {
      title: "title four",
      cover:
        "https://maxcdn.icons8.com/app/uploads/2019/06/digital-illustration-brian-edward-miller-7.jpg",
    },
  ];

  const [state, setState] = useState({ current: 0, next: 1 });
  const [userDetected, setUserDetected] = useState(false);

  /**
   * @TODO
   * create a state that holds two values [ current: number, next: number]
   * create an event handler that set the state the current number
   * and calculate what will be the next value
   */

  const activateTimer = () => {
    timer = setTimeout(() => {
      stepForward();
    }, 4000);
  };

  const calculateIndexs = (index) => {
    if (index === gallery.length - 1) {
      setState({ current: index, next: 0 });
    } else {
      setState({ current: index, next: index + 1 });
    }
  };

  const flowUp = (onComplete) => {
    timeline
      .to(elems.current[0], { y: "-100%", opacity: 0, scale: -0.5 })
      .to(
        elems.current[1],
        {
          y: "-100%",
          opacity: 1,
          scale: 1,
          onComplete,
        },
        "-=0.75"
      )
      .play();
  };

  const fadeOut = (onComplete) => {
    timeline
      .to(elems.current[0], {
        duration: 0.5,
        opacity: 0,
        onComplete,
      })
      .to(elems.current[0], { opacity: 1 })
      .play();
  };

  const handleChange = (index) => {
    if (index !== state.current) {
      clearTimeout(timer);
      setUserDetected(true);
      fadeOut(() => calculateIndexs(index));
    }
  };

  const stepForward = () => {
    setUserDetected(false);
    flowUp(() => calculateIndexs(state.next));
  };

  useLayoutEffect(() => {
    const image1 = !!elems.current[0] && elems.current[0];
    const image2 = !!elems.current[1] && elems.current[1];

    activateTimer();

    gsap.set(image2, { y: "0%", opacity: 0, scale: 1 });
    if (userDetected) {
      gsap.set(image1, { y: "0%", opacity: 0, scale: 1 });
    } else {
      gsap.set(image1, { y: "0%", opacity: 1, scale: 1 });
    }

    return () => {
      clearTimeout(timer);
    };
  }, [state]);

  return (
    <div>
      <div className='relative w-full overflow-hidden bg-black h-80 after:absolute after:top-0 after:left-0 after:right-0 after:content-none after:w-full after:h-full after:bg-[#040404d5]'>
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
      </div>

      <div>
        <div className='grid grid-cols-4 gap-4'>
          {/*  */}
          {data.map((manga) => (
            <div className='p-8' key={manga.attributes.titles.en_us}>
            
 
                  <article
                  className='mx-auto max-w-sm shadow-xl bg-cover bg-center min-h-150 transform duration-500 hover:-translate-y-2 cursor-pointer group'
                  style={{
                    backgroundImage: `url(${manga?.attributes?.posterImage?.original})`,
                  }}
                >
                    
                 <div className='bg-black bg-opacity-20 min-h-150 px-10 flex flex-wrap flex-col pt-96 hover:bg-opacity-75 transform duration-300'>
                    <h1 className='text-white text-3xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300'>
                      {manga.attributes.titles.en_us}
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
      </div>
    </div>
  );
}
