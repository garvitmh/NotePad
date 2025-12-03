import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../utils/axios"; // keep consistent with other pages
import toast from "react-hot-toast";
import { ArrowLeftIcon, FileTextIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <LoaderIcon className="animate-spin size-10 text-primary" />
          <p className="text-sm text-base-content/70">Loading your note...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-base-content/80 mb-2 font-medium">Note not found</p>
          <Link to="/" className="btn btn-ghost btn-sm">
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  const titleLength = note.title?.length || 0;
  const contentLength = note.content?.length || 0;

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 gap-3">
            <Link to="/" className="btn btn-ghost gap-2">
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to Notes</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                className="btn btn-error btn-outline gap-2 btn-sm md:btn-md"
                disabled={saving}
              >
                <Trash2Icon className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Main card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body gap-6">
              {/* Header inside card */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <FileTextIcon className="size-6 text-primary" />
                </div>
                <div>
                  <h2 className="card-title text-2xl">Edit Note</h2>
                  <p className="text-sm text-base-content/60">
                    Update the title and content, then save your changes.
                  </p>
                </div>
              </div>

              {/* Title */}
              <div className="form-control">
                <div className="flex items-center justify-between mb-1">
                  <label className="label p-0">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <span className="text-xs text-base-content/60">
                    {titleLength}/80
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full"
                  maxLength={80}
                  value={note.title}
                  onChange={(e) =>
                    setNote((prev) => ({ ...prev, title: e.target.value }))
                  }
                  disabled={saving}
                  autoFocus
                />
              </div>

              {/* Content */}
              <div className="form-control">
                <div className="flex items-center justify-between mb-1">
                  <label className="label p-0">
                    <span className="label-text font-medium">Content</span>
                  </label>
                  <span className="text-xs text-base-content/60">
                    {contentLength}/4000
                  </span>
                </div>
                <textarea
                  placeholder="Write or update your note here..."
                  className="textarea textarea-bordered w-full h-48 leading-relaxed"
                  maxLength={4000}
                  value={note.content}
                  onChange={(e) =>
                    setNote((prev) => ({ ...prev, content: e.target.value }))
                  }
                  disabled={saving}
                />
                <p className="mt-1 text-xs text-base-content/60">
                  Tip: Use this space to refine details, add links, or capture new ideas.
                </p>
              </div>

              {/* Actions */}
              <div className="card-actions justify-end pt-2">
                <button
                  className="btn btn-primary gap-2"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Footer hint */}
          <p className="mt-4 text-center text-xs text-base-content/60">
            Your changes will be saved permanently once you click{" "}
            <span className="font-semibold">Save Changes</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
