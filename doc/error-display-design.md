# エラー表示機能 設計書

## 1. 概要

### 1.1 目的
Spotify API 呼び出し失敗時に、ユーザーへ明確にエラーを伝えるためのモーダル表示仕様をまとめる。

### 1.2 現在の実装方針
- エラーは画面上部のトーストではなく、中央モーダルで表示する
- 初回表示時の失敗と、検索操作中の失敗の両方を同じ `ErrorModal` で扱う
- 再試行ボタンは置かず、ユーザーがモーダルを閉じるだけのシンプルな導線にする
- ビジュアルは「イラスト主役系」とし、添付イラストを中心に見せる

### 1.3 対象ファイル
- `src/app/page.tsx`
- `src/app/api/spotify/popular/route.ts`
- `src/app/_components/SearchSection.tsx`
- `src/app/_components/ErrorModal.tsx`
- `public/error-modal-icon.png`

---

## 2. エラー仕様

### 2.1 表示メッセージ

| エラー種別 | 表示メッセージ |
|-----------|---------------|
| 人気曲取得失敗 | `曲の取得に失敗しました。しばらくしてから再度お試しください。` |
| 検索失敗 | `検索に失敗しました。しばらくしてから再度お試しください。` |

### 2.2 エラーの発生箇所
- `src/app/page.tsx`
  - 初回表示時の `getPopularSongs()` 失敗を捕捉
  - `initialError` として `SearchSection` に渡す
- `src/app/_components/SearchSection.tsx`
  - `/api/spotify/popular` 呼び出し失敗時に `error` state へ格納
  - `/api/spotify/search` 呼び出し失敗時に `error` state へ格納
- `src/app/api/spotify/popular/route.ts`
  - 500 エラー時に人気曲取得失敗メッセージを返す

### 2.3 エラー処理フロー

#### 初回表示時
```text
ページ表示
  ↓
src/app/page.tsx で getPopularSongs() 実行
  ↓
[成功] initialSongs を SearchSection に渡す
  ↓
[失敗] initialError にメッセージをセット
  ↓
SearchSection が initialError を元に ErrorModal を表示
```

#### 画面操作時
```text
検索 or 人気曲再取得開始
  ↓
setIsLoading(true)
  ↓
API 呼び出し
  ↓
[成功] 曲一覧を更新
  ↓
[失敗] setError(エラーメッセージ)
  ↓
ErrorModal 表示
  ↓
[閉じる] setError(null)
```

---

## 3. UI 設計

### 3.1 デザインコンセプト
- イラスト主役のエラーモーダル
- 説明的なタイトルを減らし、メッセージ本文を主役にする
- 白背景のカードで清潔感を出しつつ、`Error` バッジでエラー状態を明示する
- 音楽アプリらしい柔らかさを残しつつ、過度に警告感の強い UI にはしない

### 3.2 モーダル構造

```text
┌──────────────────────────────┐
│         Error バッジ         │
│                              │
│         イラスト画像         │
│                              │
│ 曲の取得に失敗しました。     │
│ しばらくしてから再度         │
│ お試しください。             │
│                              │
│         [ 閉じる ]           │
└──────────────────────────────┘
```

### 3.3 スタイル仕様

#### オーバーレイ
- クラス: `fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm`
- 背景クリックで閉じる
- 背景を少しぼかし、モーダル本体を浮かせる

#### モーダル本体
- 幅: `w-full max-w-sm sm:max-w-md`
- 背景: `bg-white`
- 角丸: `rounded-[2rem]`
- ボーダー: `border border-rose-200`
- 余白: `px-6 py-7 sm:px-8`
- 影: `shadow-[0_24px_80px_rgba(15,23,42,0.28)]`

#### Error バッジ
- 表示テキスト: `Error`
- スタイル: `rounded-full border border-rose-200 bg-rose-50`
- 文字: `text-xs font-semibold uppercase tracking-[0.24em] text-rose-500`

