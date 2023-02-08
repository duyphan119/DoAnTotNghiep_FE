import ClearIcon from "@mui/icons-material/Clear";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge, ClickAwayListener } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";

import { useSocketContext } from "../../../../context/SocketContext";
import { Notification, ResponseItems } from "../../../../utils/types";
import styles from "../_style.module.scss";
import { getAllNotifications } from "../../../../apis/notitfy";
import { MSG_SUCCESS } from "../../../../utils/constants";

type Props = {};

type NotificationProps = {
  item: Notification;
};

const NotifyItem = ({ item }: NotificationProps) => {
  return (
    <li className={styles.notifyItem}>
      <Link
        href="/admin"
        className={`${styles.notifyItemLink} ${
          item.readAt ? "" : styles.unread
        }`}
      >
        <div className={styles.notifyItemIcon}></div>
        <div className={styles.notifyItemContent}>
          <div className={`${styles.notifyItemMessage} three-dot three-dot-1`}>
            {item.message}
          </div>
          <div className={styles.notifyItemFromNow}>
            {moment(item.createdAt).fromNow()}
          </div>
        </div>
      </Link>
    </li>
  );
};

const NotifyIcon = (props: Props) => {
  const { socket } = useSocketContext();

  const [open, setOpen] = useState<boolean>(false);
  const [notificationData, setNotificationData] = useState<
    ResponseItems<Notification>
  >({ items: [], count: 0 });
  const [countUnRead, setCountUnRead] = useState<number>(0);

  const handleOpen = () => {
    setOpen((state) => !state);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    socket.on("Has notify", (data: Notification) => {
      setNotificationData((state) => {
        state.items.pop();
        return {
          items: [
            data,
            ...state.items.filter((item: Notification) => item.id !== data.id),
          ],
          count: state.count + 1,
        };
      });
      setCountUnRead((state) => state + 1);
      console.log("ADMIN has notify: ", { data });
    });
  }, [socket]);

  useEffect(() => {
    const pattern = /^\(\d+\)/;
    if (countUnRead > 0) {
      if (pattern.test(document.title)) {
        document.title.replace(pattern, `(${countUnRead})`);
      } else {
        document.title = `(${countUnRead}) ${document.title}`;
      }
    } else {
      document.title.replace(pattern, "").trimStart();
    }
  }, [countUnRead]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, message } = await getAllNotifications({
          unread: true,
          limit: 6,
          p: 1,
        });
        if (message === MSG_SUCCESS) {
          const { items, count, countUnRead } = data;
          setNotificationData({ items, count });
          setCountUnRead(countUnRead);
        }
      } catch (error) {
        console.log("GET NOTIFICATIONS ERROR", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <span className={styles.iconSpan}>
        <Badge badgeContent={countUnRead} color="error" onClick={handleOpen}>
          <NotificationsNoneIcon className={styles.icon} />
        </Badge>
        {open && notificationData.items.length > 0 ? (
          <div className={styles.notifications}>
            <div className={styles.notificationsHeading}>
              <div className={styles.notificationsHeadingLeft}>
                <NotificationsNoneIcon /> Thông báo
              </div>
              <div
                className={styles.notificationsHeadingRight}
                onClick={handleClose}
              >
                <ClearIcon />
              </div>
            </div>
            <ul className={`custom-scrollbar ${styles.notifyItems}`}>
              {notificationData.items.map((item: Notification) => {
                return <NotifyItem key={item.id} item={item} />;
              })}
            </ul>
          </div>
        ) : null}
      </span>
    </ClickAwayListener>
  );
};

export default NotifyIcon;
