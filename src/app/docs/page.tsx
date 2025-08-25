"use client";

import dynamic from 'next/dynamic';
import { swaggerSpec } from '@/lib/swagger';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b bg-gray-50 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
        <p className="text-gray-600 mt-1">Financial Management API - OpenAPI 3.0</p>
      </div>
      <SwaggerUI spec={swaggerSpec} />
    </div>
  );
}