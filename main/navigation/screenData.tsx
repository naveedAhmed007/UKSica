import Login from "../screens/Login";
import SurveyForm from "../screens/SurveyForm";
import SurveyForm2 from "../screens/SurveyForm2";
import UserTypesScreen from "../screens/UserTypesScreen";
import { screenNames } from "./screenNames";






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
    {
        name: screenNames.form2,
        component: SurveyForm2,
    },
];