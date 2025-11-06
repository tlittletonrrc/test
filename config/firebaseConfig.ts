import { initializeApp, cert, getApps, ServiceAccount, AppOptions, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

/**
 * Retrieves Firebase configuration from environment variables
 *
 * @returns {AppOptions} Firebase application configuration object
 * @throws {Error} If any required environment variables are missing
 */
const getFirebaseConfig = (): AppOptions => {
    const { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } = 
        process.env;

    if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || ! FIREBASE_CLIENT_EMAIL) {
        throw new Error("Missing Firebase configuration. Please check your environment varaibles");
    }

    const serviceAccount: ServiceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        privateKey: FIREBASE_PRIVATE_KEY,
        clientEmail: FIREBASE_CLIENT_EMAIL,
    };

    return {
        credential: cert(serviceAccount),
    };
}

/**
 * Iniutializes Firebase Admin SDK if not already initialized
 *
 * This fuynction implements the singleton pattern to ensure only
 * onbe Firebase app instance is created
 *
 * @returns {App} Firebase Admin app instance
 */
const initializeFirebaseAdmin = (): App => {
    const existingApp: App = getApps()[0];

    if (existingApp) {
        return existingApp;
    }

    return initializeApp(getFirebaseConfig());
}

const firebaseApp: App = initializeFirebaseAdmin();

// get a reference to the firestore database
const db: Firestore = getFirestore(firebaseApp);

export { db };