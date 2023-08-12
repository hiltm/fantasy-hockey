
import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";
import UserProfile from "views/UserProfile.js";
import TeamSetupComponent from "views/TeamSetup.js";
import LineupMachineComponent from "views/LineupMachine.js";
import PlayerPickupComponent from "views/PlayerPickup.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/team-setup",
    name: "Team Setup",
    icon: "tim-icons icon-puzzle-10",
    component: <TeamSetupComponent />,
    layout: "/admin",
  },
  {
    path: "/lineup-machine",
    name: "Lineup Machine",
    icon: "tim-icons icon-puzzle-10",
    component: <LineupMachineComponent />,
    layout: "/admin",
  },
  {
    path: "/player-pickup",
    name: "Player Pickup",
    icon: "tim-icons icon-puzzle-10",
    component: <PlayerPickupComponent />,
    layout: "/admin",
  },
];
export default routes;
