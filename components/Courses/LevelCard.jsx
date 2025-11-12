import { BookOpen, CheckCircle, Clock } from "lucide-react";

const LevelCard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          Level 1 – Egyptian Arabic 🇪🇬
        </h3>
        <span className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1 text-amber-500" /> 12 Weeks
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-5">
        Build your foundation in Egyptian Arabic with real-life communication
        skills and essential grammar.
      </p>

      <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
          <span>
            Attached and Detached Pronouns – use them naturally in daily
            conversations.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
          <span>
            Verb Conjugation in all tenses (Past, Present, Future, Imperative).
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
          <span>
            Key sentence structures for requests, offers, opinions, and
            negations.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
          <span>
            Common expressions and phrases used in everyday Egyptian life.
          </span>
        </li>
      </ul>

      <button className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 rounded-xl transition">
        Enroll in Level 1
      </button>
    </div>
  );
};

export default LevelCard;
