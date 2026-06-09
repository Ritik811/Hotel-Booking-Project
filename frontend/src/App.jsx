import { AppLayout } from "./Layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ListingDetailPage } from "./pages/ListingDetailPage";
import { CreateListingPage } from "./components/CreateListings";

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
