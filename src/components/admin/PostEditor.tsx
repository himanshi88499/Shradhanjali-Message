'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  Eye,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  UploadCloud,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Clock,
  Bold,
  Link as LinkIcon,
  List,
  UserCheck,
  ExternalLink,
} from 'lucide-react';
import { RichText } from '@/components/RichText';
import { Post, Category, MessageCard } from '@/lib/types';

interface PostEditorProps {
  initialPost?: Partial<Post>;
  categories: Category[];
  isEdit?: boolean;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  initialPost,
  categories,
  isEdit = false,
}) => {
  const router = useRouter();

  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [categoryId, setCategoryId] = useState(initialPost?.categoryId || (categories[0]?.id || 'cat-1'));
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [quote, setQuote] = useState(initialPost?.quote || '');
  const [introHeading, setIntroHeading] = useState(initialPost?.introHeading || '');
  const [introText, setIntroText] = useState(initialPost?.introText || '');
  const [cardsH2Heading, setCardsH2Heading] = useState(initialPost?.cardsH2Heading || '');
  const [cardsParagraph, setCardsParagraph] = useState(initialPost?.cardsParagraph || '');
  const [featuredImage, setFeaturedImage] = useState(initialPost?.featuredImage || '/images/hero-candle.jpg');
  const [imageAlt, setImageAlt] = useState(initialPost?.imageAlt || '');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingContentImg, setUploadingContentImg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const insertSnippet = (snippet: string) => {
    const textarea = contentRef.current;
    if (!textarea) {
      setContent((prev) => (prev ? `${prev}\n\n${snippet}` : snippet));
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.substring(0, start);
    const after = content.substring(end);
    const newContent = before + snippet + after;
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + snippet.length;
    }, 50);
  };

  const insertBatchCards = (count: number) => {
    let snippet = '\n\n';
    for (let i = 1; i <= count; i++) {
      snippet += `:::card\nશ્રદ્ધાંજલિ સંદેશ #${i}: પ્રિયજનની પવિત્ર સ્મૃતિને શત શત નમન...\n:::\n\n`;
    }
    insertSnippet(snippet);
  };

  const handleBoldText = () => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (!selectedText) {
      const placeholder = '**bold text**';
      const newContent = content.substring(0, start) + placeholder + content.substring(end);
      setContent(newContent);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 2, start + 2 + 9);
      }, 50);
      return;
    }

    let replacement = '';
    let newEnd = end;
    if (selectedText.startsWith('**') && selectedText.endsWith('**') && selectedText.length >= 4) {
      replacement = selectedText.slice(2, -2);
      newEnd = start + replacement.length;
    } else {
      replacement = `**${selectedText}**`;
      newEnd = start + replacement.length;
    }

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, newEnd);
    }, 50);
  };

  const handleInsertLink = () => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let linkText = selectedText;
    if (!linkText) {
      const enteredText = window.prompt('Enter link text:');
      if (enteredText === null) return;
      linkText = enteredText.trim() || 'Link';
    }

    const enteredUrl = window.prompt('Enter website URL:', 'https://');
    if (!enteredUrl) return;
    const url = enteredUrl.trim();
    if (!url) return;

    const replacement = `[${linkText}](${url})`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + replacement.length);
    }, 50);
  };

  const handleInsertBullet = () => {
    const textarea = contentRef.current;
    if (!textarea) {
      insertSnippet('\n• First bullet item\n• Second bullet item\n\n');
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (!selectedText) {
      const snippet = '\n• Bullet point item\n';
      const before = content.substring(0, start);
      const after = content.substring(end);
      const newContent = before + snippet + after;
      setContent(newContent);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 3, start + 3 + 18);
      }, 50);
      return;
    }

    const lines = selectedText.split('\n');
    const isAllBulleted = lines.every((line) => line.trim().startsWith('• ') || line.trim().startsWith('- '));
    const toggledLines = lines.map((line) => {
      if (isAllBulleted) {
        return line.replace(/^(\s*)[•\-]\s*/, '$1');
      } else {
        if (!line.trim()) return line;
        return line.startsWith('• ') ? line : `• ${line}`;
      }
    });

    const replacement = toggledLines.join('\n');
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + replacement.length);
    }, 50);
  };

  const handleContentKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
      e.preventDefault();
      handleBoldText();
    } else if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      handleInsertLink();
    } else if (e.key === 'Enter') {
      const textarea = contentRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const currentLine = content.substring(0, start).split('\n').pop() || '';
        if (currentLine.startsWith('• ') || currentLine.startsWith('- ')) {
          const bulletPrefix = currentLine.startsWith('• ') ? '• ' : '- ';
          if (currentLine.trim() === '•' || currentLine.trim() === '-') {
            e.preventDefault();
            const beforeLine = content.substring(0, start - currentLine.length);
            const after = content.substring(start);
            const newContent = beforeLine + after;
            setContent(newContent);
            setTimeout(() => {
              textarea.focus();
              textarea.setSelectionRange(beforeLine.length, beforeLine.length);
            }, 50);
            return;
          }
          e.preventDefault();
          const insertStr = `\n${bulletPrefix}`;
          const before = content.substring(0, start);
          const after = content.substring(start);
          const newContent = before + insertStr + after;
          setContent(newContent);
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + insertStr.length, start + insertStr.length);
          }, 50);
          return;
        }
      }
    }
  };

  const [status, setStatus] = useState<'published' | 'draft' | 'scheduled' | 'trash'>(initialPost?.status || 'draft');
  const [showTableOfContents, setShowTableOfContents] = useState(initialPost?.showTableOfContents ?? true);
  const [content, setContent] = useState(initialPost?.content || '');
  const [messageCards, setMessageCards] = useState<MessageCard[]>(
    initialPost?.messageCards || [
      { id: 1, text: 'પ્રિયજનની યાદ હંમેશા અમારા હૃદયમાં જીવંત રહેશે. ભાવપૂર્ણ શ્રદ્ધાંજલિ.' },
    ]
  );

  // SEO fields
  const [seoTitle, setSeoTitle] = useState(initialPost?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialPost?.seoDescription || '');
  const [focusKeyword, setFocusKeyword] = useState(initialPost?.focusKeyword || '');

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Auto-slug generator from title if slug not manually set
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit && !slug) {
      // Basic latin transliteration / fallback slug
      const generated = val
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated || `post-${Date.now()}`);
    }
  };

  // Add a new message card
  const handleAddCard = () => {
    const nextId = messageCards.length > 0 ? Math.max(...messageCards.map((m) => m.id)) + 1 : 1;
    setMessageCards([...messageCards, { id: nextId, text: '' }]);
  };

  // Update card text
  const handleCardTextChange = (id: number, text: string) => {
    setMessageCards(messageCards.map((c) => (c.id === id ? { ...c, text } : c)));
  };

  // Remove card
  const handleRemoveCard = (id: number) => {
    setMessageCards(messageCards.filter((c) => c.id !== id));
  };

  // Reorder card
  const handleMoveCard = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= messageCards.length) return;
    const copy = [...messageCards];
    const item = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = item;
    setMessageCards(copy);
  };

  // Handle image upload from computer
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title || file.name);
    fd.append('altText', imageAlt || title);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      const uploadedUrl = data.url || data.media?.url;
      if (res.ok && uploadedUrl) {
        setFeaturedImage(uploadedUrl);
        setNotification({ type: 'success', message: 'Featured image uploaded successfully!' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        alert(data.error || 'Failed to upload image.');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    setFeaturedImage('');
  };

  // In-Article Image Upload from computer
  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingContentImg(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', file.name.replace(/\.[^/.]+$/, ''));
    fd.append('altText', file.name.replace(/\.[^/.]+$/, ''));

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      const uploadedUrl = data.url || data.media?.url;
      if (res.ok && uploadedUrl) {
        const alt = prompt('Image Alt text / Description:', file.name.replace(/\.[^/.]+$/, '')) || 'Memorial Image';
        const imgMarkdown = `\n\n![${alt}](${uploadedUrl})\n\n`;
        insertSnippet(imgMarkdown);
        setNotification({ type: 'success', message: 'Image successfully inserted into article!' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        alert(data.error || 'Failed to upload image.');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image.');
    } finally {
      setUploadingContentImg(false);
      if (contentImageInputRef.current) contentImageInputRef.current.value = '';
    }
  };

  const handleInsertImageUrl = () => {
    const url = prompt('Enter Image URL:');
    if (!url || !url.trim()) return;
    const alt = prompt('Enter Image Alt text:', 'Memorial Image') || 'Memorial Image';
    insertSnippet(`\n\n![${alt.trim()}](${url.trim()})\n\n`);
  };

  // Extract all embedded images from content
  const articleImages = React.useMemo(() => {
    const regex = /!\[(.*?)\]\((.*?)\)/g;
    const matches: { alt: string; url: string; raw: string }[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push({ alt: match[1], url: match[2], raw: match[0] });
    }
    return matches;
  }, [content]);

  const handleRemoveArticleImage = (rawSnippet: string) => {
    if (confirm('Are you sure you want to remove this image from the article?')) {
      setContent((prev) => prev.replace(rawSnippet, '').trim());
    }
  };

  const handleEditArticleImage = (img: { alt: string; url: string; raw: string }) => {
    const newAlt = prompt('Edit Image Alt text:', img.alt);
    if (newAlt === null) return;
    const newUrl = prompt('Edit Image URL:', img.url);
    if (newUrl === null) return;
    const newSnippet = `![${newAlt.trim()}](${newUrl.trim()})`;
    setContent((prev) => prev.replace(img.raw, newSnippet));
  };

  // 100-point SEO checklist calculations
  const calculateSeoScore = () => {
    let score = 0;
    const checks: { label: string; passed: boolean; tip: string }[] = [];

    // 1. Title presence & length (15 pts)
    const titleLen = (seoTitle || title).length;
    const titlePass = titleLen >= 30 && titleLen <= 70;
    score += titlePass ? 15 : titleLen > 0 ? 8 : 0;
    checks.push({
      label: 'SEO Title Length (30-70 characters)',
      passed: titlePass,
      tip: `Current: ${titleLen} chars`,
    });

    // 2. Meta description presence & length (15 pts)
    const descLen = (seoDescription || excerpt).length;
    const descPass = descLen >= 80 && descLen <= 170;
    score += descPass ? 15 : descLen > 0 ? 8 : 0;
    checks.push({
      label: 'Meta Description Length (80-170 characters)',
      passed: descPass,
      tip: `Current: ${descLen} chars`,
    });

    // 3. Focus keyword presence (10 pts)
    const hasFocus = focusKeyword.trim().length > 0;
    score += hasFocus ? 10 : 0;
    checks.push({
      label: 'Focus Keyword is set',
      passed: hasFocus,
      tip: hasFocus ? focusKeyword : 'Enter keyword',
    });

    // 4. Keyword in Title (15 pts)
    const kwInTitle = hasFocus && (seoTitle || title).toLowerCase().includes(focusKeyword.toLowerCase());
    score += kwInTitle ? 15 : 0;
    checks.push({
      label: 'Focus Keyword in Title',
      passed: kwInTitle,
      tip: kwInTitle ? 'Present' : 'Add to title',
    });

    // 5. Keyword in Content (15 pts)
    const kwInContent = hasFocus && content.toLowerCase().includes(focusKeyword.toLowerCase());
    score += kwInContent ? 15 : 0;
    checks.push({
      label: 'Focus Keyword in Content',
      passed: kwInContent,
      tip: kwInContent ? 'Present' : 'Add to content',
    });

    // 6. Featured Image & Alt text (15 pts)
    const hasImageAlt = featuredImage && (imageAlt.trim().length > 0 || title.length > 0);
    score += hasImageAlt ? 15 : 0;
    checks.push({
      label: 'Featured Image & Alt text',
      passed: Boolean(hasImageAlt),
      tip: hasImageAlt ? 'Optimal' : 'Add image alt',
    });

    // 7. Headings (H2/H3) structure (15 pts)
    const hasHeadings = content.includes('## ') || content.includes('### ');
    score += hasHeadings ? 15 : 0;
    checks.push({
      label: 'H2/H3 Headings structure',
      passed: hasHeadings,
      tip: hasHeadings ? 'Optimal' : 'Add ## Headings',
    });

    return { score: Math.min(100, score), checks };
  };

  const seoEvaluation = calculateSeoScore();

  // Save form handler with draft or publish target
  const handleSave = async (e?: React.FormEvent, targetStatus?: 'published' | 'draft') => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setNotification({ type: 'error', message: 'Please enter a post title.' });
      return;
    }

    const finalStatus = targetStatus || status;
    if (targetStatus && targetStatus !== status) {
      setStatus(targetStatus);
    }

    setLoading(true);
    setNotification(null);

    const selectedCategory = categories.find((c) => c.id === categoryId);

    // Auto-extract any :::card blocks from content to sync with messageCards
    const extractedCards: MessageCard[] = [];
    const cardMatches = content.match(/:::card[\s\S]*?:::/g);
    if (cardMatches && cardMatches.length > 0) {
      cardMatches.forEach((m, idx) => {
        const cardText = m.replace(/^:::card\s*/, '').replace(/\s*:::$/, '').trim();
        if (cardText) {
          extractedCards.push({ id: idx + 1, text: cardText });
        }
      });
    }
    const finalCards = extractedCards.length > 0 ? extractedCards : messageCards;

    // Auto-extract starting content words for excerpt
    const deriveExcerpt = (rawContent: string, rawIntro?: string) => {
      const src = (rawIntro && rawIntro.trim()) ? rawIntro.trim() : rawContent;
      const clean = src
        .replace(/:::card[\s\S]*?:::/g, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
        .replace(/#{1,6}\s+[^\n]*/g, '')
        .replace(/[*_~`]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (!clean) return '';
      return clean.length <= 150 ? clean : clean.slice(0, 147).trim() + '...';
    };

    const autoExcerpt = deriveExcerpt(content, introText) || excerpt.trim() || (finalCards[0]?.text?.slice(0, 147) || '');

    const postData: Partial<Post> = {
      id: initialPost?.id,
      title: title.trim(),
      slug: (slug || `post-${Date.now()}`).trim(),
      categoryId,
      categoryName: selectedCategory?.name || 'General',
      categorySlug: selectedCategory?.slug || 'shradhanjali',
      excerpt: autoExcerpt,
      quote: quote.trim(),
      introHeading: '',
      introText: introText.trim(),
      cardsH2Heading: cardsH2Heading.trim(),
      cardsParagraph: cardsParagraph.trim(),
      featuredImage: featuredImage.trim(),
      imageAlt: imageAlt.trim() || title.trim(),
      status: finalStatus,
      showTableOfContents,
      content,
      messageCards: finalCards,
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim() || autoExcerpt,
      focusKeyword: focusKeyword.trim(),
      tags: initialPost?.tags || ['Memorial'],
      authorId: initialPost?.authorId || 'author-1',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const url = isEdit ? `/api/admin/posts/${initialPost?.id}` : '/api/admin/posts';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save post.');

      setNotification({
        type: 'success',
        message: finalStatus === 'draft' ? 'Post saved as Draft!' : 'Post published successfully!',
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);

      // If new post created, seamlessly switch URL to edit route so subsequent clicks update the post
      if (!isEdit && (data.id || data.post?.id)) {
        const newId = data.id || data.post?.id;
        window.history.replaceState(null, '', `/admin/posts/edit/${newId}`);
      }
      router.refresh();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to save post.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSave(e)} className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C3A52]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
            className="p-2 rounded-xl bg-[#0B1D2D] hover:bg-[#10263B] text-[#B9C6D6] hover:text-white border border-[#1C3A52]"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {isEdit ? 'Edit Post' : 'Add New Post'}
            </h1>
            <p className="text-xs text-[#8495A9]">
              Write and publish memorial tributes and condolence posts.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status selector tabs */}
          <div className="flex items-center bg-[#061321] border border-[#1C3A52] rounded-xl p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setStatus('draft')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                status === 'draft'
                  ? 'bg-[#FFD782]/20 text-[#FFD782] border border-[#FFD782]/40 shadow-sm'
                  : 'text-[#8495A9] hover:text-white'
              }`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus('published')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                status === 'published'
                  ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 shadow-sm'
                  : 'text-[#8495A9] hover:text-white'
              }`}
            >
              Published
            </button>
          </div>

          {/* Save as Draft Button */}
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave(undefined, 'draft')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0B1D2D] hover:bg-[#142B40] text-[#FFD782] border border-[#FFD782]/40 hover:border-[#FFD782] text-xs font-bold rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            <Clock size={14} />
            <span>Save Draft</span>
          </button>

          {/* Primary Save / Publish Button */}
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave(undefined, 'published')}
            className="flex items-center gap-2 px-5 py-2 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md disabled:opacity-50"
          >
            <Save size={15} />
            <span>{loading ? 'Saving...' : status === 'published' ? 'Update Post' : 'Publish Post'}</span>
          </button>
        </div>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
            notification.type === 'success'
              ? 'bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E]'
              : 'bg-[#EF4444]/15 border border-[#EF4444]/40 text-[#EF4444]'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main 2-column layout: Form (8 cols) & Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Title, Cards, Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Slug */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                Post Title <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Condolence & Shradhanjali Tribute Messages..."
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-3 text-base sm:text-lg font-medium text-white placeholder-[#8495A9] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                URL Slug
              </label>
              <div className="flex items-center bg-[#061321] border border-[#1C3A52] focus-within:border-gold rounded-xl px-3.5 py-2 text-sm">
                <span className="text-[#8495A9] mr-1 text-xs">/post/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-transparent text-gold font-mono text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                Quote on Image
              </label>
              <input
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="e.g. In loving memory of a precious life..."
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm sm:text-base text-white placeholder-[#8495A9] focus:outline-none transition-colors"
              />
            </div>

            {/* Intro Section below Table of Contents */}
            <div className="pt-3 border-t border-[#1C3A52]/60 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                  TOC Intro Paragraph (Paragraph after Table of Contents)
                </label>
                <textarea
                  rows={3}
                  value={introText}
                  onChange={(e) => setIntroText(e.target.value)}
                  placeholder="e.g. Heartfelt condolence text paragraph placed directly below table of contents..."
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3.5 text-sm sm:text-base text-white placeholder-[#8495A9] focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Individual Message Cards Builder */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1C3A52]/60 mb-4 gap-2">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles size={16} className="text-gold" />
                  <span>Individual Message Cards</span>
                  <span className="text-xs bg-[#142B40] text-gold px-2 py-0.5 rounded-full font-mono font-bold">
                    {messageCards.length}
                  </span>
                </h3>
                <p className="text-xs text-[#8495A9] mt-0.5 font-medium">
                  Message cards with Copy and Share buttons
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddCard}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#061321] hover:bg-[#142B40] text-gold border border-gold/40 hover:border-gold rounded-lg text-xs font-semibold transition-all shadow-sm"
              >
                <Plus size={14} />
                <span>Add New Card</span>
              </button>
            </div>

            {/* H2 Heading & Paragraph before Individual Message Cards */}
            <div className="space-y-3 pb-4 border-b border-[#1C3A52]/60 mb-4 bg-[#061321]/40 p-3.5 rounded-xl border border-[#1C3A52]/40">
              <div>
                <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                  Message Cards Section H2 Heading (Heading before cards)
                </label>
                <input
                  type="text"
                  value={cardsH2Heading}
                  onChange={(e) => setCardsH2Heading(e.target.value)}
                  placeholder="e.g. Heartfelt Tribute Messages"
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm sm:text-base text-white placeholder-[#8495A9] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                  Message Cards Section Paragraph (Paragraph before cards)
                </label>
                <textarea
                  rows={2}
                  value={cardsParagraph}
                  onChange={(e) => setCardsParagraph(e.target.value)}
                  placeholder="e.g. You can share these heartfelt condolences and tribute messages with family and friends:"
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-sm sm:text-base text-white placeholder-[#8495A9] focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="space-y-3">
              {messageCards.length === 0 ? (
                <div className="p-6 text-center border border-dashed border-[#1C3A52] rounded-xl text-xs text-[#8495A9]">
                  No message cards added yet. Click &quot;Add New Card&quot; to create one.
                </div>
              ) : (
                messageCards.map((card, idx) => (
                  <div
                    key={card.id}
                    className="p-3.5 bg-[#061321] border border-[#1C3A52] hover:border-[#285375] rounded-xl transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#142B40] text-gold font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-[11px] font-semibold text-[#8495A9]">
                          Card #{idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveCard(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded text-[#8495A9] hover:text-white disabled:opacity-30 disabled:hover:text-[#8495A9] transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveCard(idx, 'down')}
                          disabled={idx === messageCards.length - 1}
                          className="p-1 rounded text-[#8495A9] hover:text-white disabled:opacity-30 disabled:hover:text-[#8495A9] transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveCard(card.id)}
                          className="p-1 rounded text-[#8495A9] hover:text-[#EF4444] transition-colors ml-1"
                          title="Delete this card"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={card.text}
                      onChange={(e) => handleCardTextChange(card.id, e.target.value)}
                      placeholder="Write memorial message card text here..."
                      className="w-full bg-[#030B12] border border-[#1C3A52]/60 focus:border-gold rounded-lg p-3 text-sm sm:text-base text-white placeholder-[#8495A9] focus:outline-none resize-none leading-relaxed"
                    />

                    <div className="flex items-center justify-between text-[11px] text-[#8495A9] pt-1">
                      <span>{card.text ? `${card.text.length} chars` : 'Empty'}</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (card.text.trim()) {
                            insertSnippet(`\n\n:::card\n${card.text.trim()}\n:::\n\n`);
                          }
                        }}
                        className="px-2.5 py-1 bg-[#142B40] text-gold hover:bg-[#1C3A52] rounded-md text-[11px] font-semibold border border-gold/30 transition-colors"
                        title="Insert this card at cursor in article content"
                      >
                        + Insert in Content
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {messageCards.length > 0 && (
              <button
                type="button"
                onClick={handleAddCard}
                className="mt-3 w-full py-2 bg-[#061321] hover:bg-[#142B40] text-gold border border-dashed border-gold/40 hover:border-gold rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus size={14} />
                <span>+ Add Another Message Card</span>
              </button>
            )}
          </div>

          {/* Main Article Content & Live Preview */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C3A52]/60 mb-4">
              <h3 className="text-sm font-bold text-white">Article Content</h3>

              <div className="flex items-center bg-[#061321] rounded-lg p-0.5 border border-[#1C3A52]">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    activeTab === 'edit' ? 'bg-[#142B40] text-gold' : 'text-[#8495A9] hover:text-white'
                  }`}
                >
                  <Edit3 size={13} className="inline mr-1" />
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    activeTab === 'preview' ? 'bg-[#142B40] text-gold' : 'text-[#8495A9] hover:text-white'
                  }`}
                >
                  <Eye size={13} className="inline mr-1" />
                  Live Preview
                </button>
              </div>
            </div>

            {activeTab === 'edit' ? (
              <div className="space-y-3">
                {/* Visual Quick-Insert Bar for flexible article structure */}
                <div className="bg-[#061321] border border-[#1C3A52] rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={13} />
                      <span>Quick Insert at Cursor:</span>
                    </span>
                    <span className="text-[10px] text-[#8495A9]">
                      Click to insert formatted snippet at cursor
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleBoldText}
                      className="px-2.5 py-1 bg-[#142B40] hover:bg-[#1C3A52] text-white border border-gold/40 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                      title="Bold Selected Text (Ctrl+B)"
                    >
                      <Bold size={13} className="text-gold" />
                      <span>Bold (Ctrl+B)</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleInsertLink}
                      className="px-2.5 py-1 bg-[#142B40] hover:bg-[#1C3A52] text-white border border-gold/40 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                      title="Add Website Link (Ctrl+K)"
                    >
                      <LinkIcon size={13} className="text-gold" />
                      <span>+ Link</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleInsertBullet}
                      className="px-2.5 py-1 bg-[#142B40] hover:bg-[#1C3A52] text-white border border-gold/40 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                      title="Add Bullet Point"
                    >
                      <List size={13} className="text-gold" />
                      <span>• Bullet</span>
                    </button>
                    <span className="text-[#1C3A52]">|</span>
                    <button
                      type="button"
                      onClick={() => insertSnippet('\n\n## Section Heading Title\n\n')}
                      className="px-2.5 py-1 bg-[#142B40] hover:bg-[#1C3A52] text-gold border border-gold/30 rounded-lg text-xs font-semibold transition-colors"
                      title="Add H2 Heading"
                    >
                      + H2 Heading
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('\n\n### Sub-heading Title\n\n')}
                      className="px-2.5 py-1 bg-[#142B40] hover:bg-[#1C3A52] text-[#FFD782] border border-[#FFD782]/30 rounded-lg text-xs font-semibold transition-colors"
                      title="Add H3 Sub-heading"
                    >
                      + H3 Sub-heading
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('\n\nWrite your content paragraph here...\n\n')}
                      className="px-2.5 py-1 bg-[#0B1D2D] hover:bg-[#142B40] text-white border border-[#1C3A52] rounded-lg text-xs font-medium transition-colors"
                      title="Add Paragraph"
                    >
                      + Paragraph
                    </button>
                    <span className="text-[#1C3A52]">|</span>
                    <button
                      type="button"
                      onClick={() => insertSnippet('\n\n:::card\nMemorial tribute message text here...\n:::\n\n')}
                      className="px-2.5 py-1 bg-[#F5C45E]/15 hover:bg-[#F5C45E]/25 text-gold border border-gold/40 rounded-lg text-xs font-bold transition-colors"
                      title="Add 1 Individual Message Card"
                    >
                      + 1 Message Card
                    </button>
                    <button
                      type="button"
                      onClick={() => insertBatchCards(5)}
                      className="px-2.5 py-1 bg-[#F5C45E]/15 hover:bg-[#F5C45E]/25 text-gold border border-gold/40 rounded-lg text-xs font-bold transition-colors"
                      title="Add 5 Message Cards at once"
                    >
                      + 5 Cards
                    </button>
                    <button
                      type="button"
                      onClick={() => insertBatchCards(10)}
                      className="px-2.5 py-1 bg-[#F5C45E]/20 hover:bg-[#F5C45E]/30 text-gold border border-gold/60 rounded-lg text-xs font-bold transition-colors shadow-sm"
                      title="Add 10 Message Cards (Batch)"
                    >
                      + 10 Cards (Batch)
                    </button>
                    <span className="text-[#1C3A52]">|</span>
                    {/* In-Article Image Upload & Insert Buttons */}
                    <input
                      type="file"
                      ref={contentImageInputRef}
                      onChange={handleContentImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => contentImageInputRef.current?.click()}
                      disabled={uploadingContentImg}
                      className="px-2.5 py-1 bg-[#128C7E]/25 hover:bg-[#128C7E]/40 text-[#25D366] border border-[#128C7E]/50 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                      title="Upload new image and insert into article"
                    >
                      <UploadCloud size={13} />
                      <span>{uploadingContentImg ? 'Uploading...' : '+ Upload Image'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleInsertImageUrl}
                      className="px-2.5 py-1 bg-[#142B40] hover:bg-[#1C3A52] text-white border border-[#1C3A52] rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                      title="Insert Image URL"
                    >
                      <ImageIcon size={13} />
                      <span>+ Image URL</span>
                    </button>
                  </div>
                </div>

                {/* In-Article Embedded Images Visual Preview Banner */}
                {articleImages.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-[#061321] border border-gold/40 shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold flex items-center gap-1.5">
                        <ImageIcon size={14} />
                        <span>Embedded Images in Article ({articleImages.length})</span>
                      </span>
                      <span className="text-[11px] text-[#8495A9]">
                        These images render inline in the published post
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {articleImages.map((img, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0B1D2D] border border-[#1C3A52]">
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="w-14 h-14 rounded-md object-cover border border-[#1C3A52] shrink-0 bg-[#061321]"
                          />
                          <div className="flex-1 min-w-0 text-xs">
                            <p className="text-white font-medium truncate">{img.alt || 'Untitled Image'}</p>
                            <p className="text-[#8495A9] text-[10px] truncate">{img.url}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                type="button"
                                onClick={() => handleEditArticleImage(img)}
                                className="text-[10px] text-gold hover:underline flex items-center gap-1 font-semibold"
                              >
                                <Edit3 size={11} /> Edit Alt/URL
                              </button>
                              <span className="text-[#1C3A52]">|</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveArticleImage(img.raw)}
                                className="text-[10px] text-[#EF4444] hover:underline flex items-center gap-1 font-semibold"
                              >
                                <Trash2 size={11} /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <textarea
                  ref={contentRef}
                  rows={15}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={handleContentKeyDown}
                  placeholder="## Section Heading&#10;&#10;Write paragraph content here...&#10;&#10;:::card&#10;Memorial tribute message 1...&#10;:::&#10;&#10;:::card&#10;Memorial tribute message 2...&#10;:::"
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-4 text-sm sm:text-base text-white placeholder-[#8495A9] focus:outline-none transition-colors font-sans leading-relaxed"
                />

                <div className="p-2.5 rounded-lg bg-[#061321]/60 border border-[#1C3A52]/60 text-[11px] text-[#8495A9] flex items-center justify-between">
                  <span>
                    💡 Tip: You can freely interleave <strong>Paragraphs → Headings → Images → Message Cards</strong> in any sequence.
                  </span>
                  <span>{content.length} chars</span>
                </div>
              </div>
            ) : (
              <div className="bg-[#061321] border border-[#1C3A52] rounded-xl p-5 text-sm text-[#B9C6D6] leading-relaxed space-y-4 min-h-[220px]">
                {content ? (
                  content.split(/(:::card[\s\S]*?:::)/g).map((chunk, idx) => {
                    const trimmed = chunk.trim();
                    if (!trimmed) return null;
                    if (trimmed.startsWith(':::card') && trimmed.endsWith(':::')) {
                      const text = trimmed.replace(/^:::card\s*/, '').replace(/\s*:::$/, '');
                      return (
                        <div key={idx} className="p-4 rounded-xl bg-[#0B1D2D] border border-gold/40 shadow-sm">
                          <span className="text-[10px] text-gold font-bold uppercase tracking-wider block mb-1">
                            ✨ Tribute Message Card Preview
                          </span>
                          <p className="text-white text-xs sm:text-sm font-medium leading-relaxed">{text}</p>
                          <div className="flex gap-2 mt-2 text-[10px] text-[#8495A9]">
                            <span className="px-2 py-0.5 rounded bg-[#142B40] text-gold">Copy Button</span>
                            <span className="px-2 py-0.5 rounded bg-[#128C7E] text-white">WhatsApp Share</span>
                            <span className="px-2 py-0.5 rounded bg-[#1877F2] text-white">Facebook Share</span>
                          </div>
                        </div>
                      );
                    }
                    return chunk.split('\n\n').map((p, pIdx) => {
                      const pTrimmed = p.trim();
                      if (!pTrimmed) return null;
                      const imgMatch = pTrimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
                      if (imgMatch) {
                        return (
                          <div key={pIdx} className="my-3 rounded-xl overflow-hidden border border-[#1C3A52] bg-[#0B1D2D]">
                            <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full max-h-[350px] object-cover" />
                          </div>
                        );
                      }
                      if (pTrimmed.startsWith('## ')) {
                        return <h2 key={pIdx} className="text-lg font-bold text-gold border-b border-[#1C3A52] pb-1">{pTrimmed.replace('## ', '')}</h2>;
                      }
                      if (pTrimmed.startsWith('### ')) {
                        return <h3 key={pIdx} className="text-base font-semibold text-[#FFD782]">{pTrimmed.replace('### ', '')}</h3>;
                      }
                      if (pTrimmed.split('\n').some((l) => l.trim().startsWith('• ') || l.trim().startsWith('- '))) {
                        const items = pTrimmed.split('\n').map((l) => l.trim()).filter(Boolean);
                        return (
                          <ul key={pIdx} className="my-3 space-y-1.5 pl-2 list-none">
                            {items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2 text-[#B9C6D6] text-sm">
                                <span className="text-gold font-bold select-none text-xs mt-0.5">•</span>
                                <span className="flex-1"><RichText content={item.replace(/^[•\-\*]\s*/, '')} /></span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={pIdx}><RichText content={pTrimmed} /></p>;
                    });
                  })
                ) : (
                  <p className="text-xs text-[#8495A9]">Enter content in the editor to see preview.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Category, Image, SEO Score */}
        <div className="lg:col-span-4 space-y-6">
          {/* Post Settings */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Publishing Settings
            </h3>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Image Management */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#B9C6D6]">
                  Featured Image
                </label>
                {featuredImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-[11px] text-[#EF4444] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Trash2 size={12} />
                    <span>Remove Image</span>
                  </button>
                )}
              </div>

              {/* Hidden file input for PC upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Preview or Empty Area */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#1C3A52] bg-[#061321] flex items-center justify-center group">
                {featuredImage ? (
                  <>
                    <img
                      src={featuredImage}
                      alt={imageAlt || 'Featured Preview'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-[#061321] text-white hover:text-gold rounded-lg text-xs font-medium border border-[#1C3A52] flex items-center gap-1"
                      >
                        <UploadCloud size={13} />
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="px-3 py-1.5 bg-[#EF4444]/80 hover:bg-[#EF4444] text-white rounded-lg text-xs font-medium flex items-center gap-1"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon size={32} className="mx-auto text-[#8495A9] mb-2 opacity-60" />
                    <p className="text-xs text-[#8495A9]">No image selected</p>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#142B40] hover:bg-[#1C3A52] text-gold border border-gold/40 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
              >
                <UploadCloud size={14} />
                <span>{uploadingImage ? 'Uploading...' : 'Upload Image from PC'}</span>
              </button>

              {/* Direct URL input */}
              <div>
                <label className="block text-[11px] text-[#8495A9] mb-1">
                  Or enter direct Image URL:
                </label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="/images/... or https://..."
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              {/* Image Alt */}
              <div>
                <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                  Image Alt Tag (for SEO)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. Memorial Tribute Photo"
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* TOC Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-[#1C3A52]/60">
              <span className="text-xs text-[#B9C6D6]">Show Table of Contents (TOC)</span>
              <input
                type="checkbox"
                checked={showTableOfContents}
                onChange={(e) => setShowTableOfContents(e.target.checked)}
                className="w-4 h-4 accent-[#F5C45E]"
              />
            </div>

            {/* Author Box Profile Shortcut */}
            <div className="pt-3 border-t border-[#1C3A52]/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#B9C6D6] flex items-center gap-1.5">
                  <UserCheck size={14} className="text-gold" />
                  <span>Author Box Profile</span>
                </span>
                <Link
                  href="/admin/author"
                  target="_blank"
                  className="text-[11px] text-gold hover:underline flex items-center gap-1 font-bold"
                >
                  <span>Edit Author Box</span>
                  <ExternalLink size={10} />
                </Link>
              </div>
              <p className="text-[10px] text-[#8495A9] leading-relaxed">
                Post displays author photo, name, bio, and social links at the end of the article.
              </p>
            </div>
          </div>

          {/* 100-Point SEO Checklist Score Card */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C3A52]/60">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                SEO Checklist Score
              </h3>
              <div
                className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                  seoEvaluation.score >= 80
                    ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/40'
                    : seoEvaluation.score >= 50
                    ? 'bg-[#FFD782]/15 text-[#FFD782] border border-[#FFD782]/40'
                    : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/40'
                }`}
              >
                {seoEvaluation.score} / 100
              </div>
            </div>

            {/* Focus keyword input */}
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                Focus Keyword
              </label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="e.g. Shradhanjali Messages"
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              />
            </div>

            {/* SEO Title */}
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                SEO Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Title displayed in Google search results..."
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              />
            </div>

            {/* SEO Meta Description */}
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="150-160 character description for search engines..."
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-xs text-white focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Real checklist items */}
            <div className="pt-2 border-t border-[#1C3A52]/60 space-y-2 text-xs">
              {seoEvaluation.checks.map((chk, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {chk.passed ? (
                      <CheckCircle2 size={13} className="text-[#22C55E] shrink-0" />
                    ) : (
                      <XCircle size={13} className="text-[#EF4444] shrink-0" />
                    )}
                    <span className={chk.passed ? 'text-[#B9C6D6]' : 'text-[#8495A9]'}>
                      {chk.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8495A9] font-mono">{chk.tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
