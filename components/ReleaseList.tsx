
import React, { useState } from 'react';
import { mockReleases, mockIssues } from '../services/mockData.ts';
import { generateReleaseNotes } from '../services/geminiService.ts';

const ReleaseList: React.FC = () => {
  const [selectedRel, setSelectedRel] = useState(mockReleases[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiNotes, setAiNotes] = useState<string | null>(null);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    const issues = mockIssues.filter(i => i.productName === selectedRel.productName && i.releaseVersion === selectedRel.version);
    const result = await generateReleaseNotes(selectedRel.version, issues);
    setAiNotes(result || "");
    setIsGenerating(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="lg:col-span-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">버전 관리</h2>
          <button className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-3">
          {mockReleases.map(rel => (
            <div 
              key={rel.id}
              onClick={() => { setSelectedRel(rel); setAiNotes(null); }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedRel.id === rel.id 
                ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-50' 
                : 'bg-white/50 border-slate-100 hover:border-indigo-200 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">{rel.productName}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${rel.status === '활성' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  {rel.status}
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800 mb-1">{rel.version}</p>
              <p className="text-xs text-slate-500 mb-4 line-clamp-1">{rel.description}</p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>시작: {rel.startDate}</span>
                <span>완료예정: {rel.releaseDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 min-h-[600px]">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-slate-800">{selectedRel.productName} {selectedRel.version}</h1>
                <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold uppercase">릴리즈 상세</span>
              </div>
              <p className="text-slate-500 mt-2">{selectedRel.description}</p>
            </div>
            <button 
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-black transition-all disabled:opacity-50"
            >
              {isGenerating ? 'AI 생성 중...' : 'AI 릴리즈 요약'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">총 이슈</span>
              <span className="text-xl font-bold text-slate-800">
                {mockIssues.filter(i => i.productName === selectedRel.productName && i.releaseVersion === selectedRel.version).length}
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">완료 항목</span>
              <span className="text-xl font-bold text-emerald-600">
                {mockIssues.filter(i => i.productName === selectedRel.productName && i.releaseVersion === selectedRel.version && i.status === '완료').length}
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">진행 중</span>
              <span className="text-xl font-bold text-indigo-600">
                {mockIssues.filter(i => i.productName === selectedRel.productName && i.releaseVersion === selectedRel.version && i.status !== '완료').length}
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">연결 문서</span>
              <span className="text-xl font-bold text-slate-800">1</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-indigo-600 rounded-full"></div>
                관련 이슈 리스트
              </h3>
              <div className="border border-slate-100 rounded-2xl divide-y divide-slate-50 overflow-hidden shadow-sm">
                {mockIssues.filter(i => i.productName === selectedRel.productName && i.releaseVersion === selectedRel.version).map(issue => (
                  <div key={issue.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{issue.id}</span>
                      <p className="text-sm font-semibold text-slate-700">{issue.title}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 uppercase">
                      {issue.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {aiNotes && (
              <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl animate-in zoom-in-95 duration-300">
                <h3 className="text-indigo-800 font-bold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" /></svg>
                  AI 자동 생성 릴리즈 노트
                </h3>
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {aiNotes}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReleaseList;
