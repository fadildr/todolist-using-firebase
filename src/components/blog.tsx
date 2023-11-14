/* eslint-disable */
import React, { useState, useEffect, ChangeEvent } from "react";
import { firestore } from "../firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import TextInput from "./textInput";
interface BlogProps {}
interface MyObject {
  id: string;
  testData: string;
}
import Loading from "./loading";
const Blog: React.FC<BlogProps> = () => {
  const [dataToDo, setDataToDo] = useState<MyObject[]>([]);
  const [inputText, setInputText] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [chooseId, setChooseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const snapshot = await getDocs(collection(firestore, "react_todo"));
    const todosData: any[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDataToDo(todosData);
  };
  console.log(dataToDo);

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    const ref = collection(firestore, "react_todo");
    setIsLoading(true);
    const data = {
      testData: inputText,
    };
    try {
      addDoc(ref, data);
      fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

    setInputText("");
  };
  const handleUpdateTodo = async (id: string) => {
    const ref = doc(firestore, "react_todo", id);
    setIsLoading(true);
    try {
      await updateDoc(ref, { testData: updateText });
      setChooseId("");
      setUpdateText("");
      fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteTodo = async (id: string) => {
    console.log(id);
    setIsLoading(true);
    try {
      const data = await deleteDoc(doc(firestore, "react_todo", id));
      console.log(data);

      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="App">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-around ">
            <TextInput
              type="text"
              placeholder="Add your todo"
              value={inputText}
              onChange={handleDataChange}
              className="appearance-none block w-4/5 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 "
            />

            <button
              onClick={handleAddTodo}
              className="p-3 bg-green-500 rounded-md"
            >
              <AiOutlinePlus color="#fff" />
            </button>
          </div>
          <div className=" mt-3">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              dataToDo.map((items) => (
                <div key={items.id} className="flex  justify-between mb-3">
                  <TextInput
                    type="text"
                    value={
                      chooseId == items.id && updateText.length >= 1
                        ? updateText
                        : items.testData
                    }
                    onChange={(e) => setUpdateText(e.target.value)}
                    disable={chooseId !== items.id ? true : false}
                    className="appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 "
                  />
                  {chooseId == items.id && updateText.length > 0 ? (
                    <button
                      className=" bg-green-500 rounded-md p-2 w-1/5 flex justify-center"
                      onClick={() => {
                        handleUpdateTodo(items.id);
                      }}
                    >
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <AiOutlineCheck color="#fff" size={20} />
                      )}
                    </button>
                  ) : (
                    <div className="flex">
                      <button
                        onClick={() => {
                          setChooseId(items.id);
                        }}
                        className=" bg-green-500 rounded-md p-2"
                      >
                        <BiPencil color="#fff" />
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteTodo(items.id);
                        }}
                        className="bg-red-500 rounded-md p-2 ml-2"
                      >
                        {isLoading ? (
                          <Loading />
                        ) : (
                          <AiOutlineDelete color="#fff" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
            {}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
