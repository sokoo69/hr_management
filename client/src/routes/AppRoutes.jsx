import { createBrowserRouter } from "react-router-dom";
import { EmployeeRoutes } from "./employeeroutes.jsx"
import { HRRoutes } from "./HRroutes.jsx";
import { ErrorBoundary } from "../components/common/ErrorBoundary.jsx";

export const router = createBrowserRouter([
    ...EmployeeRoutes,
    ...HRRoutes 
],
    {
        errorElement: <ErrorBoundary />,
        future: {
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionStatusRevalidation: true,
            v7_startTransition: true,
            v7_skipActionErrorRevalidation: true,
        }
    }
)