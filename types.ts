
export enum Role {
  ADMIN = '관리자',
  QA_TEAM = 'QA팀',
  TECH_SUPPORT = '기술지원',
  RESEARCH_LAB = '연구소'
}

export enum IssueType {
  TEST = '내부테스트',
  FIELD = '필드이슈',
  CUSTOMER_REQUEST = '고객요구'
}

export enum IssueStatus {
  REQUEST = '접수',
  ASSIGNED = '할당완료',
  FIXING = '수정중',
  TESTING = '검증중',
  DONE = '완료'
}

export enum Priority {
  LOW = '낮음',
  MEDIUM = '보통',
  HIGH = '높음',
  CRITICAL = '긴급'
}

export enum DocType {
  TEST_CASE = '테스트케이스',
  CHECKLIST = '체크리스트',
  GUIDE = '매뉴얼',
  RELEASE_NOTE = '릴리즈노트',
  CUSTOM_DOC = '기타문서'
}

export enum DocStatus {
  DRAFT = '초안',
  REVIEWING = '검토중',
  APPROVED = '승인완료',
  DEPRECATED = '폐기'
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  priority: Priority;
  assignee: string;
  department: string;
  dueDate: string;
  releaseVersion: string;
  productName: string; // 추가됨
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Release {
  id: string;
  productName: string; // 추가됨
  version: string;
  status: '활성' | '비활성';
  startDate: string;
  releaseDate: string;
  description: string;
}

export interface Document {
  id: string;
  name: string;
  type: DocType;
  status: DocStatus;
  linkedRelease: string;
  linkedIssues: string[];
  owner: string;
  version: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  type: 'ISSUE' | 'STATUS' | 'DOC' | 'SCHEDULE' | 'COMMENT' | 'RELEASE';
  user: string;
  action: string;
  targetId: string;
  targetName: string;
  timestamp: string;
}
