import React, { useState } from "react";
import {
  BsChevronDoubleUp,
  BsChevronCompactUp,
  BsChevronDown,
} from "react-icons/bs";
import Tooltip from "./Tooltip";
import { useDrag } from "react-dnd";

const TaskCard = ({ task }) => {
  const [priority, setPriority] = useState(task.priority);

  const getPriorityColor = () => {
    switch (priority) {
      case "Low":
        return (
          <div className="bg-green-500 rounded p4 w-4 h-4 place-self-center">
            <Tooltip label="Priority">
              <BsChevronDown className="w-4 h-4" />
            </Tooltip>
          </div>
        );
      case "Medium":
        return (
          <div className="bg-yellow-400 rounded p4 w-4 h-4 place-self-center">
            <Tooltip label="Priority">
              <BsChevronCompactUp className="w-4 h-4" />
            </Tooltip>
          </div>
        );
      case "High":
        return (
          <div className="bg-red-500 rounded p4 w-4 h-4 place-self-center">
            <Tooltip label="Priority">
              <BsChevronDoubleUp className="w-4 h-4" />
            </Tooltip>
          </div>
        );
      default:
        return (
          <div>
            <BsChevronDown className="w-4 h-4" />
          </div>
        );
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="p-4 rounded-lg  mb-4">
      <h2 className="text-lg font-semibold mb-2">{task.title}</h2>
      <Tooltip label="Task responsible">
        <div className="text-gray-700 mb-1">{task.user.name}</div>
      </Tooltip>

      <div className="grid grid-cols-4 gap-1">
        <div className="text-gray-700 mb-1 place-self-center col-start-3">
          <Tooltip label="Remaining Hours">{task.hoursremaining}</Tooltip>
        </div>
        {getPriorityColor()}
      </div>
    </div>
  );
};

export default TaskCard;
