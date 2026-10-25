import React from 'react';
import { notFound } from 'next/navigation';
import { getPostById, getCategories } from '@/lib/db';
import { PostEditor } from '@/components/admin/PostEditor';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = getPostById(id);
  const categories = getCategories();

  if (!post) {
    notFound();
  }

  return <PostEditor initialPost={post} categories={categories} isEdit={true} />;
}
