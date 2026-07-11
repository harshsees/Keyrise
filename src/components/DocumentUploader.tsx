"use client";

import { FileUp, LoaderCircle } from "lucide-react";
import { useRef } from "react";

export type UploadState = "uploaded" | "reviewing" | "needs replacement" | "approved";

type DocumentUploaderProps = {
  fileName?: string;
  status: UploadState;
  error?: string;
  onFileSelect: (file: File | null) => void;
};

export function DocumentUploader({
  fileName,
  status,
  error,
  onFileSelect,
}: DocumentUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const statusStyles: Record<UploadState, string> = {
    uploaded: "bg-blue-50 text-blue-700 border-blue-200",
    reviewing: "bg-amber-50 text-amber-700 border-amber-200",
    "needs replacement": "bg-red-50 text-red-700 border-red-200",
    approved: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-white p-6 text-center hover:bg-[#fafafe]"
        onClick={() => inputRef.current?.click()}
      >
        <FileUp className="mb-2 h-6 w-6 text-[var(--primary)]" />
        <p className="text-sm font-semibold text-[var(--foreground)]">
          Upload passport front page
        </p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Drag and drop supported • JPG, PNG, PDF • Max 5MB
        </p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Camera scan option: Coming soon
        </p>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="hidden"
        onChange={(event) => onFileSelect(event.target.files?.[0] ?? null)}
      />
      {fileName && (
        <div className="rounded-xl border border-[var(--border)] bg-white p-3 text-sm">
          <p className="font-medium text-[var(--foreground)]">{fileName}</p>
          <span className={`mt-2 inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs font-semibold ${statusStyles[status]}`}>
            {status === "reviewing" ? <LoaderCircle className="h-3 w-3 animate-spin" /> : null}
            {status}
          </span>
        </div>
      )}
      {error && <p className="text-sm text-[var(--error)]">{error}</p>}
    </div>
  );
}
