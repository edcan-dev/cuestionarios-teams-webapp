export interface UserInfo {
  firstName?: string;
  lastName?: string;
  studentId?: string;
  photoUrl?: string;
}

export interface UserProfilePhoto {
  '@odata.context': string;
  '@odata.mediaContentType': string;
  '@odata.mediaEtag': string;
  id: string;
  height: number;
  width: number;
}

export interface ProfileType {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string,
  jobTitle?: string
  officeLocation?: string
};
