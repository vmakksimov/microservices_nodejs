import { headers } from 'next/headers';
import { cookies } from 'next/headers';

export async function serverFetchCurrentUser() {
    try {
        const cookieStore = cookies();
        const headersList = headers();
        console.log('cookiestore', cookieStore)
        const response = await fetch('http://auth-srv:3000/api/users/currentuser', {
            headers: {
                'Cookie': cookieStore.toString(),
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        console.log('response with fetch', response)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
   
        return data.currentUser;
    } catch (error) {
        console.error("Server-side fetch error:", error);
        return null;
    }
}