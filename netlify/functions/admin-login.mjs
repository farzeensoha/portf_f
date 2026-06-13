export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { password } = body;
  const expected = Netlify.env.get("ADMIN_PASSWORD");

  if (!expected) {
    return new Response(
      JSON.stringify({ error: "Admin password is not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (password && password === expected) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Incorrect password" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/admin-login",
};
