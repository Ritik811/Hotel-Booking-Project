import { AppLayout } from "./Layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ListingDetailPage } from "./pages/ListingDetailPage";
import { CreateListingPage } from "./pages/CreateListingsPage";
import { ListingEditPage } from "./pages/ListingEditPage";
import { SignUpAndLogin } from "./pages/SignupAndLoginPage";
import { useState } from "react";

const App = () => {
  const [currUser, setCurrUser] = useState(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout currUser={currUser} setCurrUser={setCurrUser} />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "listings/new",
          element: <CreateListingPage />,
        },
        {
          path: "signup",
          element: <SignUpAndLogin setCurrUser={setCurrUser} />,
        },
        {
          path: "login",
          element: <SignUpAndLogin setCurrUser={setCurrUser} />,
        },

        {
          path: "listings/:id",
          element: <ListingDetailPage />,
        },
        {
          path: "listings/:id/edit/",
          element: <ListingEditPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
