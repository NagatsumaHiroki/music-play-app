import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface SearchProps {
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
  };

  export const SearchInput:FC<SearchProps> = ({ onInputChange, onSubmit }) => {
  return (
    <section className="mb-10">
      <input
        onChange={onInputChange}
        className="bg-gray-700 w-1/3 p-2 rounded-l-lg focus:outline-none"
        placeholder="探したい曲名を入力してください"
      />
      <button 
        onClick={onSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}