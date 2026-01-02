'use client';
import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import QueryInf from './query-infinity';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const limit = 10;

const groupOption = (page: number, limit: number) => {
  return queryOptions({
    queryKey: ['post', { _start: page * limit, _limit: limit }],
    queryFn: async ({ queryKey }) => {
      const params = queryKey[1] as { _start: number; _limit: number };

      const res = await axios.get('https://jsonplaceholder.typicode.com/posts', { params });
      return res.data;
    },
  });
};

const TestPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(0);

  const { data, isPending, isSuccess, isPlaceholderData } = useQuery({
    ...groupOption(page, limit),
    select: data => data,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation({
    onMutate(variables, context) {
      queryClient.setQueryData(['post', { _start: page * limit, _limit: limit }], pre => {
        if (!Array.isArray(pre)) return pre;
        return [variables, ...pre];
      });
    },
    mutationFn: (newData: { title: string; body: string; userId: number }) => {
      return axios.post('https://jsonplaceholder.typicode.com/posts', newData);
    },
    onSuccess: res => {
      console.log('data global', data);
      // queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.setQueryData(['post', { _start: page * limit, _limit: limit }], pre => {
        if (!Array.isArray(pre)) return pre;
        return [res.data, ...pre];
      });
    },
  });

  console.log('isPlaceholderData', isPlaceholderData);
  // return <QueryInf />;

  if (isPending) return <div>Loading...</div>;
  if (isSuccess)
    return (
      <div>
        <Button
          onClick={() =>
            mutation.mutate(
              {
                title: 'New Posts',
                body: 'This is a test post',
                userId: 1,
              },
              {
                onSuccess: data => {
                  console.log('data single', data);
                  toast.success('Success');
                },
              }
            )
          }
        >
          Create
        </Button>
        <div>
          {data.map((item: { id: number; title: string }) => (
            <div className="bg-amber-100 my-[20px]" key={item.id}>
              {item.title}
            </div>
          ))}
        </div>
        <div className="flex">
          <button onClick={() => setPage(pre => Math.max(pre - 1, 0))}>Pre</button>
          <p>{page}</p>
          <button onClick={() => setPage(pre => Math.max(pre + 1))}>Next</button>
        </div>
      </div>
    );

  return <div>Empty</div>;
};

export default TestPage;
