
import React, { useState } from 'react';
import { mockIssues } from '../services/mockData';
import { STATUS_COLORS, PRIORITY_COLORS, Icons } from '../constants';
import { IssueStatus, IssueType, Priority } from '../types';

const IssueList: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIssues = mockIssues.filter(issue => {
    const matchesType = filterType === '전체' || issue.type === filterType;
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          issue.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">이슈 보관함</h1>
          <p className="text-slate-500">제품별 및 부서별로 등록된 모든 개발/QA 이슈를 관리합니다.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
          새 이슈 등록
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <input 
              type="text" 
              placeholder="ID, 제품명 또는 키워드로 검색..."
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['전체', ...Object.values(IssueType)].map(type => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === type ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">제품명</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">제목</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">구분</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">상태</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">우선순위</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">담당자</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-5">
                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {issue.id}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-800">{issue.productName}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm font-semibold text-slate-700 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {issue.title}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {issue.tags.map(tag => (
                          <span key={tag} className="text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded italic">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-medium text-slate-500">{issue.type}</span>
                  </td>
                  <td className="px-6 py-5">
                    {/* Fix: Conversion of type 'IssueStatus' to type 'keyof typeof STATUS_COLORS' by using intermediate 'unknown' cast */}
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-tighter ${STATUS_COLORS[issue.status as unknown as keyof typeof STATUS_COLORS] || 'bg-slate-100 text-slate-400'}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    {/* Fix: Conversion of type 'Priority' to type 'keyof typeof PRIORITY_COLORS' by using intermediate 'unknown' cast */}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${PRIORITY_COLORS[issue.priority as unknown as keyof typeof PRIORITY_COLORS]}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden shrink-0">
                        <img src={`https://picsum.photos/24/24?seed=${issue.assignee}`} alt="" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">{issue.assignee}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredIssues.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.Issues className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-400 text-sm">해당 조건의 이슈가 존재하지 않습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueList;
