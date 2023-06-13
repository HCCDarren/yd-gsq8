export class GoogleAuthState {
  profile: UserProfile = null;
  isAuthorized = false;
}

export class UserProfile {
  id: string = null;
  fullName: string = null;
  giveName: string = null;
  familyName: string = null;
  imageUrl: string = null;
  email: string = null;
}
