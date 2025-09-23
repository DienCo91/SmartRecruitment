import { Tag } from '../Tags/Tag';

export function Jobtags() {
  return (
    <div className="flex flex-wrap mt-3">
      <h3 className="mb-2 font-semibold">Tags: </h3>
      <div>
        <Tag content="Software" className="bg-white/25" />
        <Tag content="IT" className="bg-white/25" />
      </div>
    </div>
  );
}
