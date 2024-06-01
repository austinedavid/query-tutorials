interface Iproduct {
  id: number;
  name: string;
  creatorId: number;
}

const product: Iproduct[] = [
  { id: 1, name: "iphone", creatorId: 1 },
  { id: 2, name: "iphone", creatorId: 2 },
  { id: 3, name: "iphone", creatorId: 3 },
  { id: 4, name: "iphone", creatorId: 4 },
];

export async function GET(req: Request) {
  const urlParams = new URL(req.url);
  const pathArray = urlParams.pathname.split("/");
  const creatorId = pathArray[pathArray.length - 1];

  try {
    const theProduct = product.find(
      (item) => item.creatorId === Number(creatorId)
    );
    return new Response(JSON.stringify(theProduct), { status: 200 });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}
