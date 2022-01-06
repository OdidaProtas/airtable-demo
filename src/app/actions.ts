import Airtable from "airtable";
import { store } from "./store";

var base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(String(process.env.REACT_APP_AIRTABLE_BASE));

export type Action = {
  type:
    | "ADD_STUDENT"
    | "ADD_CLASSES"
    | "TOGGLE_LOADER"
    | "LOGOUT"
    | "ADD_ERROR";
  payload: string;
};

export const addStudent = (studentName: string): Action => ({
  type: "ADD_STUDENT",
  payload: studentName,
});

export const toggleLoading = (): Action => ({
  type: "TOGGLE_LOADER",
  payload: "",
});

const addClasses = (classDetails: any): Action => ({
  type: "ADD_CLASSES",
  payload: classDetails,
});

export const logout = (): Action => ({ type: "LOGOUT", payload: "" });
export const addError = (): Action => ({ type: "ADD_ERROR", payload: "" });

export const login = (
  studentName: string,
  dispatch: typeof store.dispatch
): Action => {
  base("Students")
    .select({
      filterByFormula: `Name = "${studentName}"`,
      fields: ["Classes"],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        if (!records.length) {
          dispatch(addError());
          dispatch(toggleLoading());
        }
        records.forEach(function (record) {
          fetchClassRecords(record.get("Classes"), dispatch);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          dispatch(toggleLoading());
          dispatch(addError());
          return;
        }
      }
    );
  return {
    type: "ADD_STUDENT",
    payload: studentName,
  };
};

const fetchClassRecords = (ids: any, dispatch: typeof store.dispatch) => {
  base("Classes")
    .select({
      filterByFormula:
        "OR(" +
        ids
          .map((id: string) => {
            return `RECORD_ID()='${id}'`;
          })
          .join(",") +
        ")",
      fields: ["Students", "Name"],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          fetchStudentRecords(
            record.get("Students") as string[],
            dispatch,
            String(record.get("Name"))
          );
        });
        toggleLoading();
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          dispatch(toggleLoading());
          dispatch(addError());
          return;
        }
      }
    );
};

const fetchStudentRecords = (
  ids: string[],
  dispatch: typeof store.dispatch,
  className: string
) => {
  base("Students")
    .select({
      filterByFormula:
        "OR(" +
        ids
          .map((id: string) => {
            return `RECORD_ID()='${id}'`;
          })
          .join(",") +
        ")",
      fields: ["Name"],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const students: string[] = [];
        records.forEach(function (record) {
          students.push(String(record.get("Name")));
        });
        dispatch(addClasses({ className, students: students }));
        toggleLoading();
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          dispatch(toggleLoading());
          dispatch(addError());
          return;
        }
      }
    );
};