#### イラスト
- 画像ファイル: `public/error-modal-icon.png`
- 表示方法: `next/image`
- 装飾用途のため `alt=""`
- サイズ: `w-36 sm:w-40`
- 影: `drop-shadow-[0_14px_26px_rgba(15,23,42,0.12)]`

#### メッセージ本文
- クラス: `mx-auto max-w-sm text-lg font-semibold leading-8 text-slate-700 sm:text-xl`
- タイトルは置かず、本文のみをやや大きめに表示する
- テキストは中央揃え

#### 閉じるボタン
- ボタン数: 1つ
- 配置: 下部中央
- クラス: `min-w-32 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white hover:bg-slate-700`

### 3.4 レスポンシブ

| 画面サイズ | モーダル幅 | 画像サイズ | 本文サイズ |
|-----------|-----------|-----------|-----------|
| スマートフォン | `max-w-sm` | `w-36` | `text-lg` |
| タブレット以上 | `max-w-md` | `w-40` | `sm:text-xl` |

---

## 4. コンポーネント設計

### 4.1 `ErrorModal`

```typescript
interface ErrorModalProps {
  message: string
  onClose: () => void
}
```

### 4.2 Props 説明

| Prop | 型 | 説明 |
|------|---|------|
| `message` | `string` | モーダル内に表示するエラーメッセージ |
| `onClose` | `() => void` | 閉じる処理 |

### 4.3 `SearchSection` の状態

```typescript
const [error, setError] = useState<string | null>(initialError)
```

`initialError` を受け取ることで、初回表示時のエラーもクライアント側のモーダル表示に接続している。

---

## 5. 実装メモ

### 5.1 `src/app/page.tsx`
- `getPopularSongs()` の失敗を `try/catch` で捕捉
- `initialError` に人気曲取得失敗メッセージを格納
- `SearchSection` へ `initialSongs` と `initialError` を渡す

### 5.2 `src/app/_components/SearchSection.tsx`
- `error` state が存在する時のみ `ErrorModal` を表示
- 人気曲取得失敗時:
  - `曲の取得に失敗しました。しばらくしてから再度お試しください。`
- 検索失敗時:
  - `検索に失敗しました。しばらくしてから再度お試しください。`
- モーダルを閉じると `setError(null)` する

### 5.3 `src/app/_components/ErrorModal.tsx`
- `Escape` キーで閉じる
- オーバーレイクリックで閉じる
- モーダル表示中は `document.body.style.overflow = 'hidden'`
- モーダル破棄時に `overflow` を `unset` に戻す

### 5.4 `src/app/api/spotify/popular/route.ts`
- 失敗時は status `500` で以下を返す

```json
{
  "error": "曲の取得に失敗しました。しばらくしてから再度お試しください。"
}
```

---

## 6. 現在のアクセシビリティ対応

- `role="dialog"`
- `aria-modal="true"`
- `aria-label="エラーモーダル"`
- `aria-describedby="error-modal-description"`
- `Escape` キーで閉じる

### 6.1 未対応の項目
- 初期フォーカス移動
- フォーカストラップ
- `body.style.overflow` の元値保存と復元

---

## 7. テスト観点

| # | テストケース | 期待結果 |
|---|-------------|---------|
| 1 | 初回表示で人気曲取得が失敗する | モーダルが表示される |
| 2 | 検索APIが失敗する | 検索失敗メッセージでモーダルが表示される |
| 3 | 人気曲取得APIが失敗する | 人気曲取得失敗メッセージでモーダルが表示される |
| 4 | 閉じるボタン押下 | モーダルが閉じる |
| 5 | オーバーレイクリック | モーダルが閉じる |
| 6 | `Escape` キー押下 | モーダルが閉じる |
| 7 | スマートフォン表示 | モーダルが横幅に収まり、イラストと本文が崩れない |
| 8 | 長めのメッセージ表示 | 本文が自然に折り返される |

---

## 8. 今後の改善候補

- モーダル表示時に閉じるボタンへ初期フォーカスを当てる
- フォーカストラップを追加する
- `document.body.style.overflow` の復元処理を安全にする
- 表示/非表示アニメーションを追加する
- エラー種別に応じてイラストや配色を切り替える
