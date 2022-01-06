import styles from "./Login.module.css";
import { AppState } from "../../app/reducer";

import { useDispatch, useSelector } from "react-redux";
import { addStudent, login, toggleLoading } from "../../app/actions";

export function Login() {
  const dispatch = useDispatch();

  const studentName = useSelector<AppState, AppState["studentName"]>(
    (state) => state.studentName
  );

  const loading = useSelector<AppState, AppState["loading"]>(
    (state) => state.loading
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addStudent(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(toggleLoading());
    dispatch(login(studentName, dispatch));
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="input">Student name: </label>
          <input
            value={studentName}
            id="input"
            required
            className={styles.input}
            onChange={handleChange}
            type="text"
          />
          <button
            className={styles.submitBtn}
            type={loading ? "button" : "submit"}
          >
            {loading ? "..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
