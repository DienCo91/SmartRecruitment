'use client';

import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { FaReddit } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import InfiniteScroll from 'react-infinite-scroll-component';
import GlassCardBase from '../Cards/GlassCardBase';

const companies = [
  {
    name: 'Reddit',
    logo: <FaReddit className="text-orange-500 text-[50px] w-[40px] h-[50px] flex-1" size={40} />,
    country: 'United Kingdom of Great Britain',
  },
];

function generateFakeJobs(count: number) {
  const jobs = [];
  for (let i = 0; i < count; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    jobs.push({
      id: i,
      company: company.name,
      logo: company.logo,
      country: company.country,
      featured: Math.random() > 0.7,
      title: ['UX Designer', 'Frontend Dev', 'Backend Engineer', 'PM', 'QA Tester'][
        Math.floor(Math.random() * 5)
      ],
      type: ['Full Time', 'Part Time', 'Contract', 'Internship', 'Remote'][
        Math.floor(Math.random() * 5)
      ],
      salary: `$${Math.floor(Math.random() * 50) + 10}K - $${Math.floor(Math.random() * 80) + 20}K`,
    });
  }
  return jobs;
}

const allJobs = generateFakeJobs(100);

const ListJob = () => {
  const [items, setItems] = useState(allJobs.slice(0, 20));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    console.log('123', 123);
    if (items.length >= allJobs.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(allJobs.slice(0, items.length + 9));
    }, 800);
  };

  return (
    <div className="mt-[30px] hover:translate-y-[0px] ">
      <GlassCardBase className="text-white font-bold text-[20px] mb-[20px]">Jobs</GlassCardBase>
      <div
        id="scrollableDiv"
        className="overflow-auto mb-[20px] "
        style={{ height: 'calc(100vh - 240px)' }}
      >
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          scrollableTarget="scrollableDiv"
          hasMore={hasMore}
          loader={<h4 className="text-center py-4">Loading...</h4>}
          endMessage={<p className="text-center py-4 text-gray-500">No more jobs 🎉</p>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(job => (
              <GlassCardBase
                key={job.id}
                className="hover:shadow-md hover:shadow-blue-200 cursor-pointer border-[1px] hover:border-blue-primary transition-all duration-300 ease-in-out hover:-translate-y-1"
              >
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FaReddit
                        className="text-white bg-orange-600 w-[60px] h-[60px] p-[16px] rounded-sm"
                        size={40}
                      />
                      <div>
                        <span className="font-semibold">{job.company}</span>
                        <div className="flex items-center text-sm text-gray-500 mb-2 opacity-80">
                          <MapPin size={14} className="mr-1 shrink-0 text-white" />
                          <span className="line-clamp-1 text-white">{job.country}</span>
                        </div>
                      </div>
                    </div>
                    {job.featured && (
                      <Badge
                        variant="secondary"
                        className="ml-[6px] bg-red-100 text-red-600 rounded-full font-normal"
                      >
                        Featured
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                  <div className="flex items-center item opacity-80 ">
                    <div className="text-sm">{job.type}</div>
                    <LuDot className="mx-[4px]" />
                    <div className="text-sm ">{job.salary}</div>
                  </div>
                </CardContent>
              </GlassCardBase>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ListJob;
