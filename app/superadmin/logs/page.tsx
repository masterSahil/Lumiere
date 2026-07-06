'use client'
import { useState, useEffect } from 'react';
import { Activity, Database, Key } from 'lucide-react';
import Loader from '@/app/loading';

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching logs
    setLogs([
      { _id: '1', action: 'LOGIN_SUCCESS', entity: 'User', ipAddress: '192.168.1.1', createdAt: new Date().toISOString() },
      { _id: '2', action: 'UPDATE_SETTINGS', entity: 'System', ipAddress: '192.168.1.2', createdAt: new Date().toISOString() },
      { _id: '3', action: 'DELETE_ORDER', entity: 'Order', ipAddress: '10.0.0.5', createdAt: new Date().toISOString() },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-10">
        <h1 className="font-serif text-[42px] leading-tight font-semibold text-white mb-2">Audit Logs</h1>
        <p className="text-gray-400 font-sans max-w-xl text-[15px] leading-relaxed">
          System-wide activity and security logs.
        </p>
      </div>

      <div className="bg-dark-surface rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-white/5 text-white uppercase font-semibold text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Entity</th>
              <th className="px-6 py-4">IP Address</th>
              <th className="px-6 py-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center py-8"><Loader /></td></tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-white">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-white/10 px-2 py-1 rounded text-xs">{log.entity}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{log.ipAddress}</td>
                  <td className="px-6 py-4">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
