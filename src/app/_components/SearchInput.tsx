'use client'

import { FC } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SearchInputProps {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
}

export const SearchInput: FC<SearchInputProps> = ({
  onInputChange,
  onSubmit,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <section className="mb-10">
      <input
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        className="bg-gray-700 w-1/3 p-2 rounded-l-lg focus:outline-none"
        placeholder="探したい曲名を入力してください"
      />
      <button
        onClick={onSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  )
}
