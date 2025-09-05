import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export const ErrorBoundary = () => {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="text-6xl mb-4">😵</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {error?.status === 404 ? 'Page Not Found' : 'Something went wrong!'}
        </h1>
        <p className="text-gray-600 mb-6">
          {error?.status === 404 
            ? "The page you're looking for doesn't exist." 
            : "An unexpected error occurred. Please try again."}
        </p>
        <div className="space-y-3">
          <Link 
            to="/" 
            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Go Home
          </Link>
          <Link 
            to="/auth/HR/login" 
            className="block w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            HR Login
          </Link>
          <Link 
            to="/auth/employee/login" 
            className="block w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            Employee Login
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">Error Details</summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};
