'use client'
import {
  useState
} from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch('/api/setup', {
        method: "POST"
      })
      const json = await result.json()
      console.log('result: ', json)
    } catch (err) {
      console.log('err:', err)
    }
  }
  async function sendQuery() {
    if (!query) return
    setResult('')
    setLoading(true)
    try {
      const result = await fetch('/api/read', {
        method: "POST",
        body: JSON.stringify(query)
      })
      const json = await result.json()
      setResult(json.data)
      setLoading(false)
    } catch (err) {
      console.log('err:', err)
      setLoading(false)
    }
  }

  return (
    <main
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: 'linear-gradient(45deg, #fc466b, #3f5efb)',
      }}
    >
      <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center">Ask the AI</h1>
        <input
          className="w-full px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Your question..."
          onChange={(e) => setQuery(e.target.value)}
          style={{ color: 'black' }} 
        />
        <button
          className="w-full mt-4 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={sendQuery}
        >
          Ask
        </button>
        {loading && <p className="mt-4 text-center">Asking AI...</p>}
        {result && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg">
            <p className="text-lg">{result}</p>
          </div>
        )}        
        <button
        className="w-full mt-4 px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
        onClick={createIndexAndEmbeddings}
      >
        Load File
      </button>
    </div>
  </main>
);
}