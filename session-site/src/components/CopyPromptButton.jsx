import { useState } from 'react';

export default function CopyPromptButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-xl bg-bloom px-3.5 py-2 text-sm font-semibold text-white hover:bg-purple-500"
    >
      {copied ? 'Copied!' : 'Copy prompt for Copilot'}
    </button>
  );
}
