import Navbar from "./Navbar.tsx";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import MessageBoard from "./MessageBoard.tsx";
import AllPosts from "./AllPosts.tsx";
import PostView from "./PostView.tsx";
import Welcome from "./Welcome.tsx";

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
        },
    ]
}]);

export default function App() {
    return <RouterProvider router={router}/>;
}

function Layout() {
    return <>
        <Navbar/>
        <Outlet/>
    </>;
}
