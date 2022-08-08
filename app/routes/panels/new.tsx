import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

import { db } from "~/utils/db.server";

// validation
function validatePanelTitle(title: string) {
  if (title.length < 3) {
    return `That title is too short. It must be at least 3 characters long.`;
  }
}

function validatePanelImage(image: string) {
  if (image.length < 5) {
    return `ImageUrl is too short. It must be at least 5 characters long.`;
  }
}

function validatePanelDescription(description: string) {
  if (description.length < 5) {
    return `That Description is too short. It must be at least 5 characters long.`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    title: string | undefined;
    image: string | undefined;
    description: string | undefined;
  };
  fields?: {
    title: string;
    image: string;
    description: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const image = form.get("image");
  const description = form.get("description");

  if (
    typeof title !== "string" ||
    typeof image != "string" ||
    typeof description !== "string"
  ) {
    return badRequest({
      formError: "Please fill out all fields correctly.",
    });
  }

  const fieldErrors = {
    title: validatePanelTitle(title),
    image: validatePanelImage(image),
    description: validatePanelDescription(description),
  };

  const fields = { title, image, description };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const panel = await db.panel.create({ data: fields });
  return redirect(`/panels/${panel.id}`);
};

export default function NewPanelRoute() {
  const actionData = useActionData<ActionData>();
  return (
    <div className='flex h-screen bg-gray-100'>
      <div className='m-auto'>
        <div>
          <h1 className='text-6xl uppercase font-extrabold'>
            Add your own panel
          </h1>

          <p className='text-4xl font-light pt-16'>Form</p>

          <div className='mt-5 bg-white rounded-lg shadow'>
            <div className='flex'>
              <div className='flex-1 py-5 pl-5 overflow-hidden'>
                <svg
                  className='inline align-text-top'
                  height='24px'
                  viewBox='0 0 24 24'
                  width='24px'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='#000000'
                >
                  <g>
                    <path
                      d='m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z'
                      fill='none'
                      id='svg_1'
                      stroke='null'
                    ></path>
                    <path
                      d='m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z'
                      id='svg_2'
                    ></path>
                    <circle
                      cx='7.04807'
                      cy='6.97256'
                      r='2.5'
                      id='svg_3'
                    ></circle>
                  </g>
                </svg>
                <h1 className='inline text-2xl font-semibold leading-none'>
                  Sender
                </h1>
              </div>
            </div>
            <div className='px-5 pb-5'>
              <form method='post'>
                {/* <label>Name</label>
                <input
                  placeholder='Name'
                  type='text'
                  name='name'
                  className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                /> */}
                <label>Title</label>
                <input
                  placeholder='Title'
                  type='text'
                  defaultValue={actionData?.fields?.title}
                  name='title'
                  aria-invalid={
                    Boolean(actionData?.fieldErrors?.title) || undefined
                  }
                  aria-errormessage={
                    actionData?.fieldErrors?.title ? "name-error" : undefined
                  }
                  className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                />
                <div>
                  {actionData?.fieldErrors?.title ? (
                    <p
                      className='form-validation-error'
                      role='alert'
                      id='name-error'
                    >
                      {actionData.fieldErrors.title}
                    </p>
                  ) : null}
                </div>
                <label>Image</label>
                <input
                  placeholder='Image'
                  defaultValue={actionData?.fields?.image}
                  type='text'
                  name='image'
                  aria-invalid={
                    Boolean(actionData?.fieldErrors?.image) || undefined
                  }
                  aria-errormessage={
                    actionData?.fieldErrors?.image ? "name-error" : undefined
                  }
                  className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                />
                <div>
                  {actionData?.fieldErrors?.image ? (
                    <p
                      className='form-validation-error'
                      role='alert'
                      id='name-error'
                    >
                      {actionData.fieldErrors.image}
                    </p>
                  ) : null}
                </div>
                <div className='flex'>
                  <div className='flex-grow w-1/4 pr-2'>
                    <label>Description</label>
                    <textarea
                      defaultValue={actionData?.fields?.description}
                      name='description'
                      aria-invalid={
                        Boolean(actionData?.fieldErrors?.description) ||
                        undefined
                      }
                      aria-errormessage={
                        actionData?.fieldErrors?.description
                          ? "content-error"
                          : undefined
                      }
                      placeholder='Enter a brief description'
                      className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                    />
                    <div>
                      {actionData?.fieldErrors?.description ? (
                        <p
                          className='form-validation-error'
                          role='alert'
                          id='content-error'
                        >
                          {actionData.fieldErrors.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  {/* <div className='flex-grow'>
                    <label>Manga</label>
                    <input
                      placeholder='City'
                      className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                    />
                  </div> */}
                </div>
                {/* <div className='flex items-center pt-3'>
                  <input
                    type='checkbox'
                    className='w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent'
                  />
                  <label className='block ml-2 text-sm text-gray-900'>
                    Save as default address
                  </label>
                </div> */}
                {/*  */}
                <div className='flex-initial pl-3'>
                  {actionData?.formError ? (
                    <p className='form-validation-error' role='alert'>
                      {actionData.formError}
                    </p>
                  ) : null}
                  <button
                    type='submit'
                    className='flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='24px'
                      viewBox='0 0 24 24'
                      width='24px'
                      fill='#FFFFFF'
                    >
                      <path d='M0 0h24v24H0V0z' fill='none'></path>
                      <path
                        d='M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z'
                        opacity='.3'
                      ></path>
                      <path d='M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z'></path>
                    </svg>
                    <span className='pl-2 mx-1'>Save</span>
                  </button>
                </div>
                {/*  */}
              </form>
            </div>

            <div className='px-5 '></div>
            <hr className='mt-4' />
            <div className='flex flex-row-reverse p-3'>
              <div className='flex-initial pl-3'>
                <button
                  type='button'
                  className='flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24px'
                    viewBox='0 0 24 24'
                    width='24px'
                    fill='#FFFFFF'
                  >
                    <path d='M0 0h24v24H0V0z' fill='none'></path>
                    <path
                      d='M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z'
                      opacity='.3'
                    ></path>
                    <path d='M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z'></path>
                  </svg>
                  <span className='pl-2 mx-1'>Save</span>
                </button>
              </div>
              <div className='flex-initial'>
                <button
                  type='button'
                  className='flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24px'
                    viewBox='0 0 24 24'
                    width='24px'
                  >
                    <path d='M0 0h24v24H0V0z' fill='none'></path>
                    <path d='M8 9h8v10H8z' opacity='.3'></path>
                    <path d='M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z'></path>
                  </svg>
                  <span className='pl-2 mx-1'>Delete</span>
                </button>
              </div>
            </div>
          </div>

          <p className='text-4xl font-light pt-16'>Buttons</p>

          <div className='py-2'>
            <button
              type='button'
              className='flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-gray-300  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                enable-background='new 0 0 24 24'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill='#000000'
              >
                <g>
                  <rect fill='none' height='24' width='24'></rect>
                </g>
                <g>
                  <g>
                    <polygon
                      opacity='.3'
                      points='14.17,11 13,11 13,5 11,5 11,11 9.83,11 12,13.17'
                    ></polygon>
                    <rect height='2' width='14' x='5' y='18'></rect>
                    <path d='M19,9h-4V3H9v6H5l7,7L19,9z M11,11V5h2v6h1.17L12,13.17L9.83,11H11z'></path>
                  </g>
                </g>
              </svg>
              <span className='pl-2 mx-1 text-black'>Download</span>
            </button>
          </div>

          <div className='py-2'>
            <button
              type='button'
              className='flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
              >
                <path d='M0 0h24v24H0V0z' fill='none'></path>
                <path d='M8 9h8v10H8z' opacity='.3'></path>
                <path d='M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z'></path>
              </svg>
              <span className='pl-2 mx-1'>Delete</span>
            </button>
          </div>

          <div className='py-2'>
            <button
              type='button'
              className='flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill='#FFFFFF'
              >
                <path d='M0 0h24v24H0V0z' fill='none'></path>
                <path d='M8 5h8v3H8z' opacity='.3'></path>
                <circle cx='18' cy='11.5' r='1'></circle>
                <path d='M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 14H8v-4h8v4zm4-4h-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4z'></path>
                <path
                  d='M6 13h12v2h2v-4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4h2v-2zm12-2.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z'
                  opacity='.3'
                ></path>
              </svg>
              <span className='pl-2 mx-1'>Print</span>
            </button>
          </div>

          <div className='py-2'>
            <button
              type='button'
              className='flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill='#FFFFFF'
              >
                <path d='M0 0h24v24H0V0z' fill='none'></path>
                <path
                  d='M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z'
                  opacity='.3'
                ></path>
                <path d='M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z'></path>
              </svg>
              <span className='pl-2 mx-1'>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
