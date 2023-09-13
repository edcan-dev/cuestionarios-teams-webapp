import { isDevMode } from '@angular/core';
import { Role } from '../home/interfaces/home.interfaces';

export const redirectUrl = isDevMode() ?
"http://localhost:4200" :
"https://orange-water-0d503ef10.3.azurestaticapps.net";

export function getTeacherRole(studentId: string): Role {
  if(studentId === '201910642') return 'TEACHER'
  return 'STUDENT'
}
