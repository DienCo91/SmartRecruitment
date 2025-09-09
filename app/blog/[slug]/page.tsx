import React from 'react';

const BlogSlug = async (props: PageProps<'/blog/[slug]'>) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const { slug } = await props.params;
  const { name, age } = await props.searchParams;

  return (
    <div>
      BlogSlug {slug} {name} {age}
    </div>
  );
};

export default BlogSlug;
