import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Music App | 音楽検索サイト',
  description:
    '【Music App】音楽の検索サイト。楽曲名でJ-POPや洋楽など検索、視聴出来ます',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
