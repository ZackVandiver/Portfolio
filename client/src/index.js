import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure Tailwind is loaded

const App = () => {
  return (
    <div className="bg-blue-500 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Tailwind is Working!</h1>
      <p className="mt-4 p-2 bg-yellow-300 text-black rounded-lg">
        If you see blue background and yellow box, Tailwind is fully functional.
      </p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
