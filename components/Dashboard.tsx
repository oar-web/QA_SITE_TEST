
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { mockTimeline, mockIssues, mockReleases } from '../services/mockData.ts';
import { STATUS_COLORS, Icons } from '../constants.tsx';
import { IssueStatus } from '../types.ts';

const Dashboard: React.FC = () => {
  const stats = [
    { label: '진행 중인 이슈', value: '18', color: 'bg-indigo-500' },
    { label: '검증 대기', value: '5', color: 'bg-amber-500' },
    { label: '긴급 결함', value: '3', color: 'bg-rose-500' },
    { label: '완료된 항목 (주간)', value: '12', color: 'bg-emerald-500' },
  ];

  // 이슈별 현황 데이터 구성
  const issueStatusData = [
    { name: 'CoreX', 접수: 2, 진행: 4, 검증: 1, 완료: 5 },
    { name: 'Nexus', 접수: 1, 진행: 3, 검증: 2, 완료: 3 },
    { name: 'Cloud', 접수: 3, 진행: 2, 검증: 1, 완료: 4 },
    { name: 'Mobile', 접수: 0, 진행: 5, 검증: 0, 완료: 2 },
  ];

  const pieData = [
    { name: '필드이슈', value: 35, color: '#f43f5e' },
    { name: '내부테스트', value: 45, color: '#6366f1' },
    { name: '고객요구', value: 20, color: '#10b981' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">통합 대시보드</h1>
          <p className="text-slate-500 mt-1">실시간 전사 QA 프로세스 및 제품별 릴리즈 현황입니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors">
            보고서 내보내기
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
            + 신규 이슈 등록
          </button>
        </div>
      </div>

      {/* 제품별 최신 릴리즈 현황 (4대 제품) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockReleases.map((rel) => (
          <div key={rel.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:ring-2 hover:ring-indigo-100 transition-all">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{rel.productName}</span>
              <span className="text-xs font-bold text-slate-400">{rel.version}</span>
            </div>
            <h4 className="font-bold text-slate-800 truncate">{rel.description}</h4>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400">출시예정일: {rel.releaseDate}</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* 요약 수치 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-800 text-white p-5 rounded-2xl shadow-sm">
            <p className="text-slate-400 text-xs font-medium">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 각 이슈별 현황 섹션 (기존 트렌드 차트 대체) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-slate-800">제품별 이슈 진행 현황</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-200"></div><span className="text-[10px] text-slate-400">접수</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500"></div><span className="text-[10px] text-slate-400">진행</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[10px] text-slate-400">완료</span></div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issueStatusData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontWeight: 600, fontSize: 12}} width={70} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="접수" stackId="a" fill="#e2e8f0" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="진행" stackId="a" fill="#6366f1" />
                  <Bar dataKey="검증" stackId="a" fill="#c084fc" />
                  <Bar dataKey="완료" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
               <p className="text-xs text-slate-500 leading-relaxed text-center">
                 현재 <span className="font-bold text-indigo-600">Mobile</span> 제품군에서 수정 중인 이슈가 가장 많으며, <span className="font-bold text-emerald-600">CoreX</span> 제품군이 가장 높은 완료율을 보이고 있습니다.
               </p>
            </div>
          </div>

          {/* 최근 활동 타임라인 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">최근 활동 내역</h3>
              <button className="text-indigo-600 text-sm font-semibold hover:underline">전체보기</button>
            </div>
            <div className="space-y-6">
              {mockTimeline.map((event, idx) => (
                <div key={event.id} className="flex gap-4 relative">
                  {idx !== mockTimeline.length - 1 && (
                    <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-slate-100"></div>
                  )}
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 z-10">
                    <Icons.Timeline className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm text-slate-800">
                      <span className="font-bold">{event.user}</span>님이 {event.action} 
                      <span className="ml-2 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-bold">{event.targetName}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(event.timestamp).toLocaleString('ko-KR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 사이드 위젯 */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">이슈 유형 분포</h3>
            <div className="h-[200px] w-full flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3 mt-4">
               {pieData.map((d, i) => (
                 <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></div>
                     <span className="text-xs text-slate-600 font-semibold">{d.name}</span>
                   </div>
                   <span className="text-xs text-slate-400">{d.value}%</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">차기 릴리즈: v2.4.0</h3>
              <p className="text-white/80 text-xs mb-6">배포까지 6일 남았습니다. 최종 검수 단계입니다.</p>
              <div className="w-full bg-white/20 h-2 rounded-full mb-6">
                <div className="bg-white h-full rounded-full" style={{width: '92%'}}></div>
              </div>
              <button className="w-full bg-white text-indigo-600 text-sm font-black py-3 rounded-xl hover:bg-slate-50 transition-colors">
                릴리즈 상세 확인
              </button>
            </div>
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl">
            <h4 className="text-emerald-800 font-bold text-sm mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
              주간 품질 리포트
            </h4>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              이번 주 잔여 크리티컬 버그 0건을 달성했습니다. 다음 주 수요일 정기 릴리즈 준비가 원활히 진행되고 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
