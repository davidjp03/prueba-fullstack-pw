export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b bg-gray-50 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
        <p className="text-gray-600 mt-1">Financial Management API - REST Endpoints</p>
      </div>
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Authentication</h2>
            <p className="text-gray-600 mb-2">All API endpoints require authentication via session cookies.</p>
            <div className="bg-gray-50 p-4 rounded">
              <code>Authorization: Bearer &lt;session-token&gt;</code>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Movements API</h2>
            
            <div className="space-y-4">
              <div className="border rounded p-4">
                <h3 className="font-medium text-green-600">GET /api/movements</h3>
                <p className="text-sm text-gray-600 mt-1">Get all financial movements</p>
                <p className="text-xs text-gray-500 mt-2">Access: All authenticated users</p>
              </div>
              
              <div className="border rounded p-4">
                <h3 className="font-medium text-blue-600">POST /api/movements</h3>
                <p className="text-sm text-gray-600 mt-1">Create a new movement</p>
                <p className="text-xs text-gray-500 mt-2">Access: Admin only</p>
                <div className="bg-gray-50 p-2 rounded mt-2 text-xs">
                  <code>{`{ "concept": "string", "amount": number, "type": "INCOME|EXPENSE", "userId": "string" }`}</code>
                </div>
              </div>
              
              <div className="border rounded p-4">
                <h3 className="font-medium text-orange-600">PUT /api/movements/&#123;id&#125;</h3>
                <p className="text-sm text-gray-600 mt-1">Update a movement</p>
                <p className="text-xs text-gray-500 mt-2">Access: Admin only</p>
              </div>
              
              <div className="border rounded p-4">
                <h3 className="font-medium text-red-600">DELETE /api/movements/&#123;id&#125;</h3>
                <p className="text-sm text-gray-600 mt-1">Delete a movement</p>
                <p className="text-xs text-gray-500 mt-2">Access: Admin only</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Users API</h2>
            
            <div className="space-y-4">
              <div className="border rounded p-4">
                <h3 className="font-medium text-green-600">GET /api/users</h3>
                <p className="text-sm text-gray-600 mt-1">Get all users</p>
                <p className="text-xs text-gray-500 mt-2">Access: Admin only</p>
              </div>
              
              <div className="border rounded p-4">
                <h3 className="font-medium text-orange-600">PUT /api/users/&#123;id&#125;</h3>
                <p className="text-sm text-gray-600 mt-1">Update user name and role</p>
                <p className="text-xs text-gray-500 mt-2">Access: Admin only</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Reports API</h2>
            
            <div className="border rounded p-4">
              <h3 className="font-medium text-green-600">GET /api/reports</h3>
              <p className="text-sm text-gray-600 mt-1">Get financial reports and statistics</p>
              <p className="text-xs text-gray-500 mt-2">Access: Admin only</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}