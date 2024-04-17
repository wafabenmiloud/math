import React, { useState } from "react";
import Header from "../Header/Header";
import "./Notifications.css";

const Notifications = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedNotifications(
        notifications.map((notification) => notification.id)
      );
    } else {
      setSelectedNotifications([]);
    }
  };

  const handleSelectNotification = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(
        selectedNotifications.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const notifications = [
    {
      id: 1,
      date: "13 May 2023",
      type: "Modification",
      title: "Préparation aux certificats VP et VG de 11ème année",
    },
    {
      id: 2,
      date: "13 May 2023",
      type: "Modification",

      title: "Préparation aux certificats VP et VG de 11ème année",
    },
    {
      id: 3,
      date: "13 May 2023",
      type: "Modification",

      title: "Préparation aux certificats VP et VG de 11ème année",
    },
  ];

  return (
    <div className="notifications_wrapper">
      <Header />{" "}
      <div className="notifications">
        <h2>Notifications</h2>
        <table>
          <thead>
            <tr>
              <th>Temps de modification</th>
              <th>Type</th>
              <th>Titre</th>
              <th>
                {" "}
                <label>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.date}</td>
                <td>{notification.type}</td>
                <td>{notification.title}</td>{" "}
                <td>
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => handleSelectNotification(notification.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
