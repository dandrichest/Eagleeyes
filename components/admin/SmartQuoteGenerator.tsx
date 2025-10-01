
import React, { useState } from 'react';
import { generateSmartQuote } from '../../services/geminiService';
import { MOCK_PRODUCTS } from '../../constants/data';

interface Recommendation {
  productId: string;
  quantity: number;
  justification: string;
}

interface QuoteResponse {
  recommendations: Recommendation[];
  summary: string;
}

const SmartQuoteGenerator: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateQuote = async () => {
    if (!userInput.trim()) {
      setError('Please describe the customer\'s needs.');
      return;
    }
    if (!process.env.API_KEY) {
        setError('Gemini API key is not configured. Please set the API_KEY environment variable.');
        return;
    }
    setError('');
    setIsLoading(true);
    setQuote(null);
    try {
      const result = await generateSmartQuote(userInput, MOCK_PRODUCTS);
      setQuote(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = (id: string) => MOCK_PRODUCTS.find(p => p.id === id);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary mb-4">Smart Quote Generator</h2>
      <p className="text-gray-600 mb-4">Describe the customer's needs, and our AI will suggest a product package. For example: "I have a medium-sized house with a large backyard and want full security coverage and to lower my electricity bill."</p>
      
      <div className="bg-light p-4 rounded-lg">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter customer requirements here..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
          rows={4}
        />
        <button
          onClick={handleGenerateQuote}
          disabled={isLoading}
          className="mt-4 bg-secondary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition duration-300 disabled:bg-gray-400"
        >
          {isLoading ? 'Generating...' : 'Generate Quote'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {quote && (
        <div className="mt-6 p-4 border-t">
          <h3 className="text-xl font-bold text-primary mb-4">Generated Quote</h3>
          <div className="bg-light p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-primary">Summary</h4>
            <p className="text-gray-700">{quote.summary}</p>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-2">Recommended Products:</h4>
            <div className="space-y-4">
              {quote.recommendations.map((rec, index) => {
                const product = getProductById(rec.productId);
                return (
                  <div key={index} className="p-3 border rounded-md">
                    <p className="font-bold">{product?.name || 'Unknown Product'} (x{rec.quantity})</p>
                    <p className="text-sm text-gray-600">{rec.justification}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartQuoteGenerator;
