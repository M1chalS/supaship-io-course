import Navbar from "./Navbar.tsx";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import MessageBoard from "./MessageBoard.tsx";
import AllPosts from "./AllPosts.tsx";
import PostView from "./PostView.tsx";
import Welcome, {welcomeLoader} from "./Welcome.tsx";
import {SupashipUserInfo, useSession} from "./use-session.ts";
import {createContext} from "react";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children: [
        {
            path: "",
            element: <MessageBoard/>,
            children: [
                {
                    path: ":pageNumber",
                    element: <AllPosts/>
                },
                {
                    path: "post/:postId",
                    element: <PostView/>
                },
            ],
        },
        {
            path: "welcome",
            element: <Welcome/>,
            loader: welcomeLoader,
        },
    ]
}]);

export default function App() {
    return <RouterProvider router={router}/>;
}

export const UserContext = createContext<SupashipUserInfo>({
    session: null,
    profile: null,
});

function Layout() {
    const supashipUserInfo = useSession();

    return (<>
    <UserContext.Provider value={supashipUserInfo}>
        <Navbar/>
        <Outlet/>
    </UserContext.Provider>
</>);
}
