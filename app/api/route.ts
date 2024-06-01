interface TodoType {
  id: number;
  title: string;
  desc: string;
}
const todoList: TodoType[] = [
  { id: 1, title: "learn react", desc: "learn react query" },
  { id: 2, title: "learn python", desc: "learning how to use django" },
  { id: 3, title: "learn rust", desc: "learning how to use axum" },
  { id: 4, title: "learn c++", desc: "learning how to use c++" },
];

// making a get request
export async function GET() {
  try {
    return new Response(JSON.stringify(todoList), { status: 200 });
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// making a post request
export async function POST(req: Request) {
  const item = await req.json();
  const newId = todoList.length + 1;
  const newTodo = { id: newId, ...item };

  if (item.title === "learn react") {
    return new Response(JSON.stringify({ message: "this already exist" }), {
      status: 404,
    });
  }

  try {
    todoList.push(newTodo);

    return new Response(
      JSON.stringify({ message: "todo created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something happened" }));
  }
}
