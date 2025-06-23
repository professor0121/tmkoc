// src/components/admin/blogs/RichTextEditor.jsx
import React, { useState, useRef } from 'react';

const RichTextEditor = ({ value, onChange, placeholder = "Write your content here..." }) => {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef(null);

  const insertText = (before, after = '') => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange({ target: { name: 'content', value: newText } });
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const formatButtons = [
    {
      label: 'Bold',
      icon: 'B',
      action: () => insertText('**', '**'),
      className: 'font-bold'
    },
    {
      label: 'Italic',
      icon: 'I',
      action: () => insertText('*', '*'),
      className: 'italic'
    },
    {
      label: 'Heading 1',
      icon: 'H1',
      action: () => insertText('# ', ''),
      className: 'text-lg font-bold'
    },
    {
      label: 'Heading 2',
      icon: 'H2',
      action: () => insertText('## ', ''),
      className: 'text-base font-bold'
    },
    {
      label: 'Heading 3',
      icon: 'H3',
      action: () => insertText('### ', ''),
      className: 'text-sm font-bold'
    },
    {
      label: 'Link',
      icon: '🔗',
      action: () => insertText('[', '](url)'),
      className: ''
    },
    {
      label: 'Image',
      icon: '🖼️',
      action: () => insertText('![alt text](', ')'),
      className: ''
    },
    {
      label: 'List',
      icon: '•',
      action: () => insertText('- ', ''),
      className: ''
    },
    {
      label: 'Numbered List',
      icon: '1.',
      action: () => insertText('1. ', ''),
      className: ''
    },
    {
      label: 'Quote',
      icon: '❝',
      action: () => insertText('> ', ''),
      className: ''
    },
    {
      label: 'Code',
      icon: '</>',
      action: () => insertText('`', '`'),
      className: 'font-mono text-sm'
    },
    {
      label: 'Code Block',
      icon: '{ }',
      action: () => insertText('```\n', '\n```'),
      className: 'font-mono text-sm'
    }
  ];

  const renderPreview = (text) => {
    // Simple markdown-like rendering for preview
    let html = text
      .replace(/### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/`(.*?)`/gim, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/```\n([\s\S]*?)\n```/gim, '<pre class="bg-gray-900 text-white p-4 rounded-lg my-4 overflow-x-auto"><code>$1</code></pre>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-700 bg-blue-50 rounded-r">$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4">$2</li>')
      .replace(/\n/gim, '<br />');

    // Wrap consecutive list items
    html = html.replace(/(<li.*?<\/li>)/gim, (match, p1) => {
      if (!match.includes('<ul>') && !match.includes('<ol>')) {
        return `<ul class="list-disc list-inside my-2">${p1}</ul>`;
      }
      return p1;
    });

    return html;
  };

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {formatButtons.map((button) => (
              <button
                key={button.label}
                type="button"
                onClick={button.action}
                title={button.label}
                className={`px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors ${button.className}`}
              >
                {button.icon}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                isPreview 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative">
        {isPreview ? (
          <div 
            className="p-4 min-h-[400px] prose max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            name="content"
            placeholder={placeholder}
            className="w-full p-4 min-h-[400px] resize-y border-0 focus:outline-none focus:ring-0"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
          />
        )}
      </div>

      {/* Help Text */}
      <div className="bg-gray-50 border-t border-gray-300 p-2 text-xs text-gray-600">
        <details>
          <summary className="cursor-pointer hover:text-gray-800">Formatting Help</summary>
          <div className="mt-2 space-y-1">
            <div><code>**bold**</code> → <strong>bold</strong></div>
            <div><code>*italic*</code> → <em>italic</em></div>
            <div><code># Heading 1</code> → Large heading</div>
            <div><code>## Heading 2</code> → Medium heading</div>
            <div><code>### Heading 3</code> → Small heading</div>
            <div><code>[link text](url)</code> → Clickable link</div>
            <div><code>![alt text](image-url)</code> → Image</div>
            <div><code>- List item</code> → Bullet point</div>
            <div><code>1. List item</code> → Numbered list</div>
            <div><code>&gt; Quote</code> → Blockquote</div>
            <div><code>`code`</code> → Inline code</div>
            <div><code>```code block```</code> → Code block</div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default RichTextEditor;
