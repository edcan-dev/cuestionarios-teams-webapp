import { isDevMode } from '@angular/core';

export const redirectUrl = isDevMode() ?
"http://localhost:4200" :
"https://orange-water-0d503ef10.3.azurestaticapps.net";
