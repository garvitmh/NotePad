import React, { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../utils/axios";

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notes");
      setNotes(res.data);
      setRateLimited(false);
    } catch (error) {
      console.error("Error fetching notes:", error);

      if (error?.response?.status === 429) {
        setRateLimited(true);
      } else {
        toast.error("An error occurred while fetching your notes.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    try {
      await api.delete(`notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully.");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete the note.");
    }
  };

  return (
    <div className="w-full">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-base-content">
            Your Notes
          </h1>
          <p className="text-sm text-base-content/70">
            Capture ideas, tasks, and thoughts in one place.
          </p>
        </header>

        {/* Main content states */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-3">
              <span className="loading loading-spinner text-primary"></span>
              <span className="text-base-content/80 text-sm">
                Loading your notes...
              </span>
            </div>
          </div>
        ) : isRateLimited ? (
          <RateLimitedUI />
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-base-content/80 mb-2 font-medium">
              You don’t have any notes yet.
            </p>
            <p className="text-sm text-base-content/60">
              Start by creating a new note to keep track of your thoughts.
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={handleDeleteNote} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;
