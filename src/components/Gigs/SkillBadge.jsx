"use client"

import { X } from "lucide-react"

function SkillBadge({ name, onRemove }) {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
      <span>{name}</span>
      <button
        type="button"
        onClick={onRemove}
        className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-primary/20"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

export default SkillBadge

