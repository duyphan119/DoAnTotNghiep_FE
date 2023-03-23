import ClearIcon from "@mui/icons-material/Clear";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge, ClickAwayListener } from "@mui/material";
import moment from "moment";
import "moment/locale/vi";
import Link from "next/link";
import { FC, memo, useEffect, useState } from "react";

import { useSocketContext } from "@/context/SocketContext";
import { NotificationModel, ResponseGetAllModel } from "@/models";
import styles from "./_style.module.scss";
import { NotificationApi } from "@/api";
import { NotificationJson } from "@/types/json";

type Props = {};

type NotificationProps = {
  item: NotificationModel;
  onClick: (item: NotificationModel) => Promise<void>;
};
const nApi = new NotificationApi();

const NotificationItem: FC<NotificationProps> = memo(({ item, onClick }) => {
  return (
    <li className={styles.notificationItem} onClick={() => onClick(item)}>
      <Link
        href="/admin"
        className={`${styles.notificationItemLink} ${
          item.readAt !== "" ? "" : styles.unread
        }`}
      >
        {/* <div className={styles.notifyItemIcon}></div> */}
        <div className={styles.notificationItemContent}>
          <div
            className={`${styles.notificationItemMessage} three-dot three-dot-2`}
          >
            {item.content}
          </div>
          <div className={styles.notificationItemFromNow}>
            {moment(item.createdAt).fromNow()}
          </div>
        </div>
      </Link>
    </li>
  );
});

const LIMIT = 6;

const NotificationIcon = (props: Props) => {
  const { socket } = useSocketContext();

  const [open, setOpen] = useState<boolean>(false);
  const [notificationData, setNotificationData] = useState<
    ResponseGetAllModel<NotificationModel>
  >(new ResponseGetAllModel());
  const [countUnRead, setCountUnRead] = useState<number>(0);

  const handleOpen = () => {
    setOpen((state) => !state);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (notification: NotificationModel) => {
    try {
      const data = await nApi.read(notification.id);

      if (data.id > 0) {
        setNotificationData(
          (state) =>
            new ResponseGetAllModel(
              state.items.map((item) => (item.id === data.id ? data : item)),
              state.count
            )
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    socket.on("Has notify", (data: NotificationJson) => {
      const notification = new NotificationModel(data);
      setNotificationData((state) => {
        return new ResponseGetAllModel(
          [notification, ...state.items.filter((item) => item.id !== data.id)],
          state.count + 1
        );
      });
      setCountUnRead(countUnRead + 1);
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
        const { data, countUnRead } = await nApi.getAll({
          limit: LIMIT,
          p: 1,
        });
        setNotificationData(data);
        setCountUnRead(countUnRead);
      } catch (error) {
        console.log(error);
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

        {open ? (
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
            {notificationData.items.length > 0 ? (
              <ul className={`custom-scrollbar ${styles.notificationItems}`}>
                {notificationData.items.map((item) => {
                  return (
                    <NotificationItem
                      onClick={handleClick}
                      key={item.id}
                      item={item}
                    />
                  );
                })}
              </ul>
            ) : (
              <div>Không có thông báo</div>
            )}
          </div>
        ) : null}
      </span>
    </ClickAwayListener>
  );
};

export default NotificationIcon;
