import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import SignUp from "./Pages/Auth/SignUp"
import VerifyEmail from "./Pages/Auth/VerifyEmail"
import UserType from "./Pages/Auth/UserType"
import GigPreferences from "./Pages/Auth/GigPreference"
import IdentityVerification from "./Pages/Auth/IdentityVerification"
import DocumentVerification from "./Pages/Auth/DocumentVerification"
import VerificationDetails from "./Pages/Auth/VerificationDetails"
import LivenessCheck from "./Pages/Auth/LivenessCheck"
import CompleteProfile from "./Pages/Auth/CompleteProfile"
import JobPreferences from "./Pages/Auth/JobPreference"
import Login from "./Pages/Auth/Login"
import ResetPassword from "./Pages/Auth/ResetPassword"
import LandingPage from "./Pages/LandingPage"
import LandingLayout from "./components/Landing/LandingLayout"
import Overview from "./Pages/Overview"
import GigDetails from "./Pages/GigDetails"
import DashboardLayout from "./components/Dashboard/DashboardLayout"
import CreateCourse from "./Pages/CreateCourse"
import MyCreations from "./Pages/MyCreation"
import AddCourseContent from "./Pages/AddCourseContent"
import CoursePreview from "./Pages/CoursePreview"
import SetAvailability from "./Pages/SetAvailability"
import OneOnOneCoursePreview from "./Pages/OneonOneCoursePreview"
import ExplorePage from "./Pages/ExplorePage"
import CourseHistoryPage from "./Pages/CourseHistoryPage"
import SelfPacedCourseDetails from "./Pages/SelfPacedCourseDetailPage"
import OneOnOneCourseDetailsPage from "./Pages/OneOnOneCourseDetailsPage"
import AccountLayout from "./components/Dashboard/AccountLayout"
import EditProfile from "./Pages/Account/EditProfile"
import WorkSamples from "./Pages/Account/WorkSample"
import Notification from "./Pages/Account/Notification"
import ChangePassword from "./Pages/Account/ChangePassword"
import HelpCenter from "./Pages/Account/HelpCenter"
import Terms from "./Pages/Account/Terms"
import Privacy from "./Pages/Account/Privacy"
import Wallet from "./Pages/WalletPage"
import OverviewPage from "./Pages/OverviewPage"
import PostGigPage from "./Pages/PostGigPage"
import MyCasePage from "./Pages/MyCasePage"
import GigOffersPage from "./pages/GigOffersPage"
import MessagesPage from "./pages/MessagesPage"
import VideoCallPage from "./pages/VideoCallPage"

// View Transition wrapper
function ViewTransitionWrapper({ children }) {
  const location = useLocation()

  useEffect(() => {
    // Check if the browser supports View Transitions API
    if (!document.startViewTransition) {
      return
    }

    // Start a view transition
    document.startViewTransition(() => {
      // Force a reflow to ensure the transition is applied
      document.documentElement.scrollTop
    })
  }, [location])

  return children
}

function App() {
  return (
    <Router>
      <ViewTransitionWrapper>
      <Routes>
        {/* Auth routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/user-type" element={<UserType />} />
        <Route path="/gig-preferences" element={<GigPreferences />} />
        <Route path="/job-preferences" element={<JobPreferences />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/identity-verification" element={<IdentityVerification />} />
        <Route path="/document-verification" element={<DocumentVerification />} />
        <Route path="/verification-details" element={<VerificationDetails />} />
        <Route path="/liveness-check" element={<LivenessCheck />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Main routes */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
          {/* <Route path="about" element={<About />} />
          <Route path="terms" element={<Terms />} /> */}
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="add-course-content" element={<AddCourseContent />} />
          <Route path="set-availability" element={<SetAvailability />} />
          <Route path="course-preview" element={<CoursePreview />} />
          <Route path="one-on-one-preview" element={<OneOnOneCoursePreview />} />
          <Route path="creations" element={<MyCreations />} />
          <Route path="course-history" element={<CourseHistoryPage />} />
          <Route path="course/:id" element={<OneOnOneCourseDetailsPage />} />
          <Route path="course/:id/self-paced" element={<SelfPacedCourseDetails />} />
          <Route path="post-gig" element={<PostGigPage />} />
          <Route path="case" element={<MyCasePage />} />
          <Route path="gigs/:id/offers" element={<GigOffersPage />} />
          {/* Add other dashboard routes here */}
            <Route path="/dashboard/account" element={<AccountLayout />}>
              <Route index element={<EditProfile />} />
              <Route path="work-samples" element={<WorkSamples />} />
              <Route path="notification" element={<Notification />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="help-center" element={<HelpCenter />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              {/* Add other account routes as needed */}
            </Route>
          </Route>
        <Route path="gigs/:id" element={<GigDetails />} />
        <Route path="/dashboard/wallet" element={<Wallet />} />
         {/* Messages and Calls */}
         <Route path="/messages/:id?" element={<DashboardLayout />}>
            <Route index element={<MessagesPage />} />
          </Route>
          <Route path="/video-call/:id" element={<VideoCallPage />} />
          <Route path="/call/:id" element={<VideoCallPage videoOff={true} />} />
      </Routes>
      </ViewTransitionWrapper>
    </Router>
  )
}

export default App

// Compare this snippet from src/pages/Home.jsx:

/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustomButton from './components/CustomButton'
import { Rocket } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setCount((count) => count + 1)
    // Simulate async action
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <CustomButton 
        onClick={handleClick}
        variant="outline"
        icon={<Rocket className="h-4 w-4" />}
        isLoading={isLoading}
        >
          count is {count}
        </CustomButton>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App */
