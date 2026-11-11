import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/v1/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, description }),
      });

      const data = await response.json();
      setMessage(data.message || "Something went wrong");

      if (response.ok) {
        setDescription("");
      }
    } catch (error) {
      setMessage("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <form className="card" onSubmit={handleSubmit}>
        <h1>Send a description</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Write your description"
          rows="6"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>

        {message ? <p className="status">{message}</p> : null}
      </form>
    </main>
  );
}

export default App;
