import ClassComponent, { ClassInterface } from "../class/Class";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../app/reducer";
import { logout } from "../../app/actions";
export function Home() {
  const classes = useSelector<AppState, AppState["classes"]>(
    (state) => state.classes
  );
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());
  return (
    <div>
      <div className={styles.logoutContainer}>
        <button onClick={(e) => handleLogout()}> Logout</button>
      </div>
      <div className={styles.classesContainer}>
        <div>
          {classes.map((clss: ClassInterface, idx: number) => {
            return <ClassComponent key={idx} clss={clss} />;
          })}
        </div>
      </div>
    </div>
  );
}
