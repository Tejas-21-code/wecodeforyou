import React from "react";
import "./Task.css";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { storage } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Task = () => {
  const [task, setTask] = useState([]);
  const [taskNo, setTaskNo] = useState("");
  const [taskName, setTaskName] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const taskCollectionRef = collection(db, "task");

  const getTask = async () => {
    const data = await getDocs(taskCollectionRef);

    setTask(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };
  useEffect(() => {
    getTask();
  }, [getTask]);

  const clickHandler = () => {
    if (taskName !== "") {
      addDoc(taskCollectionRef, { description: taskName, days: taskNo });
    }
    getTask();

    setTaskName("");
    setTaskNo(0);
  };

  const updateHandler = async (id, days) => {
    const taskDoc = doc(db, "task", id);

    const newField = { days: Number(days) + 1 };
    await updateDoc(taskDoc, newField);
    getTask();
  };

  const deleteHandler = async (id) => {
    const taskDoc = doc(db, "task", id);

    await deleteDoc(taskDoc);
    getTask();
  };

  const changeHandler = (event) => {
    setTaskName(event.target.value);
  };

  const noHandler = (event) => {
    setTaskNo(event.target.value);
  };

  const imageHandler = () => {
    if (imageUpload === null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
  };

  // console.log(imageUrl);
  return (
    <>
      <div className="task">
        <div className="input">
          <input
            value={taskName}
            onChange={changeHandler}
            placeholder="Enter Name....."
          />
          <input
            value={taskNo}
            onChange={noHandler}
            placeholder="Enter Age....."
          />
          <button onClick={clickHandler}> Add Task</button>
        </div>
        <div className="tasks">
          {task?.map((task) => {
            return (
              <div className="bo">
                <div className="storage">
                  {!imageUrl && (
                    <>
                      <input
                        type="file"
                        onChange={(event) => {
                          setImageUpload(event.target.files[0]);
                        }}
                      />
                      <button onClick={imageHandler}>Upload</button>
                    </>
                  )}
                  {imageUrl && <img src={imageUrl} />}
                </div>
                <p>{task.description}</p>
                <p>{task.days}</p>
                <button
                  onClick={() => {
                    updateHandler(task.id, task.days);
                  }}
                >
                  Increase By 1
                </button>
                <button
                  onClick={() => {
                    deleteHandler(task.id);
                  }}
                >
                  Detele Task
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Task;
