import Link from 'next/link';

interface FeaturedItem {
  id: string;
  title: string;
  link: string;
}

const featuredItems: FeaturedItem[] = [
  { id: 'x', title: 'X', link: '/featured/x' },
  { id: 'y', title: 'Y', link: '/featured/y' },
  { id: 'z', title: 'Z', link: '/featured/z' },
  { id: 'a', title: 'A', link: '/featured/a' },
];

export default function FeaturedContent(): JSX.Element {
  return (
    <div className="grid grid-cols-2 gap-4">
      {featuredItems.map((item) => (
        <Link 
          href={item.link} 
          key={item.id} 
          className={`content-item featured-item-${item.id} block bg-[#1a1a1a] p-6 rounded-lg shadow-lg cursor-pointer`}
        >
          <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
          <p className="text-gray-400">Featured content description</p>
          <div className="mt-4 text-blue-400 hover:text-blue-300 inline-flex items-center group">
            View
            <svg 
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}