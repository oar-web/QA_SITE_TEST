
import { Issue, IssueType, IssueStatus, Priority, Release, Document, DocType, DocStatus, TimelineEvent } from '../types';

export const mockReleases: Release[] = [
  { id: 'rel-1', productName: 'CoreX System', version: 'v2.4.0', status: '활성', startDate: '2024-04-01', releaseDate: '2024-05-15', description: '메인 엔진 성능 최적화 업데이트' },
  { id: 'rel-2', productName: 'Nexus Link', version: 'v1.1.2', status: '활성', startDate: '2024-03-01', releaseDate: '2024-05-20', description: '연동 모듈 보안 패치' },
  { id: 'rel-3', productName: 'Nexus Cloud', version: 'v3.0.5', status: '활성', startDate: '2024-05-01', releaseDate: '2024-06-30', description: '클라우드 인프라 확장' },
  { id: 'rel-4', productName: 'Edge Mobile', version: 'v1.0.8', status: '활성', startDate: '2024-04-15', releaseDate: '2024-05-25', description: '안드로이드 14 호환성 개선' },
];

export const mockIssues: Issue[] = [
  {
    id: 'ISS-001',
    productName: 'CoreX System',
    title: '특정 엣지 케이스에서 로그인 인증 우회 발생',
    description: 'OAuth 플로우에서 잠재적인 보안 취약점이 발견되었습니다...',
    type: IssueType.TEST,
    status: IssueStatus.FIXING,
    priority: Priority.CRITICAL,
    assignee: '김철수 책임',
    department: '연구소',
    dueDate: '2024-05-20',
    releaseVersion: 'v2.4.0',
    tags: ['보안', '인증'],
    createdAt: '2024-05-10T10:00:00Z',
    updatedAt: '2024-05-11T14:30:00Z'
  },
  {
    id: 'ISS-002',
    productName: 'Edge Mobile',
    title: '고객 요청: 대시보드 UI 테마 커스터마이징',
    description: 'ABC사에서 전용 컬러 스킴 적용을 요청하였습니다...',
    type: IssueType.CUSTOMER_REQUEST,
    status: IssueStatus.REQUEST,
    priority: Priority.MEDIUM,
    assignee: '미할당',
    department: 'QA팀',
    dueDate: '2024-06-05',
    releaseVersion: 'v1.0.8',
    tags: ['UI', '커스텀'],
    createdAt: '2024-05-12T09:00:00Z',
    updatedAt: '2024-05-12T09:00:00Z'
  },
  {
    id: 'ISS-003',
    productName: 'Nexus Cloud',
    title: '리포트 생성 중 프로덕션 서버 타임아웃 발생',
    description: '50MB 이상의 리포트 생성 시 게이트웨이 타임아웃 오류...',
    type: IssueType.FIELD,
    status: IssueStatus.TESTING,
    priority: Priority.HIGH,
    assignee: '이영희 선임',
    department: '연구소',
    dueDate: '2024-05-18',
    releaseVersion: 'v3.0.5',
    tags: ['인프라', '성능'],
    createdAt: '2024-05-08T16:20:00Z',
    updatedAt: '2024-05-14T11:00:00Z'
  },
  {
    id: 'ISS-004',
    productName: 'Nexus Link',
    title: 'API 연동 시 간헐적인 데이터 누락 현상',
    description: '외부 시스템 연동 과정에서 일부 트랜잭션이 유실됨...',
    type: IssueType.FIELD,
    status: IssueStatus.FIXING,
    priority: Priority.HIGH,
    assignee: '박지민 책임',
    department: '연구소',
    dueDate: '2024-05-22',
    releaseVersion: 'v1.1.2',
    tags: ['연동', '데이터'],
    createdAt: '2024-05-13T11:00:00Z',
    updatedAt: '2024-05-14T09:00:00Z'
  }
];

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'v2.4.0 QA 테스트 계획서',
    type: DocType.TEST_CASE,
    status: DocStatus.APPROVED,
    linkedRelease: 'v2.4.0',
    linkedIssues: ['ISS-001'],
    owner: '최QA 팀장',
    version: '1.4',
    updatedAt: '2024-05-10T11:00:00Z'
  },
  {
    id: 'doc-2',
    name: '릴리즈 노트 v2.4.0 초안',
    type: DocType.RELEASE_NOTE,
    status: DocStatus.REVIEWING,
    linkedRelease: 'v2.4.0',
    linkedIssues: [],
    owner: '관리자',
    version: '0.9',
    updatedAt: '2024-05-14T15:30:00Z'
  }
];

export const mockTimeline: TimelineEvent[] = [
  { id: 'ev-1', type: 'ISSUE', user: '홍길동 주임', action: '새 필드 이슈 등록', targetId: 'ISS-004', targetName: 'API 연동 데이터 누락', timestamp: '2024-05-14T15:30:00Z' },
  { id: 'ev-2', type: 'STATUS', user: '박검증 선임', action: '상태 변경: 검증중', targetId: 'ISS-003', targetName: '서버 타임아웃 발생', timestamp: '2024-05-14T14:20:00Z' },
  { id: 'ev-3', type: 'DOC', user: '연구원 A', action: '새 매뉴얼 업로드', targetId: 'doc-1', targetName: 'CoreX 운영 가이드', timestamp: '2024-05-14T10:00:00Z' },
];
