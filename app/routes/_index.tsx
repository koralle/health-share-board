import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type Role = {
  id: string;
  name: string
}

const loader = async ({context}: LoaderArgs) => {
  const db = context.DB as D1Database;
  
  const { results } = await db.prepare("SELECT id, name FROM roles;").all<Role>();

  return json({
    roles: results ?? []
  });
}

export default function Index() {
  
  const { roles } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Roles</h1>
      <ul>
        {roles.map(role => (
          <li key={role.id}>{role.name}</li>
        ))}
      </ul>
    </div>
  );
}

export { loader };
