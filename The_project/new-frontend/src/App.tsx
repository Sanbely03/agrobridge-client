// src/App.tsx
// import './App.css' // You might remove this if you're not using App.css for anything else

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600 p-4 rounded-lg bg-gray-100">
        Vite + React with Tailwind!
      </h1>
      <div className="card mt-4 p-6 bg-white shadow-lg rounded-xl">
        <p className="text-gray-700">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs mt-6 text-sm text-center text-purple-500">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App