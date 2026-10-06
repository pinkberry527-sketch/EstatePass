import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
// import DashboardPage from "../features/dashboard/SecurityDashboard";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleprotectedRoutes";
import ResidentsPage from "../pages/residents/ResidentsPage";
import VerifyVisitorPassPage from "../pages/VerifyVisitorPass";
import VisitorPassesPage from "../pages/visitorpass/VisitorPassPage";
import AccessLogsPage from "../features/access-logs/AccessLogsPage";
import CreateResidentPage from "../pages/residents/CreateResidentPage";
import CreateSecurityOfficerPage from "../pages/security/CreateSecurityOfficerPage";
import SecurityOfficersPage from "../pages/security/SecurityOfficersPage";
import HouseholdMembersPage from "../pages/estate/Household";
import LandingPage from "../pages/LandingPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import AcceptInvitationPage from "../pages/AcceptInvitationPage";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/accept-invitation" element={<AcceptInvitationPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/visitor-passes" element={<VisitorPassesPage />} />

        <Route path="/access-logs" element={<AccessLogsPage />} />

        <Route path="/verify-pass" element={<VerifyVisitorPassPage />} />
        <Route path="/household-members" element={<HouseholdMembersPage />} />

        <Route element={<RoleProtectedRoute allowedRoles={["ESTATE_ADMIN"]} />}>
          <Route path="/residents/create" element={<CreateResidentPage />} />

          <Route path="/residents" element={<ResidentsPage />} />

          <Route path="/security-officers" element={<SecurityOfficersPage />} />
          <Route
            path="/security-officers/create"
            element={<CreateSecurityOfficerPage />}
          />

          
        </Route>
      </Route>
    </Routes>
  );
}
