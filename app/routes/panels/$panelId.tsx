import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Panel } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { panel: Panel };

export const loader: LoaderFunction = async ({ params }) => {
  const panel = await db.panel.findUnique({
    where: { id: params.panelId },
  });
  if (!panel) throw new Error("Panel not found");
  const data: LoaderData = { panel };
  return json(data);
};

export default function () {
  const data = useLoaderData<LoaderData>();
  console.log(data)
  return (
    <div>
        <img src={data.panel.image} />
      <h1 className='text-white'>Panel Page</h1>
      <h1 className='text-white'>{data.panel.title}</h1>
    </div>
  );
}
