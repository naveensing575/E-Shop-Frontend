export async function login(email: string, password: string, idToken: string) {
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${idToken}`,
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
