import { AppLayout } from "./Layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ListingDetailPage } from "./pages/ListingDetailPage";
import { CreateListingPage } from "./pages/CreateListingsPage";
import { ListingEditPage } from "./pages/ListingEditPage";
import { SignUpAndLogin } from "./pages/SingnupAndLoginPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "listings/new",
          element: <CreateListingPage />,
        },
        { path: "signup", element: <SignUpAndLogin /> },
        { path: "login", element: <SignUpAndLogin /> },
        {
          path: "listings/login",
          element: <SignUpAndLogin />,
        },
        {
          path: "listings/:id",
          element: <ListingDetailPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
