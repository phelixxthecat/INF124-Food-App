import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase';

export const userAuthentication = {
  register: async (username: string, email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: username.trim() });
      return { success: true, user: result.user };
    } catch (error: any) {
      let message = 'Something went wrong.';
      switch (error.code) {
        case 'auth/email-already-in-use': message = 'That email is already in use.'; break;
        case 'auth/invalid-email':        message = 'Please enter a valid email.'; break;
        case 'auth/weak-password':        message = 'Password must be at least 6 characters.'; break;
      }
      return { success: false, error: message };
    }
  },

  login: async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: userCredential.user.displayName?.trim() });
    return userCredential.user;
  },

  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message ?? 'Unable to log out.' };
    }
  }
};

export default userAuthentication;