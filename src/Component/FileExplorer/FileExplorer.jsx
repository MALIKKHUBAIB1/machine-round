import React, { useEffect, useState } from "react";

const fileData = [
  {
    id: 1,
    type: "folder",
    placeholder: "src",
    isChild: true,
    subFile: [
      {
        id: 2,
        type: "folder",
        placeholder: "component",
        isChild: true,
        subFile: [
          {
            id: 3,
            type: "file",
            placeholder: "fileExplore.jsx",
            isChild: false,
          },
        ],
      },
      {
        id: 9,
        type: "folder",
        placeholder: "LiveChat",
        isChild: true,
        subFile: [],
      },
    ],
  },
  {
    id: 4,
    type: "file",
    placeholder: "main.jsx",
    isChild: false,
  },
];

function ListFile({ createList, files }) {
  const [isExpand, setIsExpand] = useState({});

  return (
    <div>
      {files.map((file) => {
        return (
          <div key={file.id} className="pl-7">
            <span onClick={() => createList(file.id)}>+📂</span>
            <h2
              className="text-xl m-4 text-start cursor-pointer"
              onClick={() =>
                setIsExpand((prev) => ({
                  ...prev,
                  [file.id]: prev[file.id] ? false : true,
                }))
              }
            >
              {file.type === "folder" ? "📂" : "📌"} {file.placeholder}
            </h2>

            {isExpand[file.id] && file.isChild && (
              <ListFile files={file.subFile} createList={createList} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FileExplorer() {
  const [files, setfiles] = useState(fileData);
  const [inputData, setInputData] = useState("");

  function createList(id) {
    function updateList(list) {
      return list.map((file) => {
        if (file.id === id) {
          return {
            ...file,
            subFile: [
              ...file.subFile,
              {
                id: Date.now(),
                placeholder: "chal.jsx",
                type: "folder",
                isChild: true,
                subFile: [],
              },
            ],
          };
        }
        if (file.isChild) {
          return { ...file, subFile: updateList(file.subFile) };
        }
        return file;
      });
    }
    setfiles((prev) => updateList(prev));
  }

  useEffect(() => {
    document.body.style.background = "black";
  }, []);

  return (
    <div className="text-white my-10">
      <h2 className="text-3xl text-center">File Explorer</h2>

      <div className="flex gap-3 text-xl">
        <h2 className="cursor-pointer">Folder</h2>
        <h2 className="cursor-pointer">File</h2>
      </div>

      <input
        type="text"
        className="p-3 m-3 text-black"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />

      <ListFile files={files} createList={createList} />
    </div>
  );
}

export default FileExplorer;
