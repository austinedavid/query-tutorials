interface Idetails {
  id: number;
  name: string;
  desc: string;
}

const students: Idetails[] = [
  { id: 1, name: "david", desc: "david is a programmer" },
  { id: 2, name: "david", desc: "david is a programmer" },
  { id: 3, name: "david", desc: "david is a programmer" },
  { id: 4, name: "david", desc: "david is a programmer" },
  { id: 5, name: "david", desc: "david is a programmer" },
  { id: 6, name: "david", desc: "david is a programmer" },
  { id: 7, name: "david", desc: "david is a programmer" },
  { id: 8, name: "david", desc: "david is a programmer" },
  { id: 9, name: "david", desc: "david is a programmer" },
  { id: 10, name: "david", desc: "david is a programmer" },
  { id: 11, name: "david", desc: "david is a programmer" },
  { id: 12, name: "david", desc: "david is a programmer" },
  { id: 13, name: "david", desc: "david is a programmer" },
  { id: 14, name: "david", desc: "david is a programmer" },
  { id: 15, name: "david", desc: "david is a programmer" },
  { id: 16, name: "david", desc: "david is a programmer" },
  { id: 17, name: "david", desc: "david is a programmer" },
  { id: 18, name: "david", desc: "david is a programmer" },
  { id: 19, name: "david", desc: "david is a programmer" },
  { id: 20, name: "david", desc: "david is a programmer" },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("cursor");
  const cursor = Number(page);
  // get the lowerborder or index to start
  const start = cursor - 1;
  const lowerborder = start * 5;
  const upperborder = cursor * 5;

  // perform slice
  const takeUser = students.slice(lowerborder, upperborder);
  return new Response(JSON.stringify(takeUser), { status: 200 });
}
