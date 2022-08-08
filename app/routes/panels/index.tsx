import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { Panel } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { randomPanel: Panel };

export const loader: LoaderFunction = async () => {
  const count = await db.panel.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomPanel] = await db.panel.findMany({
    take: 1,
    skip: randomRowNumber,
  });
  const data: LoaderData = { randomPanel };
  return json(data);
};

export default function PanelIndexRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <h1 className='text-3xl font-semibold underline text-white'>
        Here's a random panel
      </h1>
      <Link to={data.randomPanel.id}><h1 className='text-3xl font-semibold underline text-white'>"{data.randomPanel.title}" Link</h1></Link>
    </div>
  );
}
