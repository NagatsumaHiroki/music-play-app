import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-2xl text-gray-600">Page Not Found</p>
      <p className="mt-2 text-gray-500">お探しのページは存在しません。</p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        ホームに戻る
      </Link>
    </div>
  )
}
