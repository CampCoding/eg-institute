import { Award, BookOpen, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

const LevelCard = ({ item }) => {
  console.log(item);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-6">
      <div className="flex flex-col justify-between mb-3">
        <h3 className="text-[14px] font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          {item?.title}
        </h3>
        <span className="flex items-center mt-5 text-md text-gray-500">
          <Clock className="w-4 h-4 mr-1 text-amber-500" />
          {item?.duration}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-5">{item?.description}</p>

      <ul className="space-y-2 text-sm text-gray-700">
        {item?.points?.map((point, index) => (
          <li className="flex items-start gap-2" key={index}>
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <Link href={`${item?.link}`}>
        <button className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 rounded-xl transition">
          {item?.button}
        </button>
      </Link>
    </div>
  );
};

export default LevelCard;
