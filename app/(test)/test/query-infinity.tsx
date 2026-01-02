import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

type MyQueryKey = ['infinite', { txt: string; q: string }];

const QueryInf = () => {
  const [txt, setTxt] = useState('');
  const [q, setQ] = useState('');

  const fetchData = async ({ pageParam, queryKey }: QueryFunctionContext<MyQueryKey, number>) => {
    const params = queryKey[1];

    const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        ...params,
        _start: pageParam * 10,
        _limit: 10,
      },
    });
    return res.data;
  };

  const { data, isPending, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['infinite', { txt, q }] as MyQueryKey,
    queryFn: fetchData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.length < 10 ? undefined : pages.length),
  });

  if (isPending) return <div>Loading...</div>;

  console.log('data', data);

  return (
    <div>
      <input type="text" onChange={e => setTxt(e.target.value)} />
      <select value={q} onChange={e => setQ(e.target.value)}>
        <option value="iusto">iusto</option>
        <option value="voluptatem">voluptatem</option>
        <option value="dolorum">dolorum</option>
      </select>

      <div>
        <div>
          {data?.pages.flatMap(page =>
            page.map((item: { id: number; title: string }) => (
              <div className="bg-amber-100 my-[20px]" key={item.id}>
                {item.title}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex">
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default QueryInf;
