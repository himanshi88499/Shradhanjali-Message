import React from 'react';
import { getCategories } from '@/lib/db';
import { PostEditor } from '@/components/admin/PostEditor';

export default function NewPostPage() {
  const categories = getCategories();

  return <PostEditor categories={categories} isEdit={false} />;
}
