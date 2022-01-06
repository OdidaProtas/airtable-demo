import React from "react";
import styles from "./Class.module.css";

export interface ClassInterface {
  className: string;
  students: string[];
}

export interface ClassComponentInterface {
  clss: ClassInterface;
}

const ClassComponent: React.FC<ClassComponentInterface> = ({
  clss: { className, students },
}) => {
  return (
    <div className={styles.classContainer}>
      <h3>Name</h3>
      <div>{className}</div>
      <h3>Students</h3>
      <div className={styles.studentContainer}>
        {students.map((student: string, i: number) => (
          <span key={i}>{`${student}, `}</span>
        ))}
      </div>
    </div>
  );
};

export default ClassComponent;
