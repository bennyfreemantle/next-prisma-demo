import Head from "next/head";
import { useState } from "react";
import { prisma } from "@/lib/prisma";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

type FormData = {
  title: string;
  content: string;
  id: string;
};

type Notes = {
  notes: {
    title: string;
    content: string;
    id: string;
  }[];
};

export default function Home({ notes }: Notes) {
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function createNote(data: FormData) {
    try {
      await fetch("http://localhost:3000/api/note/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        setForm({ title: "", content: "", id: "" });
        refreshData();
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async function updateNote(id: string) {
    if (form.title === "" || form.content === "") {
      console.log("Both title and content should contain input");
      return;
    }
    try {
      await fetch(`http://localhost:3000/api/note/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        setForm({ title: "", content: "", id: "" });
        refreshData();
      });
    } catch (error) {
      console.log(`Error while updating note: ${error}`);
    }
  }

  async function deleteNote(id: string) {
    try {
      await fetch(`http://localhost:3000/api/note/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(`Error ${error}`);
    }
  }

  async function handleSubmit(data: FormData) {
    try {
      createNote(data);
    } catch (error) {
      console.log(`Error ${error}`);
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-center font-bold text-2xl mt-4">Notes</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
          className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border-2 rounded border-gray-600 p-1"
          />
          <textarea
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="border-2 rounded border-gray-600 p-1"
          />
          <button type="submit" className="bg-blue-500 text-white rounded p-1">
            Add Note
          </button>
        </form>

        <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
          <ul>
            {notes.map((note) => (
              <li key={note.id} className="border-b border-gray-600 p-2">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <p className="text-sm">{note.content}</p>
                  </div>
                  <button
                    className="bg-red-500 px-3 text-white rounded"
                    onClick={() => deleteNote(note.id)}
                  >
                    X
                  </button>
                  <button
                    className="bg-blue-500 px-3 text-white rounded"
                    onClick={() => updateNote(note.id)}
                  >
                    Update
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      content: true,
      id: true,
    },
  });

  return {
    props: {
      notes,
    },
  };
};
