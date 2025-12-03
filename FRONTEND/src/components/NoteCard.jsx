import { Link } from "react-router";
import React from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../utils/libs";

const NoteCard = ({ note, onDelete }) => {
  const handleDeleteClick = (e) => {
    // Prevent navigation when clicking delete inside the Link
    e.preventDefault();
    e.stopPropagation();

    if (onDelete) {
      onDelete(note._id);
    }
  };

  const createdAt = note.createdAt ? new Date(note.createdAt) : null;

  return (
    <Link
      to={`/note/${note._id}`}
      className="card group bg-base-300/80 hover:bg-base-300 border border-base-300/80 
                 hover:border-[#00FF9D80] hover:shadow-xl transition-all duration-300 
                 rounded-xl overflow-hidden"
    >
      <div className="card-body flex flex-col gap-3">
        {/* Title + icon */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="card-title text-base-content text-lg line-clamp-2 group-hover:text-[#00FF9D]">
            {note.title}
          </h2>
          <PenSquareIcon className="size-4 text-base-content/50 group-hover:text-[#00FF9D]" />
        </div>

        {/* Content preview */}
        <p className="text-sm text-base-content/70 line-clamp-4 leading-relaxed">
          {note.content}
        </p>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-base-300/70 flex items-center justify-between text-xs">
          <span className="text-base-content/60">
            {createdAt ? formatDate(createdAt) : "Unknown date"}
          </span>

          <button
            type="button"
            onClick={handleDeleteClick}
            className="btn btn-ghost btn-xs text-error gap-1"
          >
            <Trash2Icon className="size-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
