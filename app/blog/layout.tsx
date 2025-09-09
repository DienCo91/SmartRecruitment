import React from 'react';

const BlogLayout = async (props: LayoutProps<'/blog'>) => {
  const children = props.children;
  return <main>{children}</main>;
};

export default BlogLayout;
