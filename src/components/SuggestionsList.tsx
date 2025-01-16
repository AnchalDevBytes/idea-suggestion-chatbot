import { Suggestion } from "@/app/page";

const SuggestionsList = ({ suggestions } : { suggestions : Suggestion[] }) => {
    
return (
    <div className="mt-8 bg-gray-700 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Detailed Suggestions:
        </h2>
      <div className="space-y-6">
        {suggestions.map((suggestion, index) => (
            <div 
                key={index} 
                className="bg-gray-800 p-4 rounded-md shadow"
            >
                <h3 className="text-lg font-bold text-yellow-400">
                    {suggestion.title}
                </h3>
                <p className="text-sm text-gray-300 whitespace-pre-wrap mt-2">
                    {suggestion.body}
                </p>
            </div>
        ))}
      </div>
    </div>
)
};

export default SuggestionsList;
