import Login from "../screens/Login";
import SurveyForm from "../screens/SurveyForm";
import UserTypesScreen from "../screens/UserTypesScreen";
import { screenNames } from "./screenNames";

type ScreenData = {
    name: string;
    component: React.LazyExoticComponent<React.FC>;
  };

  



export const screenData = [
    {
        name: screenNames.login,
        component: Login
    },
    {
        name: screenNames.userType,
        component: UserTypesScreen,
    },
    {
        name: screenNames.form1,
        component: SurveyForm,
    },
];