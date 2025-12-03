import { ArrowLeftIcon, FilePlus2Icon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:9000/api/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);   
        toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !title.trim() || !content.trim();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between max-w-3xl mx-auto mb-6">
          <Link to="/" className="btn btn-ghost gap-2">
            <ArrowLeftIcon className="size-5" />
            <span>Back to Notes</span>
          </Link>

          <div className="text-right">
            <p className="font-semibold text-lg">New Note</p>
            <p className="text-xs text-base-content/60">
              Capture your thoughts quickly and safely
            </p>
          </div>
        </div>

        {/* Main card */}
        <div className="max-w-3xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body gap-6">
              {/* Header inside card */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <FilePlus2Icon className="size-6 text-primary" />
                </div>
                <div>
                  <h2 className="card-title text-2xl">Create New Note</h2>
                  <p className="text-sm text-base-content/60">
                    Give your note a clear title and detailed content.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div className="form-control">
                  <div className="flex items-center justify-between mb-1">
                    <label className="label p-0">
                      <span className="label-text font-medium">Title</span>
                    </label>
                    <span className="text-xs text-base-content/60">
                      {title.length}/80
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Project ideas, meeting notes..."
                    className="input input-bordered w-full"
                    maxLength={80}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                  />
                </div>

                {/* Content */}
                <div className="form-control">
                  <div className="flex items-center justify-between mb-1">
                    <label className="label p-0">
                      <span className="label-text font-medium">Content</span>
                    </label>
                    <span className="text-xs text-base-content/60">
                      {content.length}/2000
                    </span>
                  </div>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered w-full h-40 leading-relaxed"
                    maxLength={2000}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={loading}
                  />
                  <p className="mt-1 text-xs text-base-content/60">
                    Tip: Use this space for details, links, and ideas you don’t want to forget.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-base-content/60">
                    All changes will be saved once you create the note.
                  </p>

                  <div className="card-actions justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary gap-2"
                      disabled={isDisabled}
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-spinner loading-sm" />
                          <span>Creating...</span>
                        </>
                      ) : (
                        <>
                          <FilePlus2Icon className="size-4" />
                          <span>Create Note</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Small footer text */}
          <p className="mt-4 text-center text-xs text-base-content/60">
            Pro tip: Keep titles short and clear so you can find notes faster later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
