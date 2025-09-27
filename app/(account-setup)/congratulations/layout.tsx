import React from 'react';

const CongratulationsLayout = (props: LayoutProps<'/congratulations'>) => {
  return <div className="mt-[160px]">{props.children}</div>;
};

export default CongratulationsLayout;
