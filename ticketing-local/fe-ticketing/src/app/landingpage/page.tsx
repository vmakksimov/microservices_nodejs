import { serverFetchCurrentUser } from "@lib/sercer-utils";
import { axiosInstance } from "@refinedev/simple-rest";
export const metadata = {
    title: "Landing Page",
    description: "This is the landing page",
};

const LandingPage = async () => {
   const currentUser = await fetchCurrentUser();
    return (
        <div>
            {currentUser ? (
                <div>Welcome new user, {currentUser.email}</div>
            ) : (
                <div>Please sign in <a href="/signup">here</a></div>
            )}
        </div>
    );
};

async function fetchCurrentUser(){
    console.log("inside fetch current user")
    if (typeof window === 'undefined'){
        const currentUser = await serverFetchCurrentUser();
        console.log("current user", currentUser)
        return currentUser;
    } else {
        const response = await axiosInstance.get('/api/users/currentuser');
        return response;
    }


}

export default LandingPage;