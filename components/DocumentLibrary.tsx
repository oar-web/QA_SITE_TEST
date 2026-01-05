
import React, { useState } from 'react';
import { mockDocuments } from '../services/mockData';
import { DocType, DocStatus } from '../types';

const DocumentLibrary: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('전체');

  return (
    <div className="space-y-6 animate-in slide-in-from-top-4 duration-500 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">문서 보관함</h1>
          <p className="text-slate-500">테스트 계획서, 매뉴얼, 검증 증빙자료 등 주요 산출물을 중앙 관리합니다.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 text-sm">
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
           문서 업로드
        </button>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {['전체', ...Object.values(DocType)].map(t => (
          <button 
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${
              filterType === t ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockDocuments.filter(d => filterType === '전체' || d.type === filterType).map(doc => (
          <div key={doc.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                doc.status === '승인완료' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {doc.status}
              </span>
            </div>
            
            <h3 className="font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">{doc.name}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">{doc.type} v{doc.version}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">관련 릴리즈:</span>
                <span className="text-slate-700 font-semibold">{doc.linkedRelease}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">작성자:</span>
                <span className="text-slate-700 font-semibold">{doc.owner}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 flex gap-2">
              <button className="flex-1 py-2 bg-slate-50 text-slate-600 text-[11px] font-bold rounded-xl hover:bg-slate-100">상세보기</button>
              <button className="flex-1 py-2 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-xl hover:bg-indigo-100">다운로드</button>
            </div>
          </div>
        ))}

        <button className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all gap-2 group min-h-[220px]">
          <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-indigo-300 group-hover:text-indigo-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
          <span className="font-bold text-sm">새 문서 작성</span>
        </button>
      </div>
    </div>
  );
};

export default DocumentLibrary;
