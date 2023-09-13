export interface UserInfo {
  firstName?: string;
  lastName?: string;
  studentId?: string;
  photoUrl?: string;
  role?: Role
}

export interface UserProfilePhoto {
  '@odata.context': string;
  '@odata.mediaContentType': string;
  '@odata.mediaEtag': string;
  id: string;
  height: number;
  width: number;
}

export type Role = 'STUDENT' | 'TEACHER';
