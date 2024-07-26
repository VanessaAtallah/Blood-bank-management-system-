
import DonorList from "./components/DonorList";
import ViewDonation from "./components/ViewDonation";
import SignUp from "./components/SignUp";
import Donation from "./components/Donation";
import SignIn from "./components/SignIn";
import AddDonor from "./components/AddDonor";
import HomePage from "./components/HomePage";
import Dashboard from './components/Dashboard';

const AppRoutes = [
  
  {
    index: true,
    element: <SignIn/>
  },
  {
    path: '/SignIn',
    element: <SignIn/>
  },
  {
    path: '/SignUp',
    element: <SignUp/>
  },
  {
    path: '/SignIn',
    element: <SignIn/>
  },
  {
    path: '/HomePage',
    element: <HomePage/>
  },
  {
    path: '/AddDonor',
    element: <AddDonor/>
  },
  {
    path: '/DonorList',
    element: <DonorList/>
  },
  {
    path: '/Dashboard',
    element: <Dashboard/>
  }
 
 
  
  
];

export default AppRoutes;
