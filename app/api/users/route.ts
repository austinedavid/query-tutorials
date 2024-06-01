interface Iuser {
  id: number;
  email: string;
}

const user: Iuser[] = [
  { id: 1, email: "david@gmail.com" },
  { id: 2, email: "sarah@gmail.com" },
  { id: 3, email: "maurice@gmail.com" },
  { id: 4, email: "favour@gmail.com" },
];

export async function GET(req: Request) {
  try {
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}
