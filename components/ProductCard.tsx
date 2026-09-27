import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  colors: string[];
  image: string;
  badge?: string;
}

export default function ProductCard({
  id,
  name,
  category,
  description,
  price,
  colors,
  image,
  badge,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group">
      <div className="relative bg-neutral-100 mb-4 overflow-hidden aspect-square">
        {badge && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 z-10 uppercase tracking-wide">
            {badge}
          </span>
        )}
        <button className="absolute top-3 right-3 z-10 hover:scale-110 transition-transform">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <div className="w-full h-full relative">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-start mb-1">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {category}
            </p>
            <h3 className="font-semibold text-sm group-hover:underline">{name}</h3>
          </div>
          <p className="font-semibold text-sm">${price}</p>
        </div>
        <p className="text-xs text-gray-600 mb-2">{description}</p>
        <div className="flex gap-2">
          {colors.map((color, index) => (
            <button
              key={index}
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
