import { Suggestion } from '@/app/page';

interface SuggestionListProps {
  suggestions: Suggestion[];
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Detailed Suggestions</h2>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} className="border p-2 rounded mb-2">
            {suggestion.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionList;
