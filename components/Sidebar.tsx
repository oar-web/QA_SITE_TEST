
import React from 'react';
import { Icons } from '../constants.tsx';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: Icons.Dashboard },
    { id: 'issues', label: '이슈 관리', icon: Icons.Issues },
    { id: 'releases', label: '릴리즈 관리', icon: Icons.Release },
    { id: 'documents', label: '문서 보관함', icon: Icons.Documents },
  ];

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200 flex flex-col shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            Q
          </div>
          <span className="text-xl font-bold text-slate-800 uppercase tracking-tight">QA-Nexus</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <h4 className="font-bold text-sm mb-1">AI 도우미 활용하기</h4>
          <p className="text-[10px] opacity-70 mb-4">릴리즈 노트를 생성할 때 이슈 목록을 기반으로 요약을 자동 작성합니다.</p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold py-2 rounded-lg transition-colors">
            사용 가이드 보기
          </button>
        </div>
        
        <div className="mt-6 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-indigo-50 overflow-hidden">
            <img src="https://picsum.photos/40/40?seed=admin" alt="사용자 프로필" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">관리자</p>
            <p className="text-[10px] text-slate-400 font-medium">QA 팀장</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
