"use client";

import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function HomePage() {
  const hello = trpc.hello.useQuery({ name: "Djamware" });
  const saveMessage = trpc.saveMessage.useMutation();
  const secretData = trpc.secretData.useQuery();

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await saveMessage.mutateAsync({ username, message });
      setResponse(result.response);
    } catch (error: any) {
      setResponse(error.message || "An error occurred.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Using tRPC with Next.js 14</h1>
      <p className="text-lg mb-6">{hello.data?.message}</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md border rounded-2xl p-6 shadow"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border rounded-lg p-2 w-full h-24"
        />
        <button
          type="submit"
          disabled={saveMessage.isPending}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          {saveMessage.isPending ? "Saving..." : "Save Message"}
        </button>
      </form>

      {response && (
        <p className="mt-4 text-green-600 font-medium">{response}</p>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2">Protected Data</h2>
        {secretData.data ? (
          <p className="text-gray-700">{secretData.data.message}</p>
        ) : (
          <p className="text-red-500">
            You are not authorized to view this data.
          </p>
        )}
      </div>
    </main>
  );
}
