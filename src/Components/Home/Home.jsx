import AddButton from "../AddButton/AddButton";
import Grid from "../Grid/Grid";
import PropTypes from 'prop-types';

Home.propTypes = {
    userData: PropTypes.object,
    setUserData: PropTypes.func
};


export default function Home({userData,setUserData}){
    return (
        <>
        <Grid userData={userData} setUserData={setUserData} />
        <AddButton userData={userData} setUserData={setUserData}/>
        </>
        
    );
}